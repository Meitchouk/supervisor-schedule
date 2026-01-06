import { useState, useEffect } from 'react';
import { useLoading } from '../../context/LoadingContext';

/**
 * Simple debounce utility
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * LoadingBar component
 * Displays an animated progress bar when loading is active
 * On mobile: sticky at top of viewport
 * On desktop: normal flow within header
 */
export default function LoadingBar() {
  const { isLoading, isInitialLoading } = useLoading();
  const [isMobile, setIsMobile] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    const debouncedCheckMobile = debounce(checkMobile, 150);
    window.addEventListener('resize', debouncedCheckMobile);

    return () => window.removeEventListener('resize', debouncedCheckMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsSticky(false);
      return;
    }

    const handleScroll = () => {
      // If scroll is greater than header height (~100px), make it sticky
      setIsSticky(window.scrollY > 100);
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [isMobile]);

  const showLoading = isLoading || isInitialLoading;

  // Mobile: fixed top-0 when scrolling, normal when at top
  // Desktop: normal flow in header
  // With loading: purple animation, Without loading: static primary bar
  const containerClasses = `w-full ${
    isMobile && isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-base-100' : ''
  }`;

  return (
    <div className={containerClasses}>
      <div className="h-1 bg-base-200 overflow-hidden">
        {showLoading ? (
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            style={{
              animation: 'loading-bar 1.5s ease-in-out infinite',
            }}
          />
        ) : (
          <div className="h-full bg-primary" />
        )}
      </div>
    </div>
  );
}
