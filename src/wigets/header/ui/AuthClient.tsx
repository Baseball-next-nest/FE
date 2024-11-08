import { getSession } from "@/serverActions/auth";
import AuthSection from "./AuthSection";

export default async function AuthClient() {
  const session = await getSession();
  return <AuthSection session={session} />;
}
/* 
  useclient사용으로 인한 async 함수 사용 불가로 컴포넌트 분리
*/
