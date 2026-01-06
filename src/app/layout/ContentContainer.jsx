/**
 * ContentContainer component.
 * Predefined container with max-width and centered content.
 * Wraps main content areas with consistent padding and width constraints.
 */
export default function ContentContainer({ children }) {
  return (
    <div className="w-full">
      <div className="max-w-[90%] mx-auto px-4 py-6 md:py-10">{children}</div>
    </div>
  );
}
