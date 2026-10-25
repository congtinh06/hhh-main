import React, { useState } from 'react';
import type { TabType } from '../types';
import { PhoneCall, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const NAV_ITEMS: { id: TabType; label: string }[] = [
  { id: 'home', label: 'Trang chủ' },
  { id: 'understand', label: 'Nhận diện & Video' },
  { id: 'students', label: 'Góc Học sinh' },
  { id: 'parents', label: 'Góc Phụ huynh' },
  { id: 'interactive', label: 'Hộp thư Đồng cảm' },
  { id: 'support', label: 'Danh bạ & Pháp lý' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = useState(false);

  const go = (tab: TabType) => {
    setActiveTab(tab);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <button
          onClick={() => go('home')}
          className="flex items-baseline gap-2 shrink-0 group text-left"
          aria-label="Về trang chủ"
        >
          <span className="font-editorial font-semibold text-lg text-ink tracking-tight">
            Đừng Im Lặng
          </span>
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.18em] text-muted">
            Vì trường học an toàn
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-6" aria-label="Điều hướng chính">
          {NAV_ITEMS.map((item) => {
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative py-1 text-[13px] tracking-tight transition-colors ${
                  active
                    ? 'text-terra font-semibold after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-terra'
                    : 'text-muted hover:text-ink font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:111"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-white bg-navy hover:bg-[#0f1a29] px-3 py-1.5 rounded-sm transition-colors"
          >
            <PhoneCall className="w-3 h-3" aria-hidden />
            SOS 111
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-ink hover:text-terra transition-colors"
            aria-label="Mở menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line bg-paper px-4 py-3 flex flex-col" aria-label="Điều hướng di động">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`text-left py-2.5 border-b border-line/60 last:border-0 text-sm ${
                activeTab === item.id ? 'text-terra font-semibold' : 'text-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};
