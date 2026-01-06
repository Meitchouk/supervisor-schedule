import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, FileText, FileSpreadsheet, Table } from 'lucide-react';
import {
  exportToPDF,
  exportToCSV,
  exportToExcel,
} from '../../utils/exportUtils';
import { useSchedule } from '../../context/ScheduleContext';

export default function ExportButton() {
  const { t } = useTranslation();
  const { scheduleResult, config } = useSchedule();
  const [isExporting, setIsExporting] = useState(false);

  const hasSchedule =
    scheduleResult && scheduleResult.days && scheduleResult.days.length > 0;

  // Build translations object for export functions
  const getExportTranslations = () => ({
    title: t('export.pdf.title'),
    workDays: t('export.pdf.workDays'),
    offDays: t('export.pdf.offDays'),
    inductionDays: t('export.pdf.inductionDays'),
    drillingDaysRequired: t('export.pdf.drillingDaysRequired'),
    days: t('export.pdf.days'),
    page: t('export.pdf.page'),
    of: t('export.pdf.of'),
    continued: t('export.pdf.continued'),
    legend: t('export.pdf.legend'),
    states: {
      up: t('export.pdf.states.up'),
      induction: t('export.pdf.states.induction'),
      drilling: t('export.pdf.states.drilling'),
      down: t('export.pdf.states.down'),
      rest: t('export.pdf.states.rest'),
      empty: t('export.pdf.states.empty'),
    },
    // Excel specific
    scheduleSheet: t('export.excel.scheduleSheet'),
    configSheet: t('export.excel.configSheet'),
    configuration: t('export.excel.configuration'),
    value: t('export.excel.value'),
    meaning: t('export.excel.meaning'),
    color: t('export.excel.color'),
  });

  const handleExport = async (format) => {
    if (!hasSchedule || isExporting) return;

    setIsExporting(true);
    try {
      let success = false;
      const translations = getExportTranslations();

      switch (format) {
        case 'pdf':
          success = exportToPDF(scheduleResult, config, translations);
          break;
        case 'csv':
          success = exportToCSV(scheduleResult);
          break;
        case 'excel':
          success = await exportToExcel(scheduleResult, config, translations);
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

  if (!hasSchedule) {
    return null; // Don't show export button if no schedule generated
  }

  return (
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
  );
}
