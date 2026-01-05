/**
 * AppShell component.
 * Wraps the application with a consistent layout structure.
 */
export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      {children}
      <footer className="app-footer">
        <p>&copy; 2024 Supervisor Schedule. All rights reserved.</p>
      </footer>
    </div>
  );
}
