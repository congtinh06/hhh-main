import React from 'react';
import { VIOLENCE_TYPES } from '../data/campaignData';
import { PhoneCall, Scale, ChevronRight } from 'lucide-react';

interface SectionUnderstandProps {
  onNavigate?: (tab: 'support' | 'students') => void;
}

export const SectionUnderstand: React.FC<SectionUnderstandProps> = ({ onNavigate }) => {
  const rootCauses = [
    {
      number: '01',
      title: 'Thiếu kỹ năng kiểm soát cảm xúc',
      body:
        'Nhiều em chưa từng được dạy cách gọi tên cơn giận, sự ghen tị hay nỗi bất an của chính mình. Cảm xúc bị dồn nén vào lòng, rồi trút lên bạn cùng lớp — dưới cái cớ "đùa cho vui".',
    },
    {
      number: '02',
      title: 'Áp lực đồng trang lứa & tâm lý đám đông',
      body:
        'Trong đám đông, mỗi cá nhân dễ né trách nhiệm: "cả lớp đều làm". Kẻ dẫn đầu được tiếng cười của một bộ phận củng cố; người im lặng là vì sợ trở thành cái đầu tiếp theo.',
    },
    {
      number: '03',
      title: 'Khoảng trống thông tin giữa gia đình và nhà trường',
      body:
        'Phụ huynh chỉ gặp thầy cô khi bảng điểm xấu đi; nạn nhân đành giữ chuyện một mình. Khoảng trống này là nơi bạo lực lặp lại hàng chục lần trước khi bất kỳ người lớn nào hay biết.',
    },
  ];

  return (
    <div className="space-y-16 pt-10 sm:pt-14">
      {/* ---------------------- Header ---------------------- */}
      <header className="space-y-4 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-terra">
          Nhận diện & Video
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight leading-tight">
          Khi hiểu đúng bản chất,{" "}
          <span className="font-editorial italic font-medium">
            "trêu đùa" không còn là tấm che.
          </span>
        </h1>
        <p className="text-[15px] text-muted leading-relaxed">
          Nhiều sự vụ bị nghe nhẹ nhàng thành "chuyện trẻ con". Nhưng kể từ khi
          Nghị định 80/2017/NĐ-CP có hiệu lực, mọi hành vi cô lập, xua đuổi, lăng
          mạ danh dự trong trường học đều là vi phạm pháp luật — không phải chuyện
          đùa dai, và nạn nhân có quyền được đòi lại công bằng.
        </p>
      </header>

      {/* ----------- Định nghĩa pháp lý bản nguyên văn ------------------ */}
      <section className="space-y-5">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
          <Scale className="w-3.5 h-3.5" aria-hidden />
          Định nghĩa chuẩn pháp lý
        </div>
        <figure className="border-l-[3px] border-terra bg-white border border-line border-l-3 rounded-md rounded-l-none p-6 sm:p-8">
          <blockquote className="font-editorial text-lg sm:text-xl leading-relaxed text-ink">
            "Bạo lực học đường là hành vi{' '}
            <em>hành hạ, ngược đãi, đánh đập hoặc tấn công, xâm hại thân thể, sức khỏe; lăng mạ, xúc phạm danh dự, nhân phẩm; cô lập, xua đuổi</em>{' '}
            và các hành vi cố ý khác gây tổn hại về thể chất và tinh thần của
            người học trong cơ sở giáo dục hoặc ngoài đời sống."
          </blockquote>
          <figcaption className="mt-4 text-xs text-muted">
            — Khoản 5 Điều 2, <strong className="text-ink">Nghị định 80/2017/NĐ-CP</strong>{' '}
            của Chính phủ về môi trường giáo dục an toàn, phòng chống bạo lực học đường
          </figcaption>
        </figure>
        <p className="text-[13px] text-muted leading-relaxed max-w-3xl">
          Đọc kỹ chữ "cô lập, xua đuổi": bắt nạt không cần một cú đánh nào cũng đủ
          vi phạm pháp. Tẩy chay, đá khỏi nhóm, coi như vô hình — cùng nằm trong
          phạm vi pháp lý với hành hạ thể chất.
        </p>
      </section>

      {/* ------------- 4 hình thức — bảng phân tích ---------------------- */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Chuyên sâu theo khung UNESCO & UNICEF
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Bốn hình thức bạo lực học đường
          </h2>
        </div>

        <div className="space-y-4">
          {VIOLENCE_TYPES.map((t) => (
            <article key={t.id} className="border border-line bg-white rounded-md">
              <div className="flex items-start gap-5 p-5 sm:p-6 border-b border-line/70">
                <span className="font-editorial text-3xl sm:text-4xl text-terra/90 leading-none shrink-0">
                  {t.index}
                </span>
                <div>
                  <h3 className="font-bold text-ink text-lg leading-snug">{t.name}</h3>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted mt-0.5">{t.en}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-line/70">
                <div className="p-5 sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-sage mb-3">
                    Biểu hiện thực tế tại trường
                  </p>
                  <ul className="space-y-2">
                    {t.recognition.map((r) => (
                      <li key={r} className="flex gap-2 text-[13px] text-ink/90 leading-relaxed">
                        <span className="mt-[7px] w-1 h-1 bg-ochre rounded-full shrink-0" aria-hidden />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 sm:p-6 bg-sand/40">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-sage mb-3">
                    Tác động tâm lý ngầm
                  </p>
                  <p className="text-[13px] text-muted leading-relaxed">{t.impact}</p>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-sage mb-3">
                    Ví dụ nhận diện
                  </p>
                  <p className="text-[13px] text-muted leading-relaxed italic font-editorial">{t.example}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------ Video ------------------------------- */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Video tuyên truyền & góc nhìn chuyên gia
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Xem — rồi đọc bản phân tích tình huống
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <figure className="lg:col-span-7 border border-line bg-white p-3 rounded-md self-start">
            <div className="relative aspect-video bg-navy rounded-sm overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/03u9xWheXps"
                title="Video tuyên truyền: Đừng im lặng trước bạo lực học đường"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <figcaption className="pt-2.5 text-[11px] text-muted flex items-center justify-between">
              <span className="font-editorial italic">
                "Đừng im lặng trước bạo lực học đường" — video tuyên truyền chính thức
              </span>
              <a
                href="https://www.youtube.com/watch?v=03u9xWheXps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terra hover:underline shrink-0"
              >
                Mở trên YouTube ↗
              </a>
            </figcaption>
          </figure>

          <aside className="lg:col-span-5 space-y-5">
            <div className="border border-line bg-white rounded-md p-6 space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                Phân tích tình huống trong video
              </p>
              <p className="text-[14px] text-ink/90 leading-relaxed">
                Trong video, nạn nhân không bị đánh một đòn nào — nhưng bị cả lớp
                dồn vào "bữa tiệc"                 dìm hàng trên chat group. Đây đúng là{' '}
                <strong className="text-ink">bạo lực quan hệ + bạo lực mạng</strong>:
                hai hình thức dường như "mềm" nhưng mật độ lặp là hằng ngày, 24/7 —
                khiến nạn nhân không còn một phút nghỉ ngơi an tâm.
              </p>
              <p className="text-[14px] text-ink/90 leading-relaxed">
                Cái đắt: những bạn "chỉ cười vài tiếng" trong group. Họ tự hiểu
                mình không trực tiếp trêu đùa, nhưng bộ đếm đồng cảm của nạn nhân
                không đếm ai trêu — nó đếm{' '}
                <em className="font-editorial">số người làm im lặng.</em>
              </p>
            </div>

            <div className="border border-line rounded-md divide-y divide-line bg-sand/50">
              <p className="px-5 pt-4 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                Ba nguyên nhân gốc rễ
              </p>
              {rootCauses.map((c) => (
                <div key={c.number} className="flex gap-4 px-5 py-4">
                  <span className="font-editorial text-xl text-ochre shrink-0">{c.number}</span>
                  <div className="space-y-1">
                    <p className="text-[13px] font-bold text-ink">{c.title}</p>
                    <p className="text-[12px] text-muted leading-relaxed">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line pt-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="font-editorial italic text-lg text-ink max-w-xl">
          "Nhận diện được tình huống chỉ là bước đầu. Kỹ năng ứng phó mới là lời giải."
        </p>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={() => onNavigate?.('students')}
            className="inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-[#0f1a29] transition-colors"
          >
            Hành trang học sinh
            <ChevronRight className="w-4 h-4" aria-hidden />
          </button>
          <a
            href="tel:111"
            className="inline-flex items-center gap-2 border border-terra text-terra text-sm font-bold px-5 py-3 rounded-md hover:bg-terra hover:text-white transition-colors"
          >
            <PhoneCall className="w-4 h-4" aria-hidden />
            SOS 111
          </a>
        </div>
      </section>
    </div>
  );
};
