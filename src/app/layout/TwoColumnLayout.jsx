/**
 * TwoColumnLayout component.
 * Predefined layout with sidebar and main content area.
 * Components must adapt to the layout structure.
 */
export default function TwoColumnLayout({ sidebar, main }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Sidebar - 1 column */}
      <aside className="lg:col-span-1 w-full">{sidebar}</aside>

      {/* Main Content - 2 columns */}
      <section className="lg:col-span-2 w-full">{main}</section>
    </div>
  );
}
