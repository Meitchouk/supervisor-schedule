/**
 * TwoColumnLayout component.
 * Predefined layout with sidebar and main content area.
 * Components must adapt to the layout structure.
 */
export default function TwoColumnLayout({ sidebar, main }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(40%,auto),1fr] gap-4 md:gap-6">
      <aside className="min-w-[40%] w-max sticky top-10 h-screen overflow-y-auto">
        {sidebar}
      </aside>
      <section className="w-full overflow-auto">{main}</section>
    </div>
  );
}
