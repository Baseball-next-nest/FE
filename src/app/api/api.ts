export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://13.209.70.240:3000";

async function fetcher(url: string, options?: RequestInit) {
  const { headers: customHeaders, ...restOptions } = options || {};

  // Content-Type 자동 설정: JSON일 경우만 지정
  const isJSON = customHeaders?.["Content-Type"] === "application/json";

  const res = await fetch(`${BASE_URL}${url}`, {
    ...restOptions,
    headers: {
      ...(isJSON ? { "Content-Type": "application/json" } : {}), // JSON만 Content-Type 설정
      ...customHeaders, // 추가적인 사용자 정의 헤더
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text(); // 에러 메시지 읽기
    throw new Error(`Failed to fetch data: ${errorText}`);
  }

  return res.json();
}

export async function getHitter() {
  return fetcher(`/player/hitter`);
}
export async function getPitcher() {
  return fetcher(`/player/pitcher`);
}

export async function getPlayerIdData(id: string) {
  return fetcher(`/player/detail?id=${id}`);
}
export async function getPlayerNameData(name: string) {
  return fetcher(`/player/search?name=${name}`);
}

export async function createPost(postData: any) {
  // console.log("post!!! " + JSON.stringify(postData));
  return fetcher(`/community/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
}

export async function uploadFiles(file: any) {
  return fetcher(`/community/uploadFile`, {
    method: "POST",
    body: file,
  });
}

export async function fetchSectionPosts(section: string) {
  return fetcher(`/community?section=${section}`);
}

export async function fetchBoardPostById(id: number) {
  return fetcher(`/community/one?id=${id}`);
}
