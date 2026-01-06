import AppShell from './layout/AppShell';
import Header from './layout/Header';
import Body from './layout/Body';
import Footer from './layout/Footer';
import { Controls } from '../components/ui';

export default function App() {
  return (
    <AppShell>
      <Controls />
      <Header />
      <Body />
      <Footer />
    </AppShell>
  );
}
