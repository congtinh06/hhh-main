import React from 'react';
import type { TabType } from '../types';
import { PhoneCall } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-line bg-sand/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-3">
          <p className="font-editorial font-semibold text-lg text-ink">Đừng Im Lặng</p>
          <p className="text-[13px] text-muted leading-relaxed max-w-md">
            Chiến dịch phòng ngừa bạo lực học đường theo tinh thần Nghị định
            80/2017/NĐ-CP, Luật Trẻ em 2016 và Thông tư 06/2019/TT-BGDĐT.
            Nội dung khoa học dựa trên báo cáo UNESCO 2019 và khảo sát UNICEF
            Việt Nam về bắt nạt trực tuyến.
          </p>
          <p className="text-[11px] text-muted/80">
            Trang web không thay thế tư vấn chuyên môn. Nếu trẻ đang gặp nguy hiểm
            về thể chất, hãy liên hệ từ một chiếc điện thoại an toàn.
          </p>
        </div>

        <div className="space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra">Chuyên mục</p>
          {(
            [
              ['home', 'Trang chủ'],
              ['understand', 'Nhận diện & Video'],
              ['students', 'Góc Học sinh'],
              ['parents', 'Góc Phụ huynh'],
              ['interactive', 'Hộp thư Đồng cảm'],
              ['support', 'Danh bạ & Pháp lý'],
            ] as [TabType, string][]
          ).map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => onNavigate(tab)}
              className="block text-[13px] text-muted hover:text-ink transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-2.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-terra">Khẩn cấp 24/7</p>
          <a href="tel:111" className="flex items-center gap-2 text-sm font-bold text-ink hover:text-terra transition-colors">
            <PhoneCall className="w-3.5 h-3.5" aria-hidden /> Tổng đài Bảo vệ Trẻ em 111
          </a>
          <a href="tel:113" className="block text-[13px] text-muted hover:text-ink transition-colors">113 — Cảnh sát</a>
          <a href="tel:115" className="block text-[13px] text-muted hover:text-ink transition-colors">115 — Cấp cứu y tế</a>
          <p className="text-[11px] text-muted/80 pt-2">
            Nhấn <kbd className="border border-line rounded-sm px-1 font-mono text-[10px]">ESC</kbd> bất kỳ lúc nào để ẩn trang.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] text-muted">
            © 2026 Đừng Im Lặng — Chiến dịch vì trường học an toàn &amp; hạnh phúc.
          </p>
          <p className="text-[11px] text-muted/80">
            Số liệu: UNESCO 2019 · UNICEF Việt Nam · Chính phủ CHXHCN Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
};
