import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function InfoTooltip({
  tooltipKey,
  children,
  position = 'right',
  icon = true,
}) {
  const { t } = useTranslation();
  const tooltipText = t(tooltipKey);

  const validPositions = ['left', 'top', 'bottom', 'right'];
  const safePosition = validPositions.includes(position) ? position : 'right';

  const tooltipPositionClass = `tooltip-${safePosition}`;

  return (
    <div className="flex items-center gap-2">
      {icon ? (
        <div className={`tooltip ${tooltipPositionClass}`}>
          <div className="tooltip-content bg-base-300 text-base-content">
            <span className="text-xs">{tooltipText}</span>
          </div>
          <button className="btn btn-ghost btn-xs btn-circle" type="button">
            <Info className="h-4 w-4 text-info opacity-70" />
          </button>
        </div>
      ) : (
        <div className={`tooltip ${tooltipPositionClass}`}>
          <div className="tooltip-content bg-base-300 text-base-content">
            <span className="text-xs">{tooltipText}</span>
          </div>
          {children}
        </div>
      )}
      {icon && children}
    </div>
  );
}
