/**
 * AppShell component.
 * Wraps the application with a consistent flex layout structure using daisyUI.
 * Header and Footer span full width, while Body content is centered and limited.
 */
export default function AppShell({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-base-100">{children}</div>
  );
}
