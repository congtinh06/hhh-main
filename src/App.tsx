import React, { useEffect, useState } from 'react';
import type { TabType } from './types';
import { Topbar } from './components/Topbar';
import { Navbar } from './components/Navbar';
import { SectionHome } from './components/SectionHome';
import { SectionUnderstand } from './components/SectionUnderstand';
import { SectionStudents } from './components/SectionStudents';
import { SectionParents } from './components/SectionParents';
import { SectionInteractive } from './components/SectionInteractive';
import { SectionSupport } from './components/SectionSupport';
import { Footer } from './components/Footer';
import { QuickExit } from './components/QuickExit';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const handleNavigate = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        window.location.replace('https://www.google.com');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Topbar />
      <Navbar activeTab={activeTab} setActiveTab={handleNavigate} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        {activeTab === 'home' && <SectionHome onNavigate={handleNavigate} />}
        {activeTab === 'understand' && <SectionUnderstand onNavigate={handleNavigate} />}
        {activeTab === 'students' && <SectionStudents />}
        {activeTab === 'parents' && <SectionParents />}
        {activeTab === 'interactive' && <SectionInteractive />}
        {activeTab === 'support' && <SectionSupport />}
      </main>

      <Footer onNavigate={handleNavigate} />
      <QuickExit />
    </div>
  );
}
