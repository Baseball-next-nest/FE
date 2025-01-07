export function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const target = new Date(timestamp);
  const diff = (now.getTime() - target.getTime()) / 1000; // 차이를 초 단위로 계산

  if (diff < 10) {
    return "방금 전"; // 10초 미만
  } else if (diff < 60) {
    return `${Math.floor(diff)}초 전`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}분 전`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)}시간 전`;
  } else if (diff < 7 * 86400) {
    return `${Math.floor(diff / 86400)}일 전`;
  } else {
    return target.toLocaleDateString(); // 기본 날짜 포맷
  }
}
