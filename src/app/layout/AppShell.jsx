/**
 * AppShell component.
 * Wraps the application with a consistent flex layout structure.
 * Provides a responsive container for Header, Body, and Footer.
 */
export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <div className="app-container">{children}</div>
    </div>
  );
}
