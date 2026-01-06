import AppShell from './layout/AppShell';
import Header from './layout/Header';
import Body from './layout/Body';
import Footer from './layout/Footer';
import { Controls, ToastProvider } from '../components/ui';
import { AppTour } from '../components/tour';

export default function App() {
  return (
    <AppShell>
      <Controls />
      <ToastProvider />
      <AppTour />
      <Header />
      <Body />
      <Footer />
    </AppShell>
  );
}
