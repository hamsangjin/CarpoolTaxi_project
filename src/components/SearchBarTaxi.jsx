import styled from "styled-components";
import { districts, regions } from "../mocks/placeName";
import { useBoardDataTaxi } from "../store/boardStoreTaxi";

export default function SearchBar() {
  const { selectedOption, setSelectedOption } = useBoardDataTaxi();
  const onClickOption = (e) => {
    if (e.target.name === "districts") {
      setSelectedOption((prev) => {
        return { ...prev, district: e.target.value };
      });
    } else if (e.target.name === "regions") {
      setSelectedOption((prev) => {
        return { ...prev, region: e.target.value };
      });
    }
  };
  return (
    <StyledForm>
      <StyledLabel>현재위치:</StyledLabel>
      <select name="districts" onChange={onClickOption}>
        <option value="" disabled selected>
          도 선택
        </option>
        {districts.map((district) => {
          return <option value={district}>{district}</option>;
        })}
      </select>
      {/* <StyledLabel>도착지:</StyledLabel> */}
      <select name="regions" onClick={onClickOption}>
        <option value="" disabled selected>
          시 선택
        </option>
        {regions[selectedOption.district].map((region) => {
          return <option value={region}>{region}</option>;
        })}
      </select>
    </StyledForm>
  );
}

const StyledLabel = styled.label`
  color: white;
  margin-right: 3px;
  font-size: 13px;
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;
