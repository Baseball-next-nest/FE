const TEAM_NAME_MAP: Record<string, string> = {
  doosan: "두산",
  lotte: "롯데",
  lg: "LG",
  hanwha: "한화",
  samsung: "삼성",
  kia: "KIA",
  kt: "KT",
  nc: "NC",
  ssg: "SSG",
  kiwoom: "키움",
};

export function getTeamNameInKorean(team: string): string {
  return TEAM_NAME_MAP[team] || team; // 매핑되지 않은 경우 원래 값을 반환
}
