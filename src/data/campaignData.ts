import type { ForumSnapshot, ForumRole } from '../types';

const MIN = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;
const now = Date.now();

export const TOPICS = [
  '#BắtNạtMạng',
  '#BịCôLập',
  '#GócPhụHuynh',
  '#ĐãVượtQua',
] as const;

export const FORUM_ROLES: ForumRole[] = [
  'Học sinh',
  'Người chứng kiến',
  'Phụ huynh',
  'Giáo viên',
];

export const SEED_SNAPSHOT: ForumSnapshot = {
  posts: [
    {
      id: 'seed-1',
      alias: 'Cây Xương Rồng Nhỏ',
      role: 'Học sinh',
      topic: '#ĐãVượtQua',
      content:
        'Em học lớp 7. Cả học kỳ vừa rồi em bị một nhóm bạn trong lớp đặt biệt danh xấu, chụp ảnh em rồi chế meme cười trên group Zalo. Có tháng em lừa ba mẹ nói mình ốm để nghỉ học. Sau đó cô giáo tâm lý trong trường nghe em kể hết, cùng em chụp màn hình làm bằng chứng, và mời phụ huynh hai bên lên làm việc theo hướng dẫn của Hiệu trưởng. Nhóm bạn đó đã xin lỗi em trước lớp. Em muốn nói với các bạn đang chịu bắt nạt: chuyện của em CÓ THỂ được giải quyết. Điều quan trọng nhất là đừng im lặng giữ một mình — các thầy cô sẽ không chê cười em như các bạn từng trêu đâu.',
      createdAt: now - 26 * HOUR,
      hugs: 214,
      commentsCount: 0,
    },
    {
      id: 'seed-2',
      alias: 'Bạn Học Lớp 11',
      role: 'Người chứng kiến',
      topic: '#BịCôLập',
      content:
        'Lớp em có một bạn bị cả tổ tẩy chay từ đầu tháng: không ai ngồi cùng, nhóm thuyết trình bỏ bạn lại. Em muốn giúp nhưng sợ bị kéo vào bị cô lập thêm. Hôm qua em thử cách "đánh lạc hướng": giả vờ nhờ bạn xuống thư viện giúp cầm sách, rồi từ đó ngồi lại bàn kế bên bạn theo đúng sơ đồ ghế. Đám bạn kia giờ gọi em là "kẻ hai mặt". Em phải làm sao để tiếp tục giúp bạn mà không biến mình thành mục tiêu tiếp theo?',
      createdAt: now - 9 * DAY,
      hugs: 156,
      commentsCount: 0,
    },
    {
      id: 'seed-3',
      alias: 'Một người mẹ lặng thầm',
      role: 'Phụ huynh',
      topic: '#GócPhụHuynh',
      content:
        'Ba tuần trước, con gái tôi khóc và nói con không muốn đi học. Ban đầu tôi suýt lao đến lớp "mắng thẳng" — may mà kịp dừng lại. Tôi làm đúng trình tự: ôm con, khẳng định "việc này không phải lỗi của con", cùng con ghi chép diễn biến từng buổi: buổi sáng bạn nam chặn đường, xé giỏ xách, đập cặp xuống đất kèm lời đe dọa. Tôi chụp ảnh vết xước trên tay con, hẹn gặp riêng cô giáo chủ nhiệm. Nhà trường đã lập biên bản theo hướng của Thông tư 06/2019/TT-BGDĐT để phối hợp giáo dục nhóm bạn kia. Tôi muốn nhắn với các ba mẹ: đừng nóng. Thu thập bằng chứng lên trước — đó là cách bảo vệ con chắc nhất.',
      createdAt: now - 3 * DAY,
      hugs: 188,
      commentsCount: 0,
    },
    {
      id: 'seed-4',
      alias: 'Giọng Nói Thầm',
      role: 'Học sinh',
      topic: '#BắtNạtMạng',
      content:
        'Trang confession của trường em vừa đăng bài nặc danh ghi thẳng tên tôi, viết những điều không có thật. Bài đã được chia sẻ 40 lần và giờ ai nhìn tôi cũng có thái độ khác. Em đã chụp lại toàn bộ bài đăng, thời gian, đường link. Nhưng em băn khoăn: có nên bình luận công khai để đính chính, hay để yên cho bài trôi? Sợ nếu phản hồi thì lại bị "xả" thêm.',
      createdAt: now - 5 * HOUR,
      hugs: 97,
      commentsCount: 0,
    },
    {
      id: 'seed-5',
      alias: 'Thầy Chủ nhiệm Lớp 9',
      role: 'Giáo viên',
      topic: '#GócPhụHuynh',
      content:
        'Với nhiều năm làm chủ nhiệm, điều tôi tin chắc: không có trẻ em "hư" một cách ngẫu nhiên. Phụ huynh đừng đợi đến nhận xét cuối học kỳ. Cứ hai tuần một lần, hỏi con hai câu ngắn: "Tuần vừa rồi ở trường có chuyện gì khiến con khó ở?" và "Giữa những người lớn quanh mình, con tin tưởng nhất là ai?". Câu trả lời sẽ nói nhiều hơn mọi bảng điểm. Và với em nào đang bị bắt nạt: sự hiện diện an toàn của một người lớn vững vàng quan trọng hơn nghìn lời giảng dạy.',
      createdAt: now - 1 * DAY,
      hugs: 242,
      commentsCount: 0,
    },
  ],
  comments: {
    'seed-1': [
      {
        id: 'seed-c-1a',
        postId: 'seed-1',
        alias: 'Cô Mai Lan — Tư vấn Tâm lý học đường',
        role: 'Giáo viên',
        content:
          'Em dũng cảm lắm. Em đã làm đúng ba việc quan trọng nhất: (1) không trả lời công kích trong group, (2) chụp màn hình bằng chứng trước khi nội dung bị xóa, (3) nhờ một người lớn tin cậy đồng hành. Cách nhà trường xử lý cho em đúng là quy trình phòng ngừa — can thiệp — theo dõi tiếp theo của Nghị định 80/2017/NĐ-CP. Chúc em một kỳ học bình an.',
        createdAt: now - 25 * HOUR,
      },
      {
        id: 'seed-c-1b',
        postId: 'seed-1',
        alias: 'Mầm Xanh',
        role: 'Học sinh',
        content:
          'Đọc đến đoạn "lừa ba mẹ nghỉ học" như thấy chính mình trong đó. Mai em sẽ lên phòng thầy cô cố vấn tâm lý của trường — điều em trân trọng nhất từ câu chuyện của bạn. Cảm ơn bạn vì câu chuyện rất thật này.',
        createdAt: now - 20 * HOUR,
      },
    ],
    'seed-2': [
      {
        id: 'seed-c-2a',
        postId: 'seed-2',
        alias: 'Cô Mai Lan — Tư vấn Tâm lý học đường',
        role: 'Giáo viên',
        content:
          'Bạn đang thực hiện đúng chữ D thứ hai trong quy tắc 5D: Distract — giả vờ nhờ việc để kéo bạn ra khỏi đám đông. Về chuyện bị gọi "kẻ hai mặt": ngăn một hành vi sai là nghĩa đúng, không phải hai mặt. Bước tiếp theo an toàn nhất: nhắn riêng cho cô chủ nhiệm. Nhà trường sẽ can thiệp từ phía trên (chia lại nhóm công bằng, nhắc nhở đúng quy trình) và tuyệt đối không để lộ danh tính người báo tin — Điều 21 Luật Trẻ em 2016 bảo đảm điều đó.',
        createdAt: now - 8 * DAY,
      },
      {
        id: 'seed-c-2b',
        postId: 'seed-2',
        alias: 'Bông Hoa Kiên Cường',
        role: 'Học sinh',
        content:
          'Em từng gặp tình huống y như vậy. Cách em qua được 1 tuần đầu: cứ ngồi gần cô khỏi bị quấy rối, nhờ một chị trong nhóm khác rủ mình cùng bơi môn học mình giỏi. Khi bạn được nhìn thấy ở một vai trò khác, đám kẻ trêu chọc sẽ dần hết chủ đề. Quan trọng: đừng tự dồn mình vào góc chết nhé.',
        createdAt: now - 30 * HOUR,
      },
    ],
    'seed-4': [
      {
        id: 'seed-c-4a',
        postId: 'seed-4',
        alias: 'Cô Mai Lan — Tư vấn Tâm lý học đường',
        role: 'Giáo viên',
        content:
          'Em mới làm đúng bước SAVE: chụp toàn bộ màn hình, thời gian, đường link. Với confession nặc danh — bài đăng vu khống bằng danh tính giả vẫn thuộc phạm vi Điều 101 Nghị định 15/2020/NĐ-CP (xúc phạm danh dự trên không gian mạng). Hành động an toàn nhất ngay lúc này: KHÔNG bình luận công khai (tránh bị "xả" thêm), mà gửi toàn bộ bằng chứng cho GVCN hoặc phòng tư vấn học đường trong hôm nay để nhà trường yêu cầu gỡ bài và mời đại diện phụ huynh các bên lên cùng làm rõ.',
        createdAt: now - 4 * HOUR,
      },
      {
        id: 'seed-c-4b',
        postId: 'seed-4',
        alias: 'Một người mẹ lặng thầm',
        role: 'Phụ huynh',
        content:
          'Con ơi, đừng để chuyện này "trôi": việc để yên khiến con mang tổn thương thêm lâu. Ba mẹ luôn ở đây. Hôm nay mình cùng con đi gặp thầy cô, cùng xếp bằng chứng, được không? Cả nhà cùng làm, con không phải một mình đâu.',
        createdAt: now - 2 * HOUR,
      },
    ],
  },
};

// ---------------------------------------------------------------- 4 loại bạo lực

export interface ViolenceType {
  id: string;
  index: string;
  name: string;
  en: string;
  recognition: string[];
  impact: string;
  example: string;
}

export const VIOLENCE_TYPES: ViolenceType[] = [
  {
    id: 'physical',
    index: '01',
    name: 'Bạo lực thể chất',
    en: 'Physical Bullying',
    recognition: [
      'Đánh đập, tát, xô đẩy, giật tóc trong sân trường, hành lang',
      'Giấu, xé, nhét sách vở xuống gầm bàn hoặc dưới bồn cầu',
      'Trấn lột tiền ăn sáng, ép phục dịch làm việc (mua đồ ăn, xách cặp)',
      'Khóa cửa nhốt trong nhà vệ sinh',
    ],
    impact:
      'Chấn thương có thể để sẹo; về tâm lý gây rối loạn giấc ngủ và nỗi sợ đến trường kéo dài ngay cả khi vết ngoài da đã khỏi.',
    example:
      'Dấu hiệu nhận diện nhanh: băng gạc bất thường, đồ dùng thất thoát hỏng, né trả lời khi hỏi "hôm nay ở trường sao".',
  },
  {
    id: 'verbal',
    index: '02',
    name: 'Bạo lực lời nói',
    en: 'Verbal Bullying',
    recognition: [
      'Đặt biệt danh miệt thị vóc dáng, màu da, giọng vùng miền',
      'Chê giễu ngoại hình dưới cớ "đùa cho vui" (body shaming)',
      'Nhạo báng hoàn cảnh gia đình, giới tính, học lực',
      'Đe dọa "mày dám mách" để khóa miệng nạn nhân',
    ],
    impact:
      'Bào mòn lòng tự trọng từng ngày; nạn nhân dần tin những lời đó là thật và bắt đầu tự nói xấu về chính mình.',
    example:
      'Dấu hiệu nhận diện nhanh: con đột nhiên tự phê bình ngoại hình, nói chêm "con xấu", "con dở" thường xuyên.',
  },
  {
    id: 'relational',
    index: '03',
    name: 'Bạo lực quan hệ / Cô lập xã hội',
    en: 'Relational Bullying',
    recognition: [
      'Tẩy chay có tổ chức: rủ cả lớp không ngồi cùng, không giao tiếp',
      'Kích động cả nhóm nghỉ chơi, đá khỏi nhóm học tập, đội thuyết trình',
      'Coi nạn nhân như "người vô hình" khi đi ngang, không chào hỏi',
      'Bịa đặt tin đồn, thêu dệt câu chuyện để bạn bè xa lánh',
    ],
    impact:
      'Hình thức "vô hình" nhất nhưng tác động sâu nhất: niềm tin vào tình bạn bị phá hủy, dẫn tới lo âu, trầm cảm — báo cáo UNESCO nhấn mạnh đây là loại phổ biến nhất ở học sinh nữ.',
    example:
      'Dấu hiệu nhận diện nhanh: con rút về một mình trong giờ ra chơi, nói câu "không có gì" mỗi khi hỏi về bạn bè.',
  },
  {
    id: 'cyber',
    index: '04',
    name: 'Bạo lực mạng',
    en: 'Cyberbullying',
    recognition: [
      'Lập group anti trên Messenger/Zalo, chế ảnh, meme dìm hàng',
      'Đăng bài bóc phốt nặc danh trên trang confession của trường',
      'Công kích hội đồng dưới bài đăng cá nhân của nạn nhân',
      'Đe dọa phát tán hình ảnh riêng tư, chụp màn hình để "cầm cán"',
    ],
    impact:
      'Hoạt động 24/7: đến nhà cũng không thoát. Phòng ngủ không còn là vùng an toàn, nạn nhân dễ rơi vào bất lực và ý nghĩ cực đoan nếu không được can thiệp đúng lúc.',
    example:
      'Dấu hiệu nhận diện nhanh: con ôm điện thoại chặt, khóc lúc lướt màn hình, tự xóa tài khoản, bỏ bữa, mất ngủ.',
  },
];

// ---------------------------------------------------------------- pháp lý

export interface LegalDoc {
  id: string;
  number: string;
  title: string;
  org: string;
  year: string;
  summary: string;
  provisions: { label: string; text: string }[];
}

export const LEGAL_DOCS: LegalDoc[] = [
  {
    id: 'nd80',
    number: 'Nghị định 80/2017/NĐ-CP',
    title:
      'Quy định về môi trường giáo dục an toàn, lành mạnh, thân thiện, phòng, chống bạo lực học đường',
    org: 'Chính phủ nước CHXHCN Việt Nam',
    year: '2017',
    summary:
      'Văn bản gốc của toàn bộ công tác phòng chống bạo lực học đường: định nghĩa pháp lý chính thức và quy trách nhiệm cụ thể cho nhà trường khi phát hiện, xử lý sự vụ.',
    provisions: [
      {
        label: 'Khoản 5 Điều 2 — Định nghĩa pháp lý',
        text:
          '"Bạo lực học đường là hành vi hành hạ, ngược đãi, đánh đập hoặc tấn công, xâm hại thân thể, sức khỏe; lăng mạ, xúc phạm danh dự, nhân phẩm; cô lập, xua đuổi và các hành vi cố ý khác gây tổn hại về thể chất và tinh thần của người học trong cơ sở giáo dục hoặc ngoài đời sống."',
      },
      {
        label: 'Điều 6 — Phòng ngừa, phát hiện',
        text:
          'Nhà trường có trách nhiệm xây dựng quy tắc ứng xử, tuyên truyền pháp luật, rèn kỹ năng tự bảo vệ cho người học; thành lập tổ tư vấn tâm lý học đường; tiếp nhận và xử lý thông tin kịp thời, khách quan, bảo mật.',
      },
      {
        label: 'Xử lý sự vụ',
        text:
          'Khi phát hiện bạo lực học đường, cơ sở giáo dục phải kịp thời ngăn chặn, bảo vệ nạn nhân, phong tỏa hiện trường, lập biên bản, phối hợp với cơ quan có thẩm quyền xử lý nghiêm viêm và chăm sóc tâm lý cho các em trong vụ việc.',
      },
    ],
  },
  {
    id: 'luattre',
    number: 'Luật Trẻ em số 102/2016/QH13',
    title: 'Luật Trẻ em',
    org: 'Quốc hội khóa XIII — thông qua 04/2016, hiệu lực 01/06/2017',
    year: '2016',
    summary:
      'Nền tảng quyền cơ bản nhất cho mọi học sinh dưới 16 tuổi: được sống trong môi trường an toàn, được bảo vệ vật chất và tinh thần, được lên tiếng báo tin và danh tính bảo mật tuyệt đối.',
    provisions: [
      {
        label: 'Điều 6 — Quyền được bảo vệ',
        text:
          'Trẻ em có quyền được sống và được bảo vệ; quyền được sống trong môi trường thân thiện, an toàn, lành mạnh.',
      },
      {
        label: 'Điều 21 — Quyền được bảo vệ thông tin cá nhân',
        text:
          'Trẻ em được bảo vệ danh tính, bí mật về đời tư và các thông tin cá nhân khác — kể cả khi đã kết thúc việc bảo vệ. Danh tính người lên tiếng báo tin không được công khai vì bất kỳ lý do nào.',
      },
      {
        label: 'Điều 26 — Quyền được bảo vệ khỏi bị bạo lực',
        text:
          'Trẻ em có quyền được bảo vệ để không bị bỏ rơi, bỏ mặc, gây tổn hại thân thể, ngược đãi, hành hạ, đánh đập hoặc đối xử tàn nhẫn, bỉnh thị; quyền được lắng nghe và trình báo.',
      },
      {
        label: 'Điều 27 — Quyền được bảo vệ khỏi bị bóc lột',
        text:
          'Trẻ em có quyền được bảo vệ, không bị bóc lột, ép buộc sức lao động dưới mọi hình thức và được chống lại mọi đối xử bất công.',
      },
    ],
  },
  {
    id: 'tt06',
    number: 'Thông tư 06/2019/TT-BGDĐT',
    title:
      'Quy tắc ứng xử trong cơ sở giáo dục mầm non, phổ thông và thường xuyên',
    org: 'Bộ Giáo dục và Đào tạo',
    year: '2019',
    summary:
      'Chuẩn mực hành vi trong trường học (học sinh — học sinh, giáo viên — học sinh, giáo viên — phụ huynh). Là căn cứ để nhà trường nhận định hành vi "vượt chuẩn mực" trong mỗi sự vụ.',
    provisions: [
      {
        label: 'Học sinh với học sinh',
        text:
          'Tôn trọng sức khỏe, tài sản, danh dự, nhân phẩm của nhau; không sử dụng ngôn từ hoặc hành vi xâm hại danh dự; tôn trọng sự khác biệt về văn hóa, tôn giáo và hoàn cảnh gia đình.',
      },
      {
        label: 'Giáo viên với học sinh',
        text:
          'Xây dựng mối quan hệ tôn trọng, bình đẳng, gần gũi; lắng nghe, động viên, hỗ trợ; không phân biệt đối xử, không đe dọa, không được có hành vi bạo lực học đường.',
      },
      {
        label: 'Giáo viên với phụ huynh',
        text:
          'Trao đổi thông tin, hợp tác hỗ trợ học sinh; tiếp nhận ý kiến phản ánh khách quan; bảo mật thông tin cá nhân của học sinh theo quy định.',
      },
    ],
  },
  {
    id: 'nd144',
    number: 'Nghị định 144/2021/NĐ-CP',
    title:
      'Quy định về xử phạt vi phạm hành chính trong lĩnh vực an ninh, trật tự, an toàn xã hội',
    org: 'Chính phủ nước CHXHCN Việt Nam',
    year: '2021',
    summary:
      'Căn cứ xử phạt hành vi xúc phạm danh dự, nhân phẩm người khác bằng lời nói hoặc hành động ngoài đời thực — áp dụng với các hành vi bắt nạt mặt đối mặt.',
    provisions: [
      {
        label: 'Điều 7 — Xúc phạm, làm nhục người khác',
        text:
          'Phạt tiền từ 10.000.000 đồng đến 20.000.000 đồng đối với hành vi xúc phạm nghiêm trọng danh dự, nhân phẩm người khác; kèm biện pháp bổ sung: buộc gỡ bỏ, xóa bỏ các thông tin có nội dung xúc phạm.',
      },
    ],
  },
  {
    id: 'nd15',
    number: 'Nghị định 15/2020/NĐ-CP',
    title:
      'Quy định về xử phạt vi phạm hành chính trong lĩnh vực bưu chính, viễn thông, tần số vô tuyến điện và thông tin số',
    org: 'Chính phủ nước CHXHCN Việt Nam',
    year: '2020',
    summary:
      'Căn cứ xử lý mọi hành vi xúc phạm danh dự, nhân phẩm trên mạng xã hội — kể cả bài đăng nặc danh hoặc bài đã xóa, người thực hiện vẫn chịu trách nhiệm pháp lý.',
    provisions: [
      {
        label: 'Điều 101 — Xúc phạm trên không gian mạng',
        text:
          'Phạt tiền từ 10.000.000 đồng đến 20.000.000 đồng đối với hành vi lợi dụng mạng xã hội để cung cấp, chia sẻ xuyên tạc, vu khống, xúc phạm danh dự và nhân phẩm của cơ quan, tổ chức hoặc cá nhân.',
      },
    ],
  },
  {
    id: 'unicef-unesco',
    number: 'Báo cáo UNESCO & UNICEF Việt Nam',
    title:
      '"Behind the numbers: Ending school violence and bullying" & Khảo sát An toàn trực tuyến',
    org: 'UNESCO / UNICEF',
    year: '2019 — 2021',
    summary:
      'Cơ sở khoa học cho số liệu chiến dịch sử dụng, xác định nhóm ưu tiên: bạo lực quan hệ và bắt nạt trên mạng là hai lĩnh vực cần can thiệp sớm nhất.',
    provisions: [
      {
        label: 'UNESCO 2019',
        text:
          'Gần 32% học sinh toàn cầu (1 trên 3 trẻ) từng bị bạn học bắt nạt ít nhất một lần trong 30 ngày; bạo lực tinh thần và bắt nạt trên không gian mạng có xu hướng gia tăng mạnh nhất.',
      },
      {
        label: 'UNICEF Việt Nam',
        text:
          'Khảo sát trực tuyến hơn 5.000 học sinh 13–17 tuổi: 1 trong 5 bạn từng là nạn nhân bắt nạt trực tuyến; 75% không biết tìm đến đâu để được hỗ trợ tâm lý an toàn và bảo mật.',
      },
      {
        label: 'Nhóm nguy cơ cao',
        text:
          'Học sinh thuộc nhóm dễ bị tổn thương — người có khuyết tật, người khác màu da, gia cảnh khó khăn, thuộc giới tính thiểu số — có nguy cơ bị bạo lực quan hệ cao vượt trội so với nhóm chung.',
      },
    ],
  },
];

// ---------------------------------------------------------------- danh bạ

export const EMERGENCY_CONTACTS = [
  {
    number: '111',
    name: 'Tổng đài Quốc gia Bảo vệ Trẻ em 111',
    detail:
      'Miễn cước viễn thông hoàn toàn, hoạt động 24/7. Tư vấn tâm lý, tiếp nhận tin báo và can thiệp bảo vệ trẻ em khẩn cấp, kể cả bạo lực học đường.',
    href: 'tel:111',
    tag: 'Ưu tiên đầu tiên',
  },
  {
    number: '113',
    name: 'Đường dây nóng Cảnh sát',
    detail:
      'Báo tin khẩn khi có hành vi bạo lực đe dọa trực tiếp tính mạng, sức khỏe; gây rối trật tự tại trường học.',
    href: 'tel:113',
    tag: 'Tính mạng',
  },
  {
    number: '115',
    name: 'Cấp cứu Y tế',
    detail:
      'Cấp cứu y tế khẩn cấp cho trường hợp chấn thương cơ thể, nguy hiểm tính mạng, ngất xỉu.',
    href: 'tel:115',
    tag: 'Sức khỏe',
  },
  {
    number: 'PA05',
    name: 'Cục An toàn thông tin / Phòng An ninh mạng (Bộ Công an)',
    detail:
      'Hướng dẫn trình báo các vụ việc trên không gian mạng mức độ nặng: tống tiền, phát tán hình ảnh nhạy cảm, vu khống nghiêm trọng, chiếm đoạt tài khoản.',
    href: 'https://tuyengian.mic.gov.vn',
    tag: 'Không gian mạng',
  },
];

// ---------------------------------------------------------------- trắc nghiệm

export interface QuizChoice {
  id: string;
  text: string;
  quality: 'best' | 'ok' | 'bad';
  analysis: string;
}

export interface QuizScenario {
  id: string;
  index: string;
  situation: string;
  choices: QuizChoice[];
}

export const QUIZ_SCENARIOS: QuizScenario[] = [
  {
    id: 'scenario-1',
    index: '01',
    situation:
      'Chiều nay, trong group chat Zalo của lớp xuất hiện tấm ảnh cắt ghép gương mặt của bạn Thu — một bạn cùng lớp — kèm dòng chú nghĩa chế nhạo. Group bùng nổ thả véi, nhiều bạn chụp màn hình gửi sang nhóm khác. Bạn biết chắc rằng Thu cũng đang ở trong group này.',
    choices: [
      {
        id: 's1-a',
        text:
          'Chụp lại ảnh làm bằng chứng, rồi lặng lẽ nhắn riêng cho Thu: "Em ổn không? Đừng đọc nữa, mình sẽ đưa cho cô chủ nhiệm xử lý nhé."',
        quality: 'best',
        analysis:
                    'Đây là hành động kết hợp hai chữ D: Document (giữ bằng chứng trước khi nội dung bị xóa) và Delegate (chuyển cho người lớn có thẩm quyền). Việc nhắn riêng giúp Thu cảm thấy an toàn — không bị đem câu chuyện ra "xét xử" trước tập thể.',
      },
      {
        id: 's1-b',
        text:
          'Trả lời công khai trong group: "Cái này không vui đâu, xóa đi. Chế ảnh người khác là phản cảm."',
        quality: 'ok',
        analysis:
                    'Đây là Direct — hành động trực tiếp và dũng cảm. Hạn chế: trong không gian chat, nhóm "sáng tạo" dễ chuyển hướng tấn công bạn. Nếu chọn cách này, hãy chuẩn bị sẵn bằng chứng gửi cho cô để có người lớn đứng ngay sau bạn. Và quan trọng: không dùng lời xúc phạm để đáp trả xúc phạm.',
      },
      {
        id: 's1-c',
        text: 'Cứ để trôi qua, lặng lẽ "cười cho vui" vài cái để không bị coi là lệch nhóm.',
        quality: 'bad',
        analysis:
          'Cách này tạo cảm giác an toàn tức thời, nhưng về bản chất bạn đang là khán giả tiếp tay: mỗi tiếng cười giúp củng cố nỗi xấu hổ của Thu. Nếu chưa đủ tự tin hành động ngay, gửi ảnh và tên group cho cô — vẫn giàu giá trị hơn ngồi xem.',
      },
      {
        id: 's1-d',
        text: 'Chụp màn hình, gửi thêm cho nhóm khác để "vui", góp thêm bình luận cùng đả kích.',
        quality: 'bad',
        analysis:
          'Lựa chọn này khiến bạn tiếp tay trực tiếp và có thể chịu trách nhiệm pháp lý: hành vi cắt ghép, chia sẻ để xúc phạm có thể vi phạm Điều 101 Nghị định 15/2020/NĐ-CP và Điều 7 Nghị định 144/2021/NĐ-CP.',
      },
    ],
  },
  {
    id: 'scenario-2',
    index: '02',
    situation:
      'Sau giờ học, em (lớp 8) bị một nhóm bạn khác chặn ngang hẻm ven trường "xin đểu" tiền ăn sáng. Nhóm đứng chắn đường, một bạn dúi tay vào vai em, nói: "Chạy làm gì, đây là chuyện bình thường ở cấp 2."',
    choices: [
      {
        id: 's2-a',
        text:
          'Giữ bình tĩnh, quay đầu về hướng cổng đông người, đi vào chỗ cô bảo vệ / khu vực camera, sau đó kể đúng diễn biến cho cô chủ nhiệm và bố mẹ, giữ bằng chứng (thời gian, bộ dạng, lời nói).',
        quality: 'best',
        analysis:
          'Ưu tiên số một là an toàn: di chuyển nhanh tới khu vực đông người, có camera hoặc giám thị — đúng nguyên tắc không một mình vào góc khuất. Sau đó, Delegate: báo ngay người lớn kèm bằng chứng cụ thể (nơi, giờ, lời lẽ, số người) để nhà trường xử lý theo Nghị định 80/2017/NĐ-CP.',
      },
      {
        id: 's2-b',
        text:
          'Nói dịu dàng: "Hôm nay em hết rồi, mai em trả lại" — để thoát tình huống và đừng vướng vào cãi vã.',
        quality: 'ok',
        analysis:
          'Tạm nhượng bộ để rời khỏi tình huống là cách chấp nhận được nếu em đang bối rối; nhưng có nguy cơ trở thành "khoản nạp" nhiều lần. Nếu chọn cách này: tuyệt đối không giấu, kể ngay cho phụ huynh — hầu hết các vụ "xin đểu" không dừng ở lần đầu.',
      },
      {
        id: 's2-c',
        text: 'Táp lại: "Chả ai sợ mày", lao ra chiến đấu để chứng minh mình không sợ.',
        quality: 'bad',
        analysis:
          'Đối đầu bằng bạo lực có thể khiến em bị xử lý cuối cùng — và làm tăng kích thích kẻ bắt nạt. Điều này không chứng minh sự dũng cảm; dũng cảm thật sự là bảo vệ được bản thân bằng cách thông minh: rời góc khuất, nhờ người lớn, lưu bằng chứng.',
      },
      {
        id: 's2-d',
        text: 'Đăng công khai lên nhóm lớp: "Các bạn kia xin đểu tiền của mình", kèm tên của từng người để bạn bè cùng "đấu khẩu".',
        quality: 'bad',
        analysis:
          'Đây là hành vi công kích mà cho dù kẻ kia từng sai: đăng công khai kích dẫn hội đồng công kích lại có thể biến em thành người vi phạm pháp lý giống như em báo cáo. Cách đúng: nhờ người lớn xử lý trên hàng, không lai tạo vấn đề khác.',
      },
    ],
  },
  {
    id: 'scenario-3',
    index: '03',
    situation:
      'Tổ bạn được chia nhóm 4 soạn bài thuyết trình. Ba bạn kia lập group chat riêng, trao đổi file, hẹn tối hôm trước buổi trình bày — bỏ mặc bạn. Đến lớp, nhóm "phủ nhận" trước toàn lớp: "Đã mời chia nhóm nhưng bạn không theo." Bạn đứng trên bục, trước mắt cả lớp.',
    choices: [
      {
        id: 's3-a',
        text:
          'Giữ bình tĩnh, nói với cô và cả lớp theo đúng diễn biến: "Hôm qua em không được mời vào nhóm, không trao đổi phần nào được." Sau giờ học, gặp riêng cô chủ nhiệm, trình bày toàn bộ bằng chứng (ảnh chụp group chat, thời gian trao đổi).',
        quality: 'best',
        analysis:
          'Bạn vừa giữ được hai điều quan trọng nhất: sự bình tĩnh — không cho kẻ bắt nạt cơ hội "theo dõi cảm xúc" để chế; và Delegate — chuyển toàn bộ bằng chứng khách quan cho cô chủ nhiệm theo tinh thần Thông tư 06/2019/TT-BGDĐT, để nhà trường chia lại nhóm công bằng cho cả tổ.',
      },
      {
        id: 's3-b',
        text:
          'Đứng trên bục nói to cả lớp: "Nhóm này nói dối. Họ cố tình vứt mình."',
        quality: 'ok',
        analysis:
          'Đây là cách phản đối trực tiếp, dũng cảm — nhưng rủi ro: khi cảm xúc đang dâng, lời trình bày có thể nghe như công kích và nhóm kia vẫn có cách "biện giải". Nếu chọn cách này, hãy tóm tắt ngắn gọn đúng sự việc, không nói xấu, và gửi bằng chứng cho cô ngay sau đó.',
      },
      {
        id: 's3-c',
        text: 'Cầm bài làm một mình, lặng lẽ ngồi vào góc lớp cho qua buổi.',
        quality: 'bad',
        analysis:
          'Tự cô lập chính mình sẽ khiến tổn thương nhân lên nhiều lần — đúng thứ mà kẻ bạo lực muốn. Ít nhất, hãy cho một người lớn biết chuyện: bước vào phòng tư vấn học đường hoặc nhắn cho cô chủ nhiệm ngay sau giờ học.',
      },
      {
        id: 's3-d',
        text: 'Nhắn riêng từng bạn trong nhóm: "Sao lại vậy? Mình làm gì sai à?"',
        quality: 'bad',
        analysis:
          'Nhắn riêng cho từng kẻ bắt nạt thường khiến em bị chèo lái ngược: mỗi người một lời đối phó, xong nhóm lại đổi "phiên bản câu chuyện". Bước đi đúng chuẩn: báo cô chủ nhiệm với bằng chứng khách quan trước, rồi mới trao đổi, nếu cần, có cô ngồi cùng.',
      },
    ],
  },
];

// ---------------------------------------------------------------- nhỏ

export const OPENING_QUOTE =
  '"Tình bạn được xây đắp bằng sự thấu hiểu, không phải bằng nỗi sợ hãi."';

export const CORE_PRINCIPLES = [
  'Không bắt nạt bạn',
  'Không im lặng chịu đựng',
  'Không làm khán giả vô tâm',
];
