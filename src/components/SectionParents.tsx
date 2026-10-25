import React, { useMemo, useState } from 'react';
import { PhoneCall, ChevronDown, CircleCheck, Circle } from 'lucide-react';

/* -------------------------------------------------------------- data */

const CHECKLIST_GROUPS = [
  {
    name: 'Thể chất & Đồ dùng',
    signs: [
      'Con có vết thương, trầy xước, bầm tím không thể giải thích rõ nguyên nhân',
      'Đồ dùng học tập, cặp sách, điện thoại liên tục hư hỏng hoặc thất lạc',
      'Con xin tiền thêm bất thường hoặc "thiếu" tiền ăn sáng lúc về nhà',
    ],
  },
  {
    name: 'Cảm xúc & Giấc ngủ',
    signs: [
      'Con bỗng thu mình, ít nói, né tránh bàn luận về bạn bè ở lớp',
      'Khó ngủ, mộng mị, hoặc xin phép bỏ bữa, sụt cân nhanh trong mấy tuần',
      'Con tự nói xấu bản thân: "con xấu", "con vô dụng", "con dở não"',
    ],
  },
  {
    name: 'Thái độ với trường lớp & Điện thoại',
    signs: [
      'Con đột nhiên lười đến trường, xin nghỉ ốm hơn 2 lần mỗi tháng',
      'Con che vội màn hình điện thoại, khựng lại khi ba mẹ đi ngang, hoặc đột nhiên xóa tài khoản',
      'Trở về nhà, con vội vã tắt nghẽn mọi cuộc trò chuyện về bạn bè và thầy cô',
      'Con né tránh sinh hoạt nhóm và lễ hội lớp, kể cả những hoạt động em từng thích',
    ],
  },
];

const KHONG = [
  {
    title: 'KHÔNG đổ lỗi cho con',
    quotes: [
      '"Con phải làm sao thì bạn mới trêu chứ?"',
      '"Sao con nhu nhược thế — không đánh lại là sao?"',
    ],
    explain:
      'Câu hỏi kiểu này khiến con tin rằng việc bị bắt nạt là lỗi của mình — nên con sẽ không mở lòng lần sau. Kẻ bắt nạt càng dám tiếp tục khi thấy nạn nhân không có ai bênh vực.',
  },
  {
    title: 'KHÔNG coi nhẹ vấn đề',
    quotes: [
      '"Chuyện trẻ con ấy mà, kệ chúng nó đi."',
      '"Con tập trung học đi, chuyện này con tự xử được."',
    ],
    explain:
      'Bị coi nhẹ khiến con rút vào im lặng gấp đôi: chuyện không được giải quyết, con vẫn phải tiếp tục đối mặt mỗi ngày. Trên thực tế — cô lập lặp lại dài hạn gây tổn thương tâm lý như các nghiên cứu UNESCO chỉ rõ.',
  },
  {
    title: 'KHÔNG tự ý hành xử cực đoan',
    quotes: [
      'Lao đến trường mắng học sinh khác trực tiếp.',
      'Đăng vụ việc lên mạng xã hội kèm tên tuổi bạn học hoặc giáo viên.',
    ],
    explain:
      'Lao ra xử lý ngay có thể khiến con bị cô lập nặng hơn: cùng lớp coi đó là chuyện "cả gia đình ôm hận", kẻ bắt nạt hoạt động âm thầm hơn và nguy hiểm hơn. Đăng bài công khai kèm tên tuổi bạn học còn có thể vi phạm pháp luật về danh dự, hình ảnh của người khác.',
  },
];

const CO = [
  {
    title: 'Có lắng nghe trọn vẹn & công nhận cảm xúc',
    quotes: ['Ôm con, ngồi ngang tầm mắt con.', '"Bố mẹ tin con. Việc con bị đối xử như vậy KHÔNG phải lỗi của con."'],
    explain:
      'Điều con cần nhất trước mọi hướng xử lý: một người lớn tin mình trọn vẹn. Đó là lý do con dám nói tiếp, nói hết, và nói đúng sự thật.',
  },
  {
    title: 'Có thu thập thông tin khách quan',
    quotes: [
      'Cùng con ghi chép diễn biến: thời gian, nơi, người có mặt, lời nói.',
      'Chụp ảnh vết thương, tin nhắn, lưu giữ đúng trình tự thời gian.',
    ],
    explain:
      'Bằng chứng khách quan giúp buổi làm việc với nhà trường đi đúng sự thật: tránh tình trạng "lời kể đối lời kể", và bảo vệ con khỏi bị gán sai sự việc.',
  },
  {
    title: 'Có đồng hành giải quyết đến cùng',
    quotes: [
      'Thống nhất từng bước hướng xử lý cùng con trước khi gặp nhà trường.',
      'Ngay cả khi giải quyết xong, sau mỗi tuần vẫn dành một buổi nói chuyện với con.',
    ],
    explain:
      'Để con cảm thấy mình vẫn làm chủ được tình huống: quyết định "hôm nay gặp ai, nói thế nào" được trao đổi cùng con trước. Sự đồng hành có kế hoạch nuôi dưỡng lòng tự tin, tránh giúp quá tay khiến con vô năng.',
  },
];

const PROCESS = [
  {
    step: '1',
    title: 'Ổn định tâm lý & kiểm tra y tế cho con',
    body:
'Chăm sóc vết thương thể chất (nếu có), và đừng quên sức khỏe tinh thần: nếu con mất ngủ, chán ăn kéo dài, hãy hẹn chuyên gia tâm lý hoặc phòng tư vấn học đường sớm nhất.'
  },
  {
    step: '2',
    title: 'Liên hệ riêng với GVCN & Phòng Tư vấn Tâm lý học đường',
    body:
      'Hẹn gặp CA riêng biệt (không đối đầu trực tiếp phụ huynh bên kia ngay từ đầu). Trình chuẩn bằng chứng khách quan — ghi chép, ảnh chụp, tin nhắn.',
  },
  {
    step: '3',
    title: 'Đề nghị Ban Giám hiệu lập biên bản & bảo vệ an toàn',
    body:
      'Theo Điều 6 Nghị định 80/2017/NĐ-CP, nhà trường có trách nhiệm lập biên bản sự vụ, can thiệp và áp dụng biện pháp bảo vệ an toàn cho con: điều chỉnh chỗ ngồi, chế độ giám sát trong các giờ dễ xảy ra sự cố.',
  },
  {
    step: '4',
    title: 'Kết nối Tổng đài 111 hoặc cơ quan chức năng',
    body:
      'Nếu sự vụ nghiêm trọng (chấn thương, đe dọa tính mạng), hoặc không được xử lý thỏa đáng sau 2 lần phản ánh chính thức — gọi 111 miễn cước 24/7 hoặc trình báo cơ quan gần nhất.',
  },
];

/* ---------------------------------------------------------------- component */

export const SectionParents: React.FC = () => {
  const initialSelection: boolean[] = useMemo(
    () => Array.from({ length: 10 }, () => false),
    [],
  );
  const [checked, setChecked] = useState<boolean[]>(initialSelection);

  const count = checked.filter(Boolean).length;

  const result = useMemo(() => {
    if (count === 0)
      return {
        title: 'Chưa có dấu hiệu nào được đánh dấu',
        tone: 'border-line bg-white',
        color: 'text-muted',
        body:
          'Đừng lo: đây là khuôn đánh dấu theo từng quan sát cảm nhận chủ quan của bạn. Hãy theo dõi con thêm 2 tuần nữa, làm việc cùng con 10 phút mỗi tối, rồi quay lại chấm điểm.',
      };
    if (count <= 3)
      return {
        title: 'Cần quan tâm — và trò chuyện sớm',
        tone: 'border-ochre bg-[#D99B26]/5',
        color: 'text-ochre',
        body:
          'Có một số dấu hiệu cho thấy con có thể đang chịu áp lực hoặc khó chịu ở trường. Hãy bắt đầu một dòng talk nhẹ nhàng: dùng câu "Bố mẹ nhận thấy con gần đây [dấu hiệu]. Con có muốn kể cho bố mẹ không?" — không trách móc, không chớp gian.',
      };
    if (count <= 6)
      return {
        title: 'Cảnh báo — liên hệ giáo viên chủ nhiệm',
        tone: 'border-terra bg-terra/5',
        color: 'text-terra',
        body:
          'Số dấu hiệu này vượt mức "trẻ con hay thay đổi". Hãy liên hệ riêng với GVCN và phòng tư vấn học đường trong tuần này, kèm danh sách dấu hiệu bạn đã đánh dấu. Quy trình 4 bước dưới đây phù hợp để bạn bắt đầu ngay.',
      };
    return {
      title: 'Khẩn cấp — hãy hành động ngay hôm nay',
      tone: 'border-terra bg-terra/10',
      color: 'text-terra',
      body:
        'Số dấu hiệu rất cao — khả năng con đang bị bắt nạt hoặc chịu tổn thương khác là lớn. Bước 1: bảo đảm an toàn thể chất, khoan thay đổi lớp học; Bước 2: liên hệ GVCN và có trực tìmtea phương tư vấn; Bước 3: gọi Tổng đài 111 (miễn cước 24/7) để được tư vấn bảo vệ trẻ em.',
    };
  }, [count]);

  const toggle = (i: number) =>
    setChecked((p) => p.map((v, idx) => (idx === i ? !v : v)));

  let signIndex = 0;

  return (
    <div className="space-y-16 pt-10 sm:pt-14">
      <header className="space-y-4 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-terra">
          Cẩm nang đồng hành
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight leading-tight">
          Khi con thay đổi,{' '}
          <span className="font-editorial italic font-medium">ba mẹ là người nhìn thấy đầu tiên.</span>
        </h1>
        <p className="text-[15px] text-muted leading-relaxed">
          Con bị bắt nạt thường không thể "khóc bằng lời" — nhưng tổn thương
          hiện bài viết qua cơ thể, giấc ngủ, cách dùng điện thoại và thái độ
          với trường lớp. Ba mục dưới đây giúp bạn từ quan sát đến hành động.
        </p>
      </header>

      {/* ----------------- Checklist dấu hiệu cảnh báo sớm -------------------- */}
      <section className="space-y-6" id="checklist">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Công cụ khảo sát dấu hiệu cảnh báo sớm
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Tích chọn những dấu hiệu bạn quan sát ở con
          </h2>
          <p className="text-[13px] text-muted">
            Kết quả chỉ hiển thị ngay trên trang, tuyệt đối không áp ở đâu. Đây
            là công cụ phối hợp quan sát, không phải kết luận y khoa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 border border-line bg-white rounded-md divide-y divide-line">
            {CHECKLIST_GROUPS.map((g) => (
              <div key={g.name} className="p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-sage mb-3">
                  {g.name}
                </p>
                <div className="space-y-2.5">
                  {g.signs.map((s) => {
                    const i = signIndex++;
                    return (
                      <button
                        key={s}
                        onClick={() => toggle(i)}
                        className="w-full flex items-start gap-3 text-left group"
                      >
                        {checked[i] ? (
                          <CircleCheck className="w-4.5 h-4.5 text-sage shrink-0 mt-0.5" aria-hidden />
                        ) : (
                          <Circle className="w-4.5 h-4.5 text-muted/50 shrink-0 mt-0.5 group-hover:text-terra transition-colors" aria-hidden />
                        )}
                        <span className={`text-[13.5px] leading-relaxed transition-colors ${checked[i] ? 'text-ink font-semibold' : 'text-muted group-hover:text-ink'}`}>
                          {s}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-5">
            <div className={`sticky top-24 border rounded-md p-6 space-y-3 ${result.tone}`}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                Kết quả tức thời
              </p>
              <p className="font-editorial text-5xl font-semibold text-ink">
                {count}
                <span className="text-2xl text-muted/70">/10</span>
              </p>
              <h3 className={`font-bold text-[15px] ${result.color}`}>{result.title}</h3>
              <p className="text-[13px] text-muted leading-relaxed">{result.body}</p>
              <a
                href="tel:111"
                className="inline-flex items-center gap-2 text-[13px] font-bold text-terra pt-1 hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" aria-hidden />
                Tổng đài 111 — tư vấn miễn phí 24/7
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ------------------- 3 KHÔNG — 3 CÓ ---------------------------------- */}
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Nghệ thuật lắng nghe con
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Nguyên tắc <span className="font-editorial italic">"3 KHÔNG — 3 CÓ"</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 border border-line rounded-md overflow-hidden">
          {/* 3 KHÔNG */}
          <div className="bg-white border-b lg:border-b-0 lg:border-r border-line">
            <div className="px-6 py-4 bg-sand/60 border-b border-line">
              <p className="font-bold text-terra text-sm tracking-wide">
                3 KHÔNG — những câu vô tình đẩy con ra xa
              </p>
            </div>
            <div className="divide-y divide-line/70">
              {KHONG.map((k, i) => (
                <div key={k.title} className="p-6 space-y-2.5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-editorial text-2xl text-terra/80">0{i + 1}</span>
                    <h3 className="font-bold text-ink text-[14px]">{k.title}</h3>
                  </div>
                  <div className="space-y-1.5 pl-9">
                    {k.quotes.map((q) => (
                      <p key={q} className="text-[12.5px] text-muted italic font-editorial">
                        {q}
                      </p>
                    ))}
                    <p className="text-[12.5px] text-ink/80 leading-relaxed pt-1">{k.explain}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 CÓ */}
          <div className="bg-[#EFEDE4]/40">
            <div className="px-6 py-4 bg-sage/10 border-b border-line">
              <p className="font-bold text-sage text-sm tracking-wide">
                3 CÓ — điểm tựa tâm lý vững chắc cho con
              </p>
            </div>
            <div className="divide-y divide-line/70">
              {CO.map((c, i) => (
                <div key={c.title} className="p-6 space-y-2.5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-editorial text-2xl text-sage/80">0{i + 1}</span>
                    <h3 className="font-bold text-ink text-[14px]">{c.title}</h3>
                  </div>
                  <div className="space-y-1.5 pl-9">
                    {c.quotes.map((q) => (
                      <p key={q} className="text-[12.5px] text-ink/80">
                        {q}
                      </p>
                    ))}
                    <p className="text-[12.5px] text-muted leading-relaxed pt-1">{c.explain}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------- Quy trình 4 bước ----------------------------- */}
      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Phối hợp cùng nhà trường — theo Nghị định 80/2017/NĐ-CP
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Quy trình 4 bước, đi đúng trình tự
          </h2>
        </div>
        <ol className="border border-line rounded-md divide-y divide-line bg-white overflow-hidden">
          {PROCESS.map((p) => (
            <li key={p.step} className="flex gap-5 p-6 sm:p-7">
              <span className="w-9 h-9 grid place-items-center bg-navy text-white font-editorial text-sm rounded-sm shrink-0">
                {p.step}
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-ink text-[15px]">{p.title}</h3>
                <p className="text-[13px] text-muted leading-relaxed max-w-3xl">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="border-t border-line pt-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <p className="font-editorial italic text-lg text-ink max-w-xl">
          "Con cần một điểm tựa vững vàng — không cần ba mẹ hoàn hảo."
        </p>
        <a
          href="tel:111"
          className="shrink-0 inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-[#0f1a29] transition-colors"
        >
          <PhoneCall className="w-4 h-4" aria-hidden />
          Nói chuyện với tư vấn viên 111
        </a>
      </section>
    </div>
  );
};
