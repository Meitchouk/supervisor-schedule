/**
 * ScheduleHistory component
 * Displays history of generated schedules with duplicate detection
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Copy,
  Eye,
} from 'lucide-react';
import { useScheduleHistory } from '../../context/ScheduleHistoryContext';
import ScheduleViewer from './ScheduleViewer';

export default function ScheduleHistory() {
  const { t } = useTranslation();
  const { history, removeFromHistory, clearHistory } = useScheduleHistory();
  const [viewingItem, setViewingItem] = useState(null);

  if (history.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title text-lg flex items-center gap-2">
            <Clock size={20} />
            {t('history.title')}
          </h3>
          <div className="empty-state">
            <p>{t('history.empty')}</p>
            <p className="empty-state-hint">{t('history.emptyHint')}</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat(t('history.locale'), {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h3 className="card-title text-lg flex items-center gap-2">
              <Clock size={20} />
              {t('history.title')}
              <span className="badge badge-primary badge-sm">
                {history.length}
              </span>
            </h3>
            <button
              onClick={clearHistory}
              className="btn btn-ghost btn-sm gap-2"
              title={t('history.clearAll')}
            >
              <Trash2 size={16} />
              {t('history.clearAll')}
            </button>
          </div>

          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="table table-xs table-pin-rows">
              <thead>
                <tr>
                  <th>{t('history.date')}</th>
                  <th className="text-center">{t('history.workDays')}</th>
                  <th className="text-center">{t('history.offDays')}</th>
                  <th className="text-center">{t('history.inductionDays')}</th>
                  <th className="text-center">
                    {t('history.drillingRequired')}
                  </th>
                  <th className="text-center">{t('history.status')}</th>
                  <th className="text-center">{t('history.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => {
                  const hasDuplicates = item.duplicateCount > 1;

                  return (
                    <tr key={item.id} className="hover">
                      <td className="text-xs">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-base-content/50" />
                          {formatDate(item.timestamp)}
                        </div>
                        {item.lastGeneratedAt &&
                          item.lastGeneratedAt !== item.timestamp && (
                            <div className="text-xs text-base-content/50 mt-1">
                              {t('history.lastGenerated')}:{' '}
                              {formatDate(item.lastGeneratedAt)}
                            </div>
                          )}
                      </td>
                      <td className="text-center font-mono text-sm">
                        {item.config.workDays}
                      </td>
                      <td className="text-center font-mono text-sm">
                        {item.config.offDays}
                      </td>
                      <td className="text-center font-mono text-sm">
                        {item.config.inductionDays}
                      </td>
                      <td className="text-center font-mono text-sm">
                        {item.config.drillingDaysRequired}
                      </td>
                      <td className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          {item.hasErrors ? (
                            <div
                              className="tooltip"
                              data-tip={t('history.hasErrors')}
                            >
                              <AlertCircle size={16} className="text-error" />
                            </div>
                          ) : (
                            <div
                              className="tooltip"
                              data-tip={t('history.valid')}
                            >
                              <CheckCircle2
                                size={16}
                                className="text-success"
                              />
                            </div>
                          )}
                          {hasDuplicates && (
                            <div
                              className="tooltip"
                              data-tip={t('history.duplicateTooltip', {
                                count: item.duplicateCount,
                              })}
                            >
                              <div className="badge badge-warning badge-xs gap-1">
                                <Copy size={10} />
                                {item.duplicateCount}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setViewingItem(item)}
                            className="btn btn-ghost btn-xs"
                            title={t('history.view')}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => removeFromHistory(item.id)}
                            className="btn btn-ghost btn-xs"
                            title={t('history.remove')}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-base-content/60 mt-4">
            {t('history.note')}
          </div>
        </div>
      </div>

      {/* Schedule Viewer Modal */}
      {viewingItem && (
        <ScheduleViewer
          item={viewingItem}
          onClose={() => setViewingItem(null)}
        />
      )}
    </>
  );
}
