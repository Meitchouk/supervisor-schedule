import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * InfoTooltip component.
 * Displays an info icon with a tooltip for contextual help.
 * Uses i18n for tooltip text.
 *
 * @param {string} tooltipKey - i18n key for the tooltip text
 * @param {ReactNode} children - Content to display before the info icon
 */
export default function InfoTooltip({ tooltipKey, children }) {
  const { t } = useTranslation();
  const tooltipText = t(tooltipKey);

  return (
    <div className="flex items-center gap-2">
      <div className="tooltip tooltip-top">
        <div className="tooltip-content bg-base-300 text-base-content">
          <span className="text-xs">{tooltipText}</span>
        </div>
        <button className="btn btn-ghost btn-xs btn-circle" type="button">
          <Info className="h-4 w-4 text-info opacity-70" />
        </button>
      </div>
      {children}
    </div>
  );
}
