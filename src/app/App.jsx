import { useState } from 'react';

import AppShell from './layout/AppShell';
import Header from './layout/Header';
import Body from './layout/Body';
import Footer from './layout/Footer';

/**
 * Main application component.
 * Manages application state and layout structure.
 * Organizes content into Header, Body, and Footer sections.
 */
export default function App() {
  const [config, setConfig] = useState({
    workDays: 5,
    offDays: 2,
    inductionDays: 1,
    drillingDaysRequired: 10,
  });

  const [scheduleResult, setScheduleResult] = useState(null);

  const handleConfigChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerateSchedule = () => {
    // TODO: Implement schedule generation logic
    console.log('Generate schedule with config:', config);
    setScheduleResult(null);
  };

  return (
    <AppShell>
      <Header />
      <Body
        config={config}
        onConfigChange={handleConfigChange}
        scheduleResult={scheduleResult}
        onGenerateSchedule={handleGenerateSchedule}
      />
      <Footer />
    </AppShell>
  );
}
