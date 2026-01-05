import { useLoading } from '../../context/LoadingContext';

/**
 * LoadingBar component
 * Displays an animated progress bar when loading is active
 * Replaces the header border
 */
export default function LoadingBar() {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return <div className="h-1 bg-primary" />;
  }

  return (
    <div className="h-1 bg-base-200 overflow-hidden">
      <div className="h-full bg-primary animate-loading-bar" />
    </div>
  );
}
