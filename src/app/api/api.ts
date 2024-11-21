export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://43.201.105.90:3000";

async function fetcher(url: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "'GET, POST, PUT, DELETE'",
      // "Access-Control-Allow-Headers": "Content-Type, Authorization",
      ...options?.headers,
    },
    cache: "no-store",
    // mode: "cors",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
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
  console.log(name);
  return fetcher(`/player/search?name=${name}`);
}
