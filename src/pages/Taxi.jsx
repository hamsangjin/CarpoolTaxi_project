import React, { useEffect, useState } from "react";
import TaxiThumbnail from "../components/TaxiThumbnail";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NavBar from "../components/navBar/navBar";
import SearchBarTaxi from "../components/SearchBarTaxi";
import { useBoardDataTaxi } from "../store/boardStoreTaxi";

function Taxi(){
  const [toSearch, setToSearch] = useState([]);
  const [url, setUrl] = useState("http://localhost:3000/taxi");
  const { selectedOption, boards, setBoards } = useBoardDataTaxi();
  const [currentBoards, setCurrentBoards] = useState(boards);
  const [passengerList, setPassengerList] = useState([]);

  //Search 컴포넌트로 넘겨줄 콜백함수?
  const getURL = (loadUrl) => {
    setUrl(loadUrl);
  };
  const onClickSearch = () => {
    const filteredBoard = boards.filter(
      (boardInfo) =>
        boardInfo.startProvince === selectedOption.district && boardInfo.startCity === selectedOption.region
        );
        console.log("검색",selectedOption.district, "시:", selectedOption.region);
    setCurrentBoards(filteredBoard);
  };
  const onClickLogo = () => {
    setCurrentBoards(boards);
  };
 
  useEffect(() => {
    fetch("http://localhost:5000/api/taxiboard")
    // fetch("http://localhost:3001/taxiboard")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentBoards(data);
        setBoards(data);
      });
  // }, [currentBoards, boards]);

    // 게시글 동승자 목록 받아오기
    // fetch('http://localhost:3001/taxipassenger')
    fetch('http://localhost:5000/api/taxipassenger')
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        setPassengerList(data);
        console.log("ghk",data.map(a=>a.userId));
    })

  }, []);

  //검색 주소를 콘솔에 출력
  // console.log(toSearch);

  return (
    <CarpoolWrapper>
      <NavBar />
      <MainTitle onClick={onClickLogo}>택시 게시판</MainTitle>
      <InnerNavBarWrapper>
        <SearchBarTaxi />
        <SearchIcon onClick={onClickSearch} src="./assets/images/searchIcon.png" />
        <StyledLink to="/taxi/post">글쓰기</StyledLink>
      </InnerNavBarWrapper>
      <BoardWrapper>
        {currentBoards.map((board) => (
          <TaxiThumbnail key={board.id} boardInfo={board} 
          passengerList={passengerList.filter(i =>{
            return i.boardId == board.id;
          })}
          />
        ))}
      </BoardWrapper>
    </CarpoolWrapper>
  );
}
const SearchIcon = styled.img`
  width: 20px;
  background-color: white;
`;
const BoardWrapper = styled.ul`
  list-style: none;
  padding-left: 0px;
  height: 67vh; 
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 92vw; 
  margin: 10px auto;
  overflow: scroll;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  background-color: orange;
  padding: 0px 7px;
  border-radius: 3px;
`;

const InnerNavBarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
`;
const MainTitle = styled.p`
  font-size: 23px;
  color: white;
  font-weight: 900;
  margin-left: 7px;
`;

const CarpoolWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(54, 58, 179);
`;

export default Taxi;