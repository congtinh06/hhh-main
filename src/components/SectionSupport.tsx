import React, { useState } from 'react';
import { LEGAL_DOCS, EMERGENCY_CONTACTS } from '../data/campaignData';
import type { LegalDoc } from '../data/campaignData';
import { PhoneCall, ChevronDown, Scale, ExternalLink } from 'lucide-react';

export const SectionSupport: React.FC = () => {
  const [openDoc, setOpenDoc] = useState<string>(LEGAL_DOCS[0].id);
  const [openProvision, setOpenProvision] = useState<string | null>(
    LEGAL_DOCS[0].provisions[0]?.label ?? null,
  );

  const toggleDoc = (id: string) => {
    setOpenDoc((cur) => (cur === id ? '' : id));
    const doc = LEGAL_DOCS.find((d) => d.id === id);
    setOpenProvision(doc?.provisions[0]?.label ?? null);
  };

  return (
    <div className="space-y-16 pt-10 sm:pt-14">
      <header className="space-y-4 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-terra">
          Nguồn hỗ trợ & căn cứ pháp lý
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight leading-tight">
          Khi bạn cần người lớn thật sự:{' '}
          <span className="font-editorial italic font-medium">đây là danh bạ và căn cứ pháp lý của bạn.</span>
        </h1>
        <p className="text-[15px] text-muted leading-relaxed">
          Lên tiếng không phải là "mách lẻo". Trước pháp luật Việt Nam, mọi chuyện
          báo tin về bảo vệ trẻ em là quyền của-em và được bảo vệ — dưới đây là
          những con số và điều khoản bạn cần ghi nhớ.
        </p>
      </header>

      {/* ---------------------- danh bạ khẩn cấp ---------------------- */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Danh bạ cứu trợ khẩn cấp quốc gia — gọi một chạm
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Bốn đầu mối, sẵn sàng 24/7.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border border-line rounded-md divide-y lg:divide-y-0 lg:divide-x divide-line overflow-hidden">
          {EMERGENCY_CONTACTS.map((c, idx) => (
            <a
              key={c.number}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`group p-6 sm:p-8 flex items-start gap-5 transition-colors hover:bg-sand/50 ${
                idx % 2 === 0 ? 'bg-white' : 'bg-white'
              } ${idx < EMERGENCY_CONTACTS.length - 2 ? 'border-b border-line/70 lg:border-b-0' : ''}`}
            >
              <div className="shrink-0">
                <p className="font-editorial font-semibold text-4xl text-ink group-hover:text-terra transition-colors leading-none">
                  {c.number}
                </p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted mt-2">{c.tag}</p>
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-ink text-[15px] flex items-center gap-1.5">
                  {c.name}
                  {c.href.startsWith('http') ? (
                    <ExternalLink className="w-3.5 h-3.5 text-muted/60" aria-hidden />
                  ) : (
                    <PhoneCall className="w-3.5 h-3.5 text-muted/60 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                  )}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed">{c.detail}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ------------------------- thư viện pháp lý ------------------------ */}
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Thư viện căn cứ pháp lý — bấm để tra từng văn bản
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Trích dẫn chuẩn, dùng khi cần "nói pháp luật".
          </h2>
        </div>

        <div className="border border-line rounded-md bg-white divide-y divide-line">
          {LEGAL_DOCS.map((doc: LegalDoc) => {
            const expanded = openDoc === doc.id;
            return (
              <div key={doc.id}>
                <button
                  onClick={() => toggleDoc(doc.id)}
                  className="w-full text-left px-5 sm:px-7 py-5 flex items-start gap-4 hover:bg-sand/40 transition-colors"
                  aria-expanded={expanded}
                >
                  <Scale className="w-4 h-4 text-terra mt-1 shrink-0" aria-hidden />
                  <span className="flex-1">
                    <span className="block font-bold text-ink text-[15px]">{doc.number}</span>
                    <span className="block text-[12px] text-muted mt-0.5 leading-relaxed">{doc.title}</span>
                    <span className="block text-[11px] text-muted/70 mt-0.5">
                      {doc.org} · {doc.year}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted shrink-0 mt-1 transition-transform ${expanded ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </button>

                {expanded && (
                  <div className="px-5 sm:px-7 pb-6 space-y-4 animate-fadeIn">
                    <p className="text-[13px] text-muted leading-relaxed border-l-2 border-line pl-4">
                      {doc.summary}
                    </p>
                    <div className="space-y-2">
                      {doc.provisions.map((prov) => {
                        const open = openProvision === prov.label;
                        return (
                          <div key={prov.label} className="border border-line rounded-sm overflow-hidden">
                            <button
                              onClick={() => setOpenProvision(open ? null : prov.label)}
                              className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 bg-paper hover:bg-sand/60 transition-colors"
                            >
                              <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink">
                                {prov.label}
                              </span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                                aria-hidden
                              />
                            </button>
                            {open && (
                              <p className="px-4 py-3.5 text-[13px] text-ink/85 leading-relaxed border-t border-line bg-white">
                                {prov.text}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[12px] text-muted/80 italic font-editorial max-w-2xl">
          Lưu ý: nội dung trích dẫn mang tính tham khảo. Khi thực sự cần dùng
          làm căn cứ yêu cầu nhà trường hoặc với cơ quan nhà nước, hãy xin bản
          gốc văn bản từ Cổng thông tin Chính phủ / Bộ GD&ĐT.
        </p>
      </section>

      {/* -------------------------- CTA ----------------------------------- */}
      <section className="bg-navy text-white rounded-md p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h2 className="font-editorial text-2xl font-semibold">
            Bạn vừa phát hiện một vụ bạo lực đang xảy ra?
          </h2>
          <p className="text-[13px] text-white/75 leading-relaxed">
            Đừng đợi ai khác gọi trước. Một cuộc điện thoại của bạn có thể chấm
            dứt một câu chuyện kéo dài suốt nhiều tháng của một em học sinh.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href="tel:111"
            className="inline-flex items-center gap-2 bg-terra text-white text-sm font-bold px-5 py-3 rounded-md hover:bg-[#a83a24] transition-colors"
          >
            <PhoneCall className="w-4 h-4" aria-hidden />
            Gọi 111 ngay
          </a>
        </div>
      </section>
    </div>
  );
};
