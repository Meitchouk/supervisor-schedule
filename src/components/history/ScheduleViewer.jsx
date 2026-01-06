/**
 * ScheduleViewer component
 * Modal to view and export a schedule from history
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Download, FileText, FileSpreadsheet, Table } from 'lucide-react';
import {
  STATE_TO_LABEL,
  getStateBadgeClass,
} from '../../features/scheduler/constants';
import {
  exportToPDF,
  exportToCSV,
  exportToExcel,
} from '../../utils/exportUtils';

export default function ScheduleViewer({ item, onClose }) {
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);

  if (!item || !item.scheduleResult) {
    return null;
  }

  const { scheduleResult, config } = item;
  const { days, drillingCountByDay } = scheduleResult;

  const handleExport = async (format) => {
    if (isExporting) return;

    setIsExporting(true);
    try {
      let success = false;

      switch (format) {
        case 'pdf':
          success = exportToPDF(scheduleResult, config);
          break;
        case 'csv':
          success = exportToCSV(scheduleResult);
          break;
        case 'excel':
          success = await exportToExcel(scheduleResult, config);
          break;
        default:
          console.warn('Unknown export format:', format);
      }

      if (!success) {
        alert(t('export.error'));
      }
    } catch (error) {
      console.error('Export error:', error);
      alert(t('export.error'));
    } finally {
      setIsExporting(false);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat(t('history.locale'), {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-7xl w-full max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg">{t('schedule.title')}</h3>
            <p className="text-sm text-base-content/70">
              {formatDate(item.timestamp)}
            </p>
            {item.duplicateCount > 1 && (
              <span className="badge badge-warning badge-sm mt-1">
                {t('history.generatedTimes', { count: item.duplicateCount })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Export Button */}
            <div className="dropdown dropdown-end">
              <button
                type="button"
                tabIndex={0}
                className="btn btn-success btn-sm gap-2"
                disabled={isExporting}
              >
                {isExporting ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Download size={16} />
                )}
                {t('export.button')}
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-box w-52 mt-2"
              >
                <li>
                  <button
                    onClick={() => handleExport('pdf')}
                    disabled={isExporting}
                    className="flex items-center gap-3"
                  >
                    <FileText size={18} className="text-error" />
                    <span>{t('export.formats.pdf')}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleExport('csv')}
                    disabled={isExporting}
                    className="flex items-center gap-3"
                  >
                    <Table size={18} className="text-info" />
                    <span>{t('export.formats.csv')}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleExport('excel')}
                    disabled={isExporting}
                    className="flex items-center gap-3"
                  >
                    <FileSpreadsheet size={18} className="text-success" />
                    <span>{t('export.formats.excel')}</span>
                  </button>
                </li>
              </ul>
            </div>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Schedule Grid - Same structure as ScheduleGrid */}
        <div className="card bg-base-100 shadow-xl mb-4">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                  <tr>
                    <th className="bg-base-200">{t('schedule.supervisor')}</th>
                    {days.map((day) => (
                      <th key={day.dayNumber} className="text-center">
                        {day.dayNumber}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="bg-base-200">S1</th>
                    {days.map((day) => (
                      <td
                        key={`s1-${day.dayNumber}`}
                        className="text-center p-1"
                      >
                        <span
                          className={`badge badge-sm ${getStateBadgeClass(day.s1)}`}
                        >
                          {STATE_TO_LABEL[day.s1]}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="bg-base-200">S2</th>
                    {days.map((day) => (
                      <td
                        key={`s2-${day.dayNumber}`}
                        className="text-center p-1"
                      >
                        <span
                          className={`badge badge-sm ${getStateBadgeClass(day.s2)}`}
                        >
                          {STATE_TO_LABEL[day.s2]}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th className="bg-base-200">S3</th>
                    {days.map((day) => (
                      <td
                        key={`s3-${day.dayNumber}`}
                        className="text-center p-1"
                      >
                        <span
                          className={`badge badge-sm ${getStateBadgeClass(day.s3)}`}
                        >
                          {STATE_TO_LABEL[day.s3]}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="font-bold">
                    <th className="bg-base-200">#P</th>
                    {drillingCountByDay.map((count, index) => (
                      <td key={`count-${index}`} className="text-center p-1">
                        {count}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Legend - Same as main view */}
        <div className="card bg-base-100 shadow-xl mb-4">
          <div className="card-body">
            <h3 className="card-title text-lg">{t('schedule.legend')}</h3>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-info badge-sm">
                [ {STATE_TO_LABEL['UP']} ] - {t('schedule.states.up')}
              </span>
              <span className="badge badge-warning badge-sm">
                [ {STATE_TO_LABEL['INDUCTION']} ] -{' '}
                {t('schedule.states.induction')}
              </span>
              <span className="badge badge-success badge-sm">
                [ {STATE_TO_LABEL['DRILLING']} ] -{' '}
                {t('schedule.states.drilling')}
              </span>
              <span className="badge badge-error badge-sm">
                [ {STATE_TO_LABEL['DOWN']} ] - {t('schedule.states.down')}
              </span>
              <span className="badge badge-ghost badge-sm">
                [ {STATE_TO_LABEL['REST']} ] - {t('schedule.states.rest')}
              </span>
              <span className="badge badge-sm bg-white text-neutral-content border border-base-300">
                [ {STATE_TO_LABEL['EMPTY']} ] - {t('schedule.states.empty')}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
