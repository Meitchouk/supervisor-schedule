/**
 * TwoColumnLayout component.
 * Predefined layout with sidebar and main content area.
 * Components must adapt to the layout structure.
 */
export default function TwoColumnLayout({ sidebar, main }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-4">
      <aside className="w-full lg:w-auto lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:overflow-y-auto">
        {sidebar}
      </aside>
      <section className="w-full overflow-auto">{main}</section>
    </div>
  );
}
