import styled from "styled-components";

function InputInfo({ placeholder = "", title, handleChange, rows, defaultValue="" }) {
  return (
    <InputWrapper>
      <Title>{title}</Title>
      <Input defaultValue={defaultValue }rows={rows} placeholder={placeholder} onChange={handleChange} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.p`
  color: white;
  margin-bottom: 0px;
`;
const Input = styled.textarea`
  width: 100%;
  height: auto;

  padding: 0px;
  outline: 0;
  /* border: 1px #d7d7d7 solid; */
  /* border-radius: 4px; */
  box-sizing: border-box;
  color: black;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.01em;
`;

export default InputInfo;
