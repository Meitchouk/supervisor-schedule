import { useState, useEffect } from 'react';
import { useLoading } from '../../context/LoadingContext';

/**
 * LoadingBar component
 * Displays an animated progress bar when loading is active
 * On mobile: sticky at top of viewport
 * On desktop: normal flow within header
 */
export default function LoadingBar() {
  const { isLoading, isInitialLoading } = useLoading();
  const [isMobile, setIsMobile] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsSticky(false);
      return;
    }

    const handleScroll = () => {
      // Si el scroll es mayor a la altura del header (~100px), hacerlo sticky
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const showLoading = isLoading || isInitialLoading;

  // Mobile: fixed top-0 cuando se hace scroll, normal cuando está arriba
  // Desktop: flujo normal en header
  // Con loading: animación morada, Sin loading: barra estática primaria
  const containerClasses = `w-full ${
    isMobile && isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-base-100' : ''
  }`;

  return (
    <div className={containerClasses}>
      <div className="h-1 bg-base-200 overflow-hidden">
        {showLoading ? (
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            style={{
              animation: 'loading-bar 1.5s ease-in-out infinite',
            }}
          />
        ) : (
          <div className="h-full bg-primary" />
        )}
      </div>
    </div>
  );
}
