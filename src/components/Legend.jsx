import { STATE_TO_LABEL } from '../features/scheduler/constants';

/**
 * Legend component.
 * Displays color coding and abbreviations for schedule states.
 */
export default function Legend() {
  const states = Object.keys(STATE_TO_LABEL);

  return (
    <div className="legend-container">
      <h3>Legend</h3>
      <div className="legend">
        {states.map((state) => (
          <div key={state} className="legend-item">
            <div className={`legend-badge state-${state.toLowerCase()}`} />
            <span className="legend-label">
              {STATE_TO_LABEL[state]} – {state}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
