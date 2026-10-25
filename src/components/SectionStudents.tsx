import React, { useState } from 'react';
import { QUIZ_SCENARIOS } from '../data/campaignData';
import type { QuizChoice, QuizScenario } from '../data/campaignData';
import { PhoneCall, ShieldCheck, AlertTriangle, X } from 'lucide-react';

/* ---------------------------------------------------------------- data */

const BOUNDARIES = [
  {
    title: 'Ranh giới cơ thể',
    body:
      'Cơ thể của em thuộc về em. Ai ngắt sau lưng, giật tài sản đeo người, xoay màng hình cơ thể quá gần — em có toàn quyền nói "Dừng lại".',
  },
  {
    title: 'Ranh giới đồ đạc',
    body:
      'Cặp sách, bút, điện thoại, xe đạp là tài sản được pháp luật bảo vệ. Ai "phù" dùng không xin phép, giấu, xé, đập hỏng — chính là hành vi vi phạm.',
  },
  {
    title: 'Ranh giới cảm xúc',
    body:
      'Trêu đùa về gia cảnh, ngoại hình, giới tính, học lực khiến em đau lòng không phải trò vui. Cảm xúc của em có giá trị và đáng được tôn trọng.',
  },
  {
    title: 'Ranh giới không gian mạng',
    body:
      'Ảnh, tin nhắn, mật khẩu của em KHÔNG là của chung. Không ai được chụp màn hình đăng lên hay mượn tài khoản — kể cả với "bạn thân nhất".',
  },
];

const I_MESSAGE_STEPS = [
  {
    letter: 'X',
    label: 'Khi bạn... (mô tả hành vi, không phán xét)',
    sample: '"Khi bạn chụp ảnh mình và đăng lên group..."',
  },
  {
    letter: 'C',
    label: 'Mình cảm thấy... (đặt tên cảm xúc thật)',
    sample: '— mình cảm thấy bị tổn thương và rất không vui.',
  },
  {
    letter: 'Y',
    label: 'Mình mong muốn... (yêu cầu cụ thể)',
    sample: 'Mình mong bạn xóa bài và xin lỗi trong group.',
  },
];

const ESCAPE_SKILLS = [
  {
    title: 'Giữ bình tĩnh — không cho kẻ bắt nạt "niềm vui"',
    body:
      'Khóc lóc hoặc nổi điên là chính thứ kẻ trêu chọc muốn xem. Thở đều, thẳng lưng, đi tiếp — biểu hiện "không thú vị" sẽ khiến trò đùa mất độ cháy.',
  },
  {
    title: 'Di chuyển về khu vực có camera hoặc đông thầy cô',
    body:
      'Sự xuất hiện của người lớn là "công tắc" dừng trò bắt nạt nhanh nhất. Vào phòng giáo viên, phòng tư vấn học đường, cây xăng, cửa hàng — những nơi có người lớn và ánh sáng.',
  },
  {
    title: 'Tuyệt đối không đi một mình vào góc khuất',
    body:
      'Không vào nhà vệ sinh tầng vắng, góc để xe trước giờ học, hẻm ven trường khi em biết mình đang bị nhắm đến. Đi hai người trở lên — luôn luôn.',
  },
];

const STOP_SAVE_BLOCK_TELL = [
  {
    step: '1',
    tag: 'STOP',
    title: 'Dừng lại — không cãi tay đôi',
    body:
      'Nếu cãi tay đôi khi đang hoảng loạn, tin nhắn của em dễ bị chụp màn hình cắt ghép ngược ý nghĩa. Hãy dừng gõ, đặt điện thoại xuống và đếm chậm tới 10.',
  },
  {
    step: '2',
    tag: 'SAVE',
    title: 'Chụp màn hình — lưu toàn bộ bằng chứng',
    body: 'Chụp toàn bộ tin nhắn, bình luận, đường dẫn URL và thời gian chính xác của từng nội dung. Bằng chứng thường bị xóa nhanh — thường là trong vòng 24 giờ.',
  },
  {
    step: '3',
    tag: 'BLOCK',
    title: 'Chặn & Báo cáo tài khoản',
    body:
      'Dùng tính năng chặn tài khoản (Block) và bấm Báo cáo (Report Harassment) ngay trên trang nền — Facebook, Zalo, TikTok đều có mục này và xử lý khá nhanh.',
  },
  {
    step: '4',
    tag: 'TELL',
    title: 'Kể cho người lớn tin cậy',
    body:
      'Gửi toàn bộ bằng chứng cho phụ huynh, giáo viên chủ nhiệm hoặc phòng tư vấn học đường trong ngày. Nếu vượt quá học đường — gọi Tổng đài Quốc gia 111 miễn cước 24/7.',
  },
];

const FIVE_D = [
  {
    d: 'Direct',
    vi: 'Trực tiếp',
    body:
      'Nói ngay với kẻ bắt nạt: "Dừng lại, điều này không ổn." Dùng giọng bình tĩnh, gọi tên hành vi chứ không gọi tên người. Chỉ thực hiện khi em cảm thấy an toàn và có bạn bè đứng cùng.',
  },
  {
    d: 'Distract',
    vi: 'Đánh lạc hướng',
    body:
      'Cách rút bạn khỏi vòng vây trong im lặng: giả vờ nhờ bạn giúp việc — "Cô chủ nhiệm gọi em lên phòng giáo viên ngay đi" — kéo bạn ra khỏi đám đông mà kẻ bắt nạt không có cớ phản đối.',
  },
  {
    d: 'Delegate',
    vi: 'Nhờ người lớn',
    body:
      'Không để bạn bè ôm chuyện một mình. Nhờ người lớn gần nhất: giáo viên giám thị, bảo vệ, thầy cô thư viện. Nếu vắng người lớn, bấm Tổng đài 111 ngay trên điện thoại của chính em.',
  },
  {
    d: 'Delay',
    vi: 'Hỏi thăm sau đó',
    body:
      'Một tin nhắn hôm sau — "Em ổn chưa? Lúc đó tớ không dám nói gì, nhưng tớ đã báo cô rồi" — giúp bạn bị bắt nạt không cảm thấy bị bỏ rơi. Mỗi lời hỏi thăm đều là liều thuốc chữa lành.',
  },
  {
    d: 'Document',
    vi: 'Ghi nhận bằng chứng',
    body:
      'Chụp màn hình, ghi chú thời gian, nơi xảy ra, những người có mặt. Bằng chứng giúp người lớn xử lý chính xác — và bảo vệ chính em khỏi bị quay ngược thành "kẻ khuấy động".',
  },
];

const QUIZ_TONE = {
  best: {
    label: 'Lựa chọn tốt nhất',
    icon: <ShieldCheck className="w-4 h-4" aria-hidden />,
    cls: 'text-sage border-sage bg-[#2B6653]/5',
    ring: 'border-sage',
  },
  ok: {
    label: 'Tạm được — song có điểm cần lưu ý',
    icon: <AlertTriangle className="w-4 h-4" aria-hidden />,
    cls: 'text-ochre border-ochre bg-[#D99B26]/5',
    ring: 'border-ochre',
  },
  bad: {
    label: 'Không tốt — vì an toàn của chính em',
    icon: <X className="w-4 h-4" aria-hidden />,
    cls: 'text-terra border-terra bg-terra/5',
    ring: 'border-terra',
  },
};

/* ---------------------------------------------------------------- component */

export const SectionStudents: React.FC = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, string>>({});

  const scenario: QuizScenario = QUIZ_SCENARIOS[scenarioIndex];

  return (
    <div className="space-y-16 pt-10 sm:pt-14">
      <header className="space-y-4 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-terra">
          Cẩm nang thực chiến tương tác
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight leading-tight">
          Hành trang của em, trong{' '}
          <span className="font-editorial italic font-medium">bốn trang.</span>
        </h1>
        <p className="text-[15px] text-muted leading-relaxed">
          Không phải "lời khuyên chung chung". Mỗi mục dưới đây là một kỹ năng
          đã được chuẩn hóa trong giáo dục kỹ năng xã hội — cảm xúc (SEL) và
          được dùng cho người học trước mọi tình huống bắt nạt: ở lớp, sân
          trường và mạng xã hội.
        </p>
      </header>

      {/* ------------------------ 1. SEL: ranh giới cá nhân ----------------------- */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Phần 1 — Hành trang tự bảo vệ bản thân (khung SEL)
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Vòng tròn Ranh giới Cá nhân — bước đầu tiên: <br />
            <span className="font-editorial italic font-medium">em xác định "cái gì thuộc về em."</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {BOUNDARIES.map((b, i) => (
            <article key={b.title} className="border border-line bg-white rounded-md p-6 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-editorial text-2xl text-terra/90">0{i + 1}</span>
                <h3 className="font-bold text-ink text-[15px]">{b.title}</h3>
              </div>
              <p className="text-[13px] text-muted leading-relaxed">{b.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------- 2. I-Message -------------------------------- */}
      <section className="border border-line bg-white rounded-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x divide-line">
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 bg-sand/50">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              Công thức giao tiếp cứng rắn, không gây chiến
            </p>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Thông điệp "I-Message"
            </h2>
            <p className="text-[14px] text-muted leading-relaxed">
              Thay vì đáp trả bằng cãi vã (thứ kẻ trêu đang chờ đợi), hãy dùng
              "Thông điệp Tôi" để đặt ranh giới cứng rắn mà không tiếp thêm cảm
              xúc cho trò bắt nạt — công cụ chuẩn trong giáo dục SEL.
            </p>
            <p className="font-editorial italic text-[15px] text-ink border-l-2 border-terra pl-4">
              "Dừng lại đi. Mình không thấy trò này vui chút nào và mình yêu cầu
              bạn tôn trọng mình."
            </p>
          </div>
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col divide-y divide-line">
            {I_MESSAGE_STEPS.map((s, i) => (
              <div key={s.letter} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <span className="font-editorial font-semibold text-2xl text-terra w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="space-y-1.5">
                  <p className="text-[12px] font-bold uppercase tracking-wider text-muted">{s.label}</p>
                  <p className="font-editorial text-[15px] text-ink">{s.sample}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ 3. Kỹ năng thoát hiểm ------------------------- */}
      <section className="space-y-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          Phần 3 — Kỹ năng thoát hiểm tức thời
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line border border-line rounded-md bg-white">
          {ESCAPE_SKILLS.map((s, i) => (
            <div key={s.title} className="p-6 space-y-2">
              <span className="font-editorial text-xl text-ochre">0{i + 1}</span>
              <h3 className="font-bold text-ink text-sm leading-snug">{s.title}</h3>
              <p className="text-[13px] text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------- 4. STOP-SAVE-BLOCK-TELL --------------------------- */}
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Phần 4 — Quy trình bạo lực mạng
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            STOP — SAVE — BLOCK — TELL
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-line divide-y sm:divide-y lg:divide-x lg:divide-y-0 divide-line rounded-md bg-white overflow-hidden">
          {STOP_SAVE_BLOCK_TELL.map((s) => (
            <div key={s.step} className="p-6 space-y-2.5 relative">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 grid place-items-center bg-navy text-white font-editorial text-sm rounded-sm">
                  {s.step}
                </span>
                <span className="font-mono text-xs font-bold text-terra tracking-wider">{s.tag}</span>
              </div>
              <h3 className="font-bold text-ink text-[14px] leading-snug">{s.title}</h3>
              <p className="text-[12.5px] text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------- 5. Quy tắc 5D ------------------------------- */}
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Phần 5 — Chiến thuật cho người chứng kiến
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Quy tắc 5D: biến khán giả thành người bảo vệ
          </h2>
          <p className="text-[14px] text-muted max-w-2xl">
            Người chứng kiến có ảnh hưởng lớn hơn mình tưởng rất nhiều: khi có
            một bạn kịp thời phản đối, hành vi bắt nạt chấm dứt trong hơn một nửa
            các trường hợp (khảo sát quốc tế về hành vi bystander). Em không cần
            phải làm anh hùng — chỉ cần một trong năm chữ D, phù hợp hoàn cảnh.
          </p>
        </div>
        <div className="border border-line rounded-md divide-y divide-line bg-white">
          {FIVE_D.map((d) => (
            <article key={d.d} className="p-6 sm:p-7 flex flex-col sm:flex-row gap-5">
              <div className="sm:w-40 shrink-0">
                <span className="font-editorial font-semibold text-2xl text-terra">{d.d}</span>
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted mt-0.5">{d.vi}</p>
              </div>
              <p className="text-[14px] text-ink/90 leading-relaxed flex-1">{d.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* -------------------- 6. Trắc nghiệm tình huống -------------------------- */}
      <section className="space-y-6" id="trac-nghiem">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Phần 6 — Mô phỏng tình huống thực tế
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Nếu là em, em đã làm gì?
          </h2>
          <p className="text-[14px] text-muted max-w-2xl">
            Chọn đáp án em thấy hợp lý nhất. Hệ thống phân tích ngay ưu / nhược
            điểm của lựa chọn — không chấm điểm, không lưu đâu.
          </p>
        </div>

        {/* Tabs scenario */}
        <div className="flex flex-wrap gap-2">
          {QUIZ_SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setScenarioIndex(i)}
              className={`px-3.5 py-2 rounded-md border text-xs font-semibold transition-colors ${
                scenarioIndex === i
                  ? 'bg-navy text-white border-navy'
                  : 'border-line text-muted hover:text-ink hover:border-ink/30 bg-white'
              }`}
            >
              Tình huống {s.index}
            </button>
          ))}
        </div>

        <div className="border border-line bg-white rounded-md overflow-hidden">
          <div className="flex gap-4 p-6 sm:p-8 border-b border-line/70 bg-sand/40">
            <span className="font-editorial text-4xl text-terra/90 leading-none shrink-0">{scenario.index}</span>
            <p className="text-[15px] leading-relaxed text-ink font-editorial">
              {scenario.situation}
            </p>
          </div>
          <div className="divide-y divide-line/70">
            {scenario.choices.map((c: QuizChoice) => {
              const chosen = picked[scenario.id] === c.id;
              const tone = QUIZ_TONE[c.quality];
              const answered = Boolean(picked[scenario.id]);
              return (
                <div key={c.id} className="p-5 sm:p-6">
                  <button
                    onClick={() => setPicked((p) => ({ ...p, [scenario.id]: c.id }))}
                    className="w-full text-left flex items-start gap-3 group"
                  >
                    <span
                      className={`mt-0.5 w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
                        chosen
                          ? 'border-terra bg-terra'
                          : 'border-line group-hover:border-terra/60'
                      }`}
                      aria-hidden
                    />
                    <span className={`text-[14px] leading-relaxed transition-colors ${chosen ? 'font-semibold text-ink' : 'text-muted group-hover:text-ink'}`}>
                      {c.text}
                    </span>
                  </button>
                  {chosen && (
                    <div className={`mt-4 ml-7 border ${tone.ring} rounded-md px-4 py-3 space-y-1`}>
                      <p className={`flex items-center gap-2 text-xs font-bold ${c.quality === 'best' ? 'text-sage' : c.quality === 'ok' ? 'text-ochre' : 'text-terra'}`}>
                        {tone.icon}
                        {tone.label}
                      </p>
                      <p className="text-[13px] text-muted leading-relaxed">{c.analysis}</p>
                    </div>
                  )}
                  {answered && !chosen && (
                    <div className="mt-2 ml-7 text-[11px] text-muted/70 italic font-editorial">
                      Chưa được chọn — bấm vào đây để xem phân tích lựa chọn này.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {picked[scenario.id] && scenarioIndex < QUIZ_SCENARIOS.length - 1 && (
            <div className="p-5 border-t border-line/70 flex justify-end">
              <button
                onClick={() => setScenarioIndex((i) => i + 1)}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-terra hover:gap-2.5 transition-all"
              >
                <span>Sang tình huống tiếp theo →</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line pt-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="font-editorial italic text-lg text-ink max-w-xl">
          "Kỹ năng được luyện hôm nay sẽ theo em suốt nhiều năm — lâu hơn nhiều
          so với bất kỳ trận cãi vã nào trong sân trường."
        </p>
        <a
          href="tel:111"
          className="shrink-0 inline-flex items-center gap-2 bg-terra text-white text-sm font-bold px-5 py-3 rounded-md hover:bg-[#a83a24] transition-colors"
        >
          <PhoneCall className="w-4 h-4" aria-hidden />
          Không chắc gì xảy ra? Gọi 111
        </a>
      </section>
    </div>
  );
};
