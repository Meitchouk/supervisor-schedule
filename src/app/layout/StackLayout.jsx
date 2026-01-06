import { clsx } from 'clsx';

/**
 * StackLayout component.
 * Predefined layout that stacks children vertically with consistent spacing.
 * Components must adapt to the full width provided.
 */
export default function StackLayout({ children, spacing = 'default' }) {
  const spacingClasses = {
    tight: 'gap-3 md:gap-4',
    default: 'gap-4 md:gap-8',
    loose: 'gap-6 md:gap-12',
  };

  return (
    <div className={clsx('flex flex-col', spacingClasses[spacing])}>
      {children}
    </div>
  );
}
