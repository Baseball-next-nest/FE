import useLoadingStore from "@/entities/LoadingStore";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://13.209.70.240:3000";

async function fetcher(
  url: string,
  options?: RequestInit & { disableLoading?: boolean }
) {
  const {
    headers: customHeaders,
    disableLoading,
    ...restOptions
  } = options || {};
  const { isLoading, setLoading } = useLoadingStore.getState();

  const isJSON = customHeaders?.["Content-Type"] === "application/json";
  if (!disableLoading) {
    setLoading(true);
  }

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
    if (!disableLoading) {
      setLoading(false);
    }

    return await res.json();
  } catch (error) {
    throw error;
  } finally {
    if (!disableLoading) {
      setLoading(false);
    }
  }
}

export async function getHitter() {
  return fetcher(`/player/hitter`);
}
export async function getPitcher() {
  return fetcher(`/player/pitcher`);
}

export async function getPlayerIdData(id: string) {
  return fetcher(`/player/detail?id=${id}`, { disableLoading: true });
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
export async function fetchSectionPosts(id?: number, page: number = 1) {
  const url = id
    ? `/community?userId=${id}&page=${page}`
    : `/community?page=${page}`;
  return fetcher(url);
}

export async function fetchBoardPostById(id: number, userId?: number) {
  const url = id
    ? `/community/one?id=${id}&userId=${userId}`
    : `/community?id=${id}`;
  return fetcher(url);
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
export async function updateVote(like: any) {
  return fetcher(`/community/updown`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
    disableLoading: true,
  });
}
export async function createComments(data: any) {
  return fetcher(`/community/createComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    disableLoading: false,
  });
}
export async function editComments(data: any) {
  return fetcher(`/community/modifyComment`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    disableLoading: false,
  });
}
export async function deleteComments(id: number) {
  return fetcher(`/community/deleteComment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId: id }),
    disableLoading: false,
  });
}
export async function updateCommentVote(like: any) {
  return fetcher(`/community/updownComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
    disableLoading: true,
  });
}
export async function fetchSortedComments(
  sort: any,
  postId: number,
  userId: number
) {
  return fetcher(
    `/community/sortComment?method=${sort}&postId=${postId}&userId=${userId}`
  );
}
