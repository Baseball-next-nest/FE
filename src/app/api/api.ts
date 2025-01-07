import useLoadingStore from "@/entities/LoadingStore";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://13.209.70.240:3000";

async function fetcher(url: string, options?: RequestInit) {
  const { headers: customHeaders, ...restOptions } = options || {};
  const { setLoading } = useLoadingStore.getState();

  const isJSON = customHeaders?.["Content-Type"] === "application/json";
  setLoading(true); // 로딩 시작
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      ...restOptions,
      headers: {
        ...(isJSON ? { "Content-Type": "application/json" } : {}),
        ...customHeaders,
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch data: ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    throw error;
  } finally {
    setLoading(false); // 로딩 종료
  }
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
  return fetcher(`/community/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // cache: "no-store",
    body: JSON.stringify(postData),
  });
}
export async function updatePost(postData: any) {
  return fetcher(`/community/modify`, {
    method: "PUT",
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
  return fetcher(`/community/one?id=${id}`, { next: { revalidate: 1 } });
}
export async function deleteCommunityPost(id: number) {
  return fetcher(`/community/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId: id }),
  });
}
