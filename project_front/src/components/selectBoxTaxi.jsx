import { districts, regions } from "../mocks/placeName";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useBoardDataTaxi } from "../store/boardStoreTaxi";

export default function SelectBox({ type }) {
  const { selectedOption, setSelectedOption } = useBoardDataTaxi();
  const [onClickHandler, setOnClickHandler] = useState();
  const [name, setName] = useState({ district: "", region: "" });
  const [currentDist, setCurrentDist] = useState("경기도");

  useEffect(() => {
    if (type === "search") {
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
      setName((prev) => {
        return { ...prev, district: "districts", region: "regions" };
      });
      setOnClickHandler(() => onClickOption);
    } else if (type === "departure") {
      const onClickOption = (e) => {
        if (e?.target.name === "departureDst") {
          setSelectedOption((prev) => {
            return { ...prev, district: e.target.value, departureDst: e.target.value };
          });
          setCurrentDist(e.target.value);
        } else if (e?.target.name === "departureRegion") {
          setSelectedOption((prev) => {
            return { ...prev, region: e.target.value, departureRegion: e.target.value };
          });
        }
      };
      setName((prev) => {
        return { ...prev, district: "departureDst", region: "departureRegion" };
      });
      setOnClickHandler(() => onClickOption);
    } else if (type === "arrivals") {
      const onClickOption = (e) => {
        if (e.target.name === "arrivalsDst") {
          setSelectedOption((prev) => {
            return { ...prev, arrivalsDst: e.target.value };
          });
          setCurrentDist(e.target.value);
        } else if (e.target.name === "arrivalsRegion") {
          setSelectedOption((prev) => {
            return { ...prev, arrivalsRegion: e.target.value };
          });
        }
      };
      setName((prev) => {
        return { ...prev, district: "arrivalsDst", region: "arrivalsRegion" };
      });
      setOnClickHandler(() => onClickOption);
 
    }
  }, [selectedOption]);
  return (
    <SelectWrapper>
      <StyledForm>
        <select name={name.district} onChange={onClickHandler}>
          <option value="" disabled selected>
            도 선택
          </option>
          {districts.map((district) => {
            return <option value={district}>{district}</option>;
          })}
        </select>

        <select name={name.region} onClick={onClickHandler}>
          <option value="" disabled selected>
            시 선택
          </option>
          {regions[currentDist].map((region) => {
            return <option value={region}>{region}</option>;
          })}
        </select>
      </StyledForm>
    </SelectWrapper>
  );
}
const SelectWrapper = styled.div`
  width: 54%;
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;

  justify-content: space-between;
`;
