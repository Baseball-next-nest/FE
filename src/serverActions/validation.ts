export async function signup(formdata: FormData) {
  /*
   닉네임 변수
  */
  const name = formdata.get("displayName");

  /*
   이메일 변수
  */
  const email = formdata.get("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /*
   비번 변수
  */
  const password = formdata.get("password");

  let errors = {};

  if (!emailRegex.test(email)) {
    errors.email = "이메일 형식이 올바르지 않습니다.";
  }
}
