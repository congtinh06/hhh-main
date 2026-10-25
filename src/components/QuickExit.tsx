import React from 'react';
import { X } from 'lucide-react';

export const QuickExit: React.FC = () => {
  const exit = () => {
    window.location.replace('https://www.google.com');
  };
  return (
    <button
      onClick={exit}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-navy text-white text-xs font-semibold pl-3 pr-4 py-2.5 rounded-md border border-white/15 shadow-lg shadow-navy/30 hover:bg-[#0f1a29] transition-colors"
      aria-label="Thoát nhanh — ẩn trang ngay lập tức"
      title="Rời khỏi trang ngay lập tức và xóa trang khỏi nút Back"
    >
      <X className="w-4 h-4" aria-hidden />
      <span>Thoát nhanh / Ẩn trang</span>
      <kbd className="border border-white/30 rounded-sm px-1 font-mono text-[10px] text-white/80">ESC</kbd>
    </button>
  );
};
