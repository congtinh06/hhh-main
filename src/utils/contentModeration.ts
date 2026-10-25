/**
 * Utility for filtering toxic language and ensuring a safe school environment
 */

// Danh sách các từ ngữ công kích, chửi thề, quấy rối hoặc bắt nạt học đường phổ biến
const BLOCKED_WORDS = [
  'đm', 'dm', 'đmm', 'dmm', 'vcl', 'cl', 'vcl', 'cc', 'mẹ mày', 'me may', 
  'bố mày', 'bo may', 'chó', 'thằng chó', 'đồ ngu', 'ngu vcl', 'óc chó', 
  'con điếm', 'đĩ', 'dmm', 'đê tiện', 'chết đi', 'chet di', 'tự tử đi', 
  'đánh chết', 'danh chet', 'giết', 'giet', 'đồ rác rưởi', 'rac ruoi',
  'bitch', 'fuck', 'shit', 'asshole', 'idiot'
];

export interface ModerationResult {
  isSafe: boolean;
  reason?: string;
}

export function validateContentSafety(text: string): ModerationResult {
  if (!text || text.trim().length === 0) {
    return { isSafe: false, reason: 'Nội dung không được để trống.' };
  }

  const normalized = text.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .replace(/\s+/g, ' ');

  for (const word of BLOCKED_WORDS) {
    // Check whole word or clear occurrence
    const regex = new RegExp(`(^|\\s)${word}(\\s|$)`, 'i');
    if (regex.test(normalized) || normalized.includes(word)) {
      return {
        isSafe: false,
        reason: 'Nội dung chứa từ ngữ chưa phù hợp với môi trường học đường thân thiện. Vui lòng sử dụng ngôn từ tích cực, tôn trọng lẫn nhau.'
      };
    }
  }

  return { isSafe: true };
}
