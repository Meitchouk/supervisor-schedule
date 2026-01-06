/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useLanguage } from '../../context/LanguageContext';
import { useSchedule } from '../../context/ScheduleContext';
import { useLoading } from '../../context/LoadingContext';

/**
 * AppTour component
 * Guided tour using Driver.js with i18n support
 * Saves progress and shows hint tour when data changes mid-tour
 */
export default function AppTour({ onComplete }) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { scheduleResult } = useSchedule();
  const { isLoading } = useLoading();
  const driverRef = useRef(null);
  const hadScheduleRef = useRef(scheduleResult !== null);
  const needsHintRef = useRef(false); // Flag to show hint tour after data changes

  const getSteps = useCallback(
    (hasSchedule) => {
      return [
        {
          element: 'body',
          popover: {
            title: t('tour.welcome.title'),
            description: t('tour.welcome.description'),
            side: 'center',
            align: 'center',
          },
        },
        {
          element: '[data-tour="presets"]',
          popover: {
            title: t('tour.presets.title'),
            description: hasSchedule
              ? t('tour.presets.description')
              : t('tour.presets.descriptionNoData'),
            side: 'bottom',
            align: 'start',
          },
        },
        {
          element: '[data-tour="config-form"]',
          popover: {
            title: t('tour.configForm.title'),
            description: t('tour.configForm.description'),
            side: 'right',
            align: 'start',
          },
        },
        {
          element: '[data-tour="generate-button"]',
          popover: {
            title: t('tour.generateButton.title'),
            description: hasSchedule
              ? t('tour.generateButton.description')
              : t('tour.generateButton.descriptionNoData'),
            side: 'top',
            align: 'center',
          },
        },
        // Only show these steps if there's a generated schedule
        ...(hasSchedule
          ? [
              {
                element: '[data-tour="validation"]',
                popover: {
                  title: t('tour.validation.title'),
                  description: t('tour.validation.description'),
                  side: 'left',
                  align: 'start',
                },
              },
              {
                element: '[data-tour="schedule-grid"]',
                popover: {
                  title: t('tour.scheduleGrid.title'),
                  description: t('tour.scheduleGrid.description'),
                  side: 'left',
                  align: 'start',
                },
              },
              {
                element: '[data-tour="stats"]',
                popover: {
                  title: t('tour.stats.title'),
                  description: t('tour.stats.description'),
                  side: 'left',
                  align: 'start',
                },
              },
            ]
          : []),
        {
          element: '[data-tour="history"]',
          popover: {
            title: t('tour.history.title'),
            description: hasSchedule
              ? t('tour.history.description')
              : t('tour.history.descriptionNoData'),
            side: 'left',
            align: 'start',
          },
        },
        {
          element: '[data-tour="controls"]',
          popover: {
            title: t('tour.controls.title'),
            description: t('tour.controls.description'),
            side: 'left',
            align: 'center',
          },
        },
        {
          element: 'body',
          popover: {
            title: t('tour.finish.title'),
            description: hasSchedule
              ? t('tour.finish.description')
              : t('tour.finish.descriptionNoData'),
            side: 'center',
            align: 'center',
          },
        },
      ];
    },
    [t],
  );

  const showHintTour = useCallback(() => {
    const hintDriver = driver({
      showProgress: false,
      showButtons: ['close'],
      steps: [
        {
          element: '[data-tour="repeat-tour-button"]',
          popover: {
            title: t('tour.hint.title'),
            description: t('tour.hint.description'),
            side: 'bottom',
            align: 'center',
          },
        },
      ],
      onDestroyed: () => {
        needsHintRef.current = false;
      },
      doneBtnText: t('tour.buttons.done'),
    });

    hintDriver.drive();
  }, [t]);

  const startTour = useCallback(
    (startFromStep = false) => {
      const hasSchedule = scheduleResult !== null;
      hadScheduleRef.current = hasSchedule;

      // Get saved progress if resuming
      const savedStep =
        typeof startFromStep === 'number'
          ? startFromStep
          : parseInt(localStorage.getItem('tourProgress') || '0', 10);

      const driverObj = driver({
        showProgress: true,
        showButtons: ['next', 'previous', 'close'],
        steps: getSteps(hasSchedule),
        onDestroyed: () => {
          driverRef.current = null;
          // Mark tour as complete
          localStorage.setItem('hasSeenTour', 'true');
          localStorage.removeItem('tourProgress');
          if (onComplete) {
            onComplete();
          }
        },
        onNextClick: () => {
          const currentIndex = driverObj.getActiveIndex();
          // Save progress
          localStorage.setItem('tourProgress', String(currentIndex + 1));
          driverObj.moveNext();
        },
        onPrevClick: () => {
          const currentIndex = driverObj.getActiveIndex();
          // Save progress
          if (currentIndex > 0) {
            localStorage.setItem('tourProgress', String(currentIndex - 1));
          }
          driverObj.movePrevious();
        },
        nextBtnText: t('tour.buttons.next'),
        prevBtnText: t('tour.buttons.previous'),
        doneBtnText: t('tour.buttons.done'),
        progressText: t('tour.buttons.progress'),
      });

      driverRef.current = driverObj;

      // Start from saved or specified step
      if (savedStep > 0) {
        driverObj.drive(savedStep);
      } else {
        driverObj.drive();
      }
    },
    [scheduleResult, getSteps, t, onComplete],
  );

  useEffect(() => {
    // Check if user has already seen the tour
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    const tourProgress = localStorage.getItem('tourProgress');

    if (!hasSeenTour || tourProgress) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        startTour();
      }, 500);
    }
  }, [startTour]);

  // Monitor scheduleResult changes during active tour
  useEffect(() => {
    // If tour is active and schedule was generated
    if (
      driverRef.current &&
      !hadScheduleRef.current &&
      scheduleResult !== null
    ) {
      const currentStep = driverRef.current.getActiveIndex();
      const wasActive = driverRef.current.isActive();

      // If user is still in the early steps (before where schedule components would show)
      if (currentStep !== undefined && currentStep <= 4 && wasActive) {
        // Save current progress before closing
        localStorage.setItem('tourProgress', String(currentStep));

        // Mark that we need to show hint tour
        needsHintRef.current = true;

        // Destroy current tour (it will close)
        driverRef.current.destroy();
        driverRef.current = null;

        // Update the flag now that we have schedule
        hadScheduleRef.current = true;
      }
    }
  }, [scheduleResult]);

  // Monitor loading state to show hint tour after data is loaded
  useEffect(() => {
    // If we need to show hint and loading just finished
    if (needsHintRef.current && !isLoading && scheduleResult !== null) {
      // Small delay to ensure DOM updates with new components
      setTimeout(() => {
        showHintTour();
      }, 800);
    }
  }, [isLoading, scheduleResult, showHintTour]);

  // Expose startTour function globally for "Repeat Tour" button
  useEffect(() => {
    window.startAppTour = () => {
      // Clear saved progress when manually restarting
      localStorage.removeItem('tourProgress');
      startTour(false);
    };
    return () => {
      delete window.startAppTour;
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, [language, t, scheduleResult, startTour]);

  return null;
}
