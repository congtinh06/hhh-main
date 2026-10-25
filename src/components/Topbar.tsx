import React from 'react';
import { PhoneCall, X } from 'lucide-react';

export const Topbar: React.FC = () => {
  return (
    <div className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p className="text-[11px] sm:text-xs leading-relaxed text-white/85">
          Bạn đang cần giúp đỡ khẩn cấp? Gọi miễn phí 24/7 tới Tổng đài Quốc gia
          Bảo vệ Trẻ em{' '}
          <span className="font-bold text-white">111</span> — không cần nạp
          tiền, không cần khai cá nhân.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:111"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#C84B31] hover:bg-[#a93d25] px-3 py-1 rounded-sm transition-colors"
          >
            <PhoneCall className="w-3 h-3" aria-hidden />
            Gọi 111
          </a>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-white/60">
            <X className="w-3 h-3" aria-hidden />
            Nhấn <kbd className="border border-white/30 rounded-sm px-1 font-mono text-[10px] text-white/80">ESC</kbd> để ẩn trang
          </span>
        </div>
      </div>
    </div>
  );
};
