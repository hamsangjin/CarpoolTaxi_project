import { useState } from "react";
import styled from "styled-components";
import { validate } from "../../common/utils";

function SignUpInput({ data: { placeholder, name, type, title }, setErrors, setValues, values }) {
  const [error, setError] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "passwordCheck") {
      if (values.password !== value) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("");
        setErrors((prevState) => ({ ...prevState, passwordCheck: "" }));
      }
    } else {
      setValues((prevState) => ({ ...prevState, [name]: value }));
      const errorMessage = validate(value, name);  // util.js 에서 오류메시지 작성했던것을 export 해서 사용.
      setError(errorMessage[name]);
      setErrors((prevState) => ({ ...prevState, ...errorMessage }));
    }
  };

  return (
    <InputWrapper>
      <Title>{title}</Title>
      <Input type={type} placeholder={placeholder} name={name} onChange={handleChange} />
      <ErrorText>{error}</ErrorText>
    </InputWrapper>
  );
}
const Title = styled.div`
  color: white;
  text-align: left;
  margin-bottom: 3px;
`;
const InputWrapper = styled.div`
  margin-bottom: 2px;
`;

const Input = styled.input`
  width: 100%;
  height: 10px;
  padding: 12px;
  outline: 0;
  border: 1px #d7d7d7 solid;
  border-radius: 4px;
  box-sizing: border-box;
  color: #6a6a6a;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: -0.01em;
`;

const ErrorText = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.01em;
  color: #e50303;
  margin-top: 5px;
  margin-bottom: -3px;
  display: flex;
`;

export default SignUpInput;
