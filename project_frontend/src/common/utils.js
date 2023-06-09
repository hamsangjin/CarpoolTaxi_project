const validate = (value, formType) => {
  let isValidate = true;
  const userIdNumberRes = /[0-9]/;
  const birthDateRes = /[0-9]{8}$/;
  const passwordRes = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
  const nameRes = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,}$/;
  const emailRes = /^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/;
  const phoneNumRes = /^(\d{11}|\d{3}-\d{4}-\d{4})$/;
  const errorMessage = {
    userId: "아이디는 학번으로 설정해주세요.",
    password: "비밀번호는 숫자와 영문자를 포함한 6~12자리입니다.",
    name: "이름은 한글로 된 2글자 이상입니다.",
    email: "이메일 형식이 아닙니다. 다시 입력해주세요.",
    birthDate: "숫자와 8자리로 된 형식을 지켜주세요.",
    phoneNum: "하이픈(-) 제외하고 입력해주세요.",
  };
  // 위에서 회원가입 입력창들마다 정규표현식 사용해서 문자,숫자,자릿수를 제한.

  const validationResult = {};

  if (formType === "userId") {
    if (!userIdNumberRes.test(value)) {
      isValidate = false;
    }
  }
  if (formType === "password") {
    if (!passwordRes.test(value)) {
      isValidate = false;
    }
  }
  if (formType === "name") {
    if (!nameRes.test(value)) {
      isValidate = false;
    }
  }
  if (formType === "birthDate") {
    if (!birthDateRes.test(value)) {
      isValidate = false;
    }
  }
  if (formType === "email") {
    if (!emailRes.test(value)) {
      isValidate = false;
    }
  }
  if (formType === "phoneNum") {
    if (!phoneNumRes.test(value)) {
      isValidate = false;
    }
  }
  if (formType === "major") {
    isValidate = true;
  }

  if (!isValidate) {
    validationResult[formType] = errorMessage[formType];
  } else {
    validationResult[formType] = "";
  }
  return validationResult;
};

export { validate };
