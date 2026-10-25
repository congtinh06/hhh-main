import React from 'react';
import type { TabType } from '../types';
import { PhoneCall, ArrowRight, X } from 'lucide-react';

interface SectionHomeProps {
  onNavigate: (tab: TabType) => void;
}

const STATS = [
  {
    figure: '111',
    caption: 'Tổng đài Quốc gia trực 24/7 — miễn cước viễn thông hoàn toàn.',
  },
  {
    figure: '1/5',
    caption: 'Thanh thiếu niên Việt Nam từng là nạn nhân bắt nạt trực tuyến (khảo sát UNICEF Việt Nam).',
  },
  {
    figure: '5D & SEL',
    caption: 'Bộ kỹ năng ứng phó thực chiến chuẩn quốc tế, chẳng hạn qua nhiều trường tại Việt Nam.',
  },
  {
    figure: 'Đ.21',
    caption: 'Điều 21 Luật Trẻ em 2016 — bảo mật tuyệt đối danh tính người lên tiếng báo tin.',
  },
];

const TRIAGE = [
  {
    index: '01',
    title: 'Dành cho Học sinh đang tổn thương',
    tab: 'students' as TabType,
    desc: 'Em đang bị trêu, cô lập hoặc đe dọa?',
    bullets: [
      'Cách tự bảo vệ bằng kỹ năng I-Message & giữ ranh giới cá nhân',
      'Quy trình 4 bước STOP — SAVE — BLOCK — TELL cho bạo lực mạng',
      'Hướng dẫn lưu bằng chứng pháp lý đúng cách trước khi bị xóa',
      'Chiến thuật thoát hiểm tức thời đến khu vực an toàn',
    ],
    cta: 'Mở Hành trang Học sinh',
  },
  {
    index: '02',
    title: 'Dành cho Người chứng kiến (Upstander)',
    tab: 'students' as TabType,
    desc: 'Em muốn giúp bạn nhưng sợ bị kéo vào?',
    bullets: [
      'Quy tắc 5D: giúp bạn mà không biến mình thành mục tiêu',
      'Cách đánh lạc hướng (Distract) đúng nghĩa để giải vây bạn bè',
      'Khi nào và cách chuyển cho người lớn (Delegate) an toàn',
      'Giúp bạn sau sự kiện (Delay): một lời hỏi thăm cũng là sự chữa lành.',
    ],
    cta: 'Học chiến thuật 5D',
  },
  {
    index: '03',
    title: 'Dành cho Phụ huynh & Giáo viên',
    tab: 'parents' as TabType,
    desc: 'Con bỗng thay đổi nhưng không chịu kể chuyện?',
    bullets: [
      '10 dấu hiệu cảnh báo sớm — bộ checklist chấm điểm tức thời',
      'Nghệ thuật lắng nghe: nguyên tắc 3 KHÔNG — 3 CÓ',
      'Quy trình 4 bước phối hợp cùng nhà trường theo Nghị định 80/2017',
      'Căn cứ pháp lý khi yêu cầu trường lập biên bản, bảo vệ con',
    ],
    cta: 'Mở Cẩm nang Phụ huynh',
  },
];

const PILLARS = [
  {
    title: 'Lắng nghe không phán xét',
    body:
      'Bước đầu của mọi cuộc can thiệp: để nạn nhân được nói ra mà không bị trách móc, nghi ngờ hay khuyến khích trả thù. Sự lắng nghe không phán xét chính là điểm tựa đầu tiên của sự chữa lành.',
  },
  {
    title: 'Can thiệp kịp thời & Bảo mật',
    body:
      'Mọi tin báo được xử lý theo Điều 21 Luật Trẻ em 2016: danh tính người lên tiếng báo tin được bảo vệ tuyệt đối — trước, trong và sau khi vụ việc kết thúc.',
  },
  {
    title: 'Văn hóa tôn trọng sự khác biệt',
    body:
      'Phá văn hóa dìm hàng: thay lời chế giễu bằng sự tìm hiểu, thay tẩy chay bằng lời mời, thay vai khán giả bằng bàn tay được đưa ra đúng lúc.',
  },
];

export const SectionHome: React.FC<SectionHomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 pt-10 sm:pt-14">
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-terra">
            Chiến dịch quốc gia vì trường học an toàn &amp; hạnh phúc
          </p>
          <h1 className="text-[2.1rem] leading-[1.2] sm:text-5xl sm:leading-[1.15] font-bold text-ink tracking-tight">
            Đừng im lặng trước bạo lực học đường.{' '}
            <span className="font-editorial italic font-medium">
              Lên tiếng là lá chắn
            </span>{' '}
            bảo vệ bạn bè.
          </h1>
          <p className="text-[15px] sm:text-base text-muted leading-relaxed max-w-2xl">
            Mỗi sự im lặng vô tình tiếp tay cho tổn thương kéo dài. Tại đây,
            bạn tìm thấy kỹ năng tự vệ thực chiến (SEL &amp; 5D) cho học sinh,
            cẩm nang đồng hành cho phụ huynh và mạng lưới bảo vệ khẩn cấp 24/7
            từ Tổng đài Quốc gia 111.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('students')}
              className="inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-[#0f1a29] transition-colors"
            >
              Hành trang Góc Học Sinh
              <ArrowRight className="w-4 h-4" aria-hidden />
            </button>
            <button
              onClick={() => onNavigate('understand')}
              className="inline-flex items-center gap-2 border border-ink text-ink text-sm font-semibold px-5 py-3 rounded-md hover:bg-ink hover:text-paper transition-colors"
            >
              Nhận diện bạo lực &amp; Video
            </button>
            <a
              href="tel:111"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-terra underline decoration-2 underline-offset-4 hover:text-[#a83a24] transition-colors px-1"
            >
              <PhoneCall className="w-4 h-4" aria-hidden />
              Kết nối SOS 111
            </a>
          </div>
        </div>

        {/* Editorial visual frame */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <figure className="border border-line bg-white p-3 rounded-md shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80"
              alt="Học sinh đồng hành cùng nhau trong sân trường"
              loading="eager"
              className="w-full aspect-[4/3] object-cover rounded-sm"
            />
            <figcaption className="pt-2.5 text-[11px] text-muted leading-relaxed font-editorial italic">
              Buổi sinh hoạt lớp về "Người bạn an toàn": mỗi em viết lời hứa
              đưa tay cho nhau trước khi chuyện tồi tệ xảy ra.
            </figcaption>
          </figure>

          <div className="bg-paper border border-line rounded-md p-5 shadow-[0_10px_30px_rgba(22,35,54,0.06)]">
            <p className="font-editorial italic text-[15px] leading-relaxed text-ink">
              "Tình bạn được xây đắp bằng sự thấu hiểu, không phải bằng nỗi sợ hãi."
            </p>
            <ul className="mt-4 space-y-1.5">
              {['Không bắt nạt bạn', 'Không im lặng chịu đựng', 'Không làm khán giả vô tâm'].map((p) => (
                <li key={p} className="flex items-start gap-2 text-[13px] text-muted">
                  <X className="w-3.5 h-3.5 mt-0.5 text-terra shrink-0" aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --------------------------- STAT STRIP --------------------------- */}
      <section className="border-y border-line">
        <dl className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-line">
          {STATS.map((s) => (
            <div key={s.figure} className="p-5 sm:p-6">
              <dt className="font-editorial font-semibold text-3xl sm:text-4xl text-ink">{s.figure}</dt>
              <dd className="mt-2 text-[11px] sm:text-xs text-muted leading-relaxed">{s.caption}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* --------------------------- TRIAGE ------------------------------- */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-terra">
              Hãy cho chúng tôi biết bạn đang ở vị trí nào
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-ink">
              Ba lối vào, cùng một điểm đến: an toàn.
            </h2>
          </div>
          <p className="text-[13px] text-muted max-w-sm">
            Chọn đúng vai trò của bạn — từng đường dẫn đưa bạn đến đúng kỹ năng
            mình cần, không phải đọc hết toàn bộ trang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-line divide-y md:divide-y-0 md:divide-x divide-line bg-white rounded-md">
          {TRIAGE.map((t) => (
            <article key={t.index} className="p-6 sm:p-7 flex flex-col">
              <span className="font-editorial text-4xl text-terra/90">{t.index}</span>
              <h3 className="mt-4 font-bold text-ink text-[15px] leading-snug">{t.title}</h3>
              <p className="mt-1.5 text-xs text-muted italic font-editorial">{t.desc}</p>
              <ul className="mt-4 space-y-2 flex-1">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-[13px] text-muted leading-relaxed">
                    <span className="mt-[7px] w-1 h-1 bg-terra rounded-full shrink-0" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate(t.tab)}
                className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-terra hover:gap-2.5 transition-all"
              >
                {t.cta}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* --------------------------- MANIFESTO ----------------------------- */}
      <section className="bg-navy text-white rounded-md">
        <div className="p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/70">
              Mục tiêu chiến dịch
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold leading-snug">
              Ba trụ cột để không còn em nào phải giữ một mình.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-md overflow-hidden">
            {PILLARS.map((p, i) => (
              <div key={p.title} className="bg-navy p-6 space-y-2.5">
                <span className="font-editorial text-2xl text-white/40">0{i + 1}</span>
                <h3 className="font-semibold text-[15px]">{p.title}</h3>
                <p className="text-[13px] text-white/70 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Góc tương tác teaser */}
      <section className="border border-line bg-white rounded-md p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
        <div className="space-y-2 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-sage">Hộp thư Đồng cảm — cập nhật thời gian thực</p>
          <h2 className="font-editorial text-2xl font-semibold text-ink">
            Có những câu người lớn chưa kịp hiểu. Hãy để chúng được nghe đúng dạng.
          </h2>
          <p className="text-[13px] text-muted leading-relaxed">
            Chia sẻ câu chuyện dưới một bút danh ẩn danh được bảo vệ. Mọi bài đăng và
            lời động viên được lưu và đồng bộ tức thì cho toàn cộng đồng.
          </p>
        </div>
        <button
          onClick={() => onNavigate('interactive')}
          className="shrink-0 inline-flex items-center gap-2 bg-[#2B6653] text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-[#22503f] transition-colors"
        >
          Vào Hộp thư Đồng cảm
          <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
      </section>
    </div>
  );
};
