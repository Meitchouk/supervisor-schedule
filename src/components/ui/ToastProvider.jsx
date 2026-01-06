import { Toaster } from 'react-hot-toast';

/**
 * ToastProvider component
 * Wrapper for react-hot-toast with DaisyUI styling
 */
export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerStyle={{
        top: 80,
      }}
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: 'hsl(var(--b1))',
          color: 'hsl(var(--bc))',
          border: '1px solid hsl(var(--b3))',
          borderRadius: '0.5rem',
          padding: '16px',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        },
        // Success toast
        success: {
          duration: 3000,
          iconTheme: {
            primary: 'hsl(var(--su))',
            secondary: 'hsl(var(--suc))',
          },
        },
        // Error toast
        error: {
          duration: 5000,
          iconTheme: {
            primary: 'hsl(var(--er))',
            secondary: 'hsl(var(--erc))',
          },
        },
        // Loading toast
        loading: {
          iconTheme: {
            primary: 'hsl(var(--p))',
            secondary: 'hsl(var(--pc))',
          },
        },
      }}
    />
  );
}
