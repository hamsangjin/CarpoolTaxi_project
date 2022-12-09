import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import TaxiPassengerList from "../components/TaxiPassengerList";
import styled from "styled-components";
import NavBar from "../components/navBar/navBar";
// import { useBoardData } from "../store/boardStore";

function CarpoolInfo() {

  // 주소에서 파라미터 받아오기(게시글 id)
  const boardId = useParams().id;

  // 게시글 정보
  // info는 currentData로 대체됩니다.
  const [currentData, setCurrentData] = useState([]);
  // 동승자 목록
  const [passengerList, setPassengerList] = useState([]);
  // 게시글 작성자 회원 정보
  const [writerData, setWriterData] = useState({
    id: "init id",
    name: "init Name",
    sex: "init sec",
    phoneNum: "init phoneNum"
    });

  // 게시글 권한 정보(접속한 사람id)
  const userId = localStorage.getItem['currentUserId'];

  /* 개발할 때 PassengerList와 같은 userId인지 확인하면서 개발할 것 */
//   const userId = '2018250033'; // 임시 사용 // 게시글 작성자 역할
  // const userId = '2018250233'; // 임시 사용 // 외부인 역할 - 동승신청 클릭
//   const userId = '2022330044'; // 임시 사용 // 동승자 역할

  const nevigate = useNavigate();

  useEffect(()=>{        
      // 게시글 정보 받아오기
      // fetch(`http://localhost:3001/taxiboard?id=${boardId}`)
      fetch(`http://localhost:5000/api/taxiboard?id=${boardId}`)
      .then(res=>{
          return res.json();
      })
      .then(data=>{
          setCurrentData(data[0]);

          // 게시글 작성자 회원 정보 받아오기
          // fetch(`http://localhost:3001/account?id=${data[0].writer}`)
          fetch(`http://localhost:5000/api/login?id=${data[0].writer}`)
          .then(late=>{
            console.log("res:",late);
            return late.json();
          })
          .then(data=>{
            setWriterData(data[0]);
          })
      })

      // 게시글 동승자 목록 받아오기
      // fetch(`http://localhost:3001/taxipassenger?boardId=${boardId}`)
      fetch(`http://localhost:5000/api/taxipassenger?boardId=${boardId}`)
      .then(res=>{
          return res.json();
      })
      .then(data=>{
          setPassengerList(data);
          console.log(data.map(a=>a.userId));
      })

  },[boardId])

  
  // userCase 접속 id에 따라 다른 컴포넌트를 보여주기 위함
  // 1 은 작성자, 2: 댓글 작성자(동승 신청자), 3: 외부인(아직 게시글과 관련 없는 사람)
  let userCase;
  if(userId === currentData.writer){
      userCase = 1;
  // 동승자 리스트를 검사해서 현재 userId가 들어 있는지 검사
  }else if(passengerList.map(passenger=>passenger.userId).includes(userId)){
      userCase = 2;
  }else{
      userCase = 3;
  }
  
  // 동승 신청 버튼
  const addPassenger = (e)=>{
      e.preventDefault();

      // body에 들어갈 내용
      const info = {
          "id": boardId+userId, // 임시 기본키
    "boardId": boardId,
          "userId": userId
  }

      // fetch(`http://localhost:3001/taxipassenger`,{
      fetch(`http://localhost:5000/api/taxipassenger`,{
  method: 'POST',
  headers: {
    "Content-Type" : "application/json"
  },
  body: JSON.stringify(info)
}).then(res=>{
  if (res.ok){
    alert('동승 신청 완료')
          // passengerList에 방금 신청한 사람 추가, 
          // 추가한 사람 회원 정보를 PassengerList 컴포넌트에서 사용할 거라  
          // 추가한 사람 회원 정보가 미리 있어야 나중에 오류가 나지 않음
          setPassengerList(...passengerList, info) 
          window.location.reload();
  }
})
  }

  // 게시글에 달린 모든 동승자 삭제 후 게시글 삭제
  const delBoard = () =>{
    console.log(boardId);
      // 동승자 삭제
      passengerList.forEach(passenger=>{
          // fetch(`http://localhost:3001/taxipassenger/${boardId+passenger.userId}`, {method:"DELETE"})
          fetch(`http://localhost:5000/api/taxipassenger/${boardId+passenger.userId}`, {method:"DELETE"})
          .then(res=>{
              if(res.ok){
                  console.log("동승 신청 삭제 함");
                  // 게시글 삭제
                  // fetch(`http://localhost:3001/taxiboard/${boardId}`, {method:"DELETE"})
                  fetch(`http://localhost:5000/api/taxiboard/${boardId}`, {method:"DELETE"})
                  .then(res=>{
                      if(res.ok){
                          alert("게시글이 삭제되었습니다.")
                          window.location.replace("/taxi");
                      }
                  })
              }
          })
      })
  }

  const updateBoard = () =>{
    nevigate('/taxi/update', {state: {currentData}});
  }

  return (
    <CarpoolInfoWrapper>
      <NavBar />
      <ContentWrapper>
        {userCase === 1 ? 
          <ButtonWrapper>
            <BasicButton onClick={updateBoard}>수정</BasicButton>
            <BasicButton onClick={()=>{delBoard(boardId)}}>삭제</BasicButton> 
          </ButtonWrapper>:
          null
        }
        <StyledContent width={"100%"}>{currentData.title}</StyledContent>
        <LocateInfo>
          <BasicContent>{currentData.startProvince}</BasicContent>
          <BasicContent>{currentData.startCity}</BasicContent>
          <BasicContent>{currentData.startDetail}</BasicContent>
        </LocateInfo>
        <LocateInfo>
          <BasicContent>{currentData.arrivalProvince}</BasicContent>
          <BasicContent>{currentData.arrivalCity}</BasicContent>
          <BasicContent>{currentData.arrivalDetail}</BasicContent>
        </LocateInfo>
        <DepartureTime>{currentData.date}{"\n"}{currentData.time}</DepartureTime>
        <WriterInfo>
          {/* <div>
            <Img src={`/assets/images/${currentData.driver}.png`} />
            <StyledContent width={"100%"}>{currentData.car}</StyledContent>
          </div> */}
          <StyledContent width={"100%"}>
            {writerData.name}<br/>
            {writerData.sex}<br/>
            {writerData.phoneNum}<br/>
            {writerData.id}<br/>
            {writerData.major}<br/>
          </StyledContent>
        </WriterInfo>
        <StyledContent width={"100%"} height={"50px"}>
          {currentData.content}
        </StyledContent>
        {userCase === 3 ?
        <StyledButton width={"100%"} height={"30px"} onClick={addPassenger} disabled={
          passengerList.length < currentData.maxPassenger ? "" : "disable"
        }>
            동승하기
        </StyledButton> :
        null
        }
      </ContentWrapper>
      <Splitter />
      <PersonalInfo>
        {/* personalInfo는 passengerList로 대체되었습니다 */}
        {passengerList.map((info) => {
          return (
            <InfoContainer key={info.id}>
              <TaxiPassengerList passengerId={info.userId} userCase={userCase}/>
            </InfoContainer>
          );
        })}
      </PersonalInfo>
    </CarpoolInfoWrapper>
  );
}

export default CarpoolInfo;
const DepartureTime = styled.div`
background-color: white;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
height: 50px;
font-size: 25px;
`;
const InfoContainer = styled.div`
width: 80%;

background-color: white;
margin-top: 15px;
text-align: center;
`;
const PersonalInfo = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 23vh;
overflow: scroll;
`;
const Splitter = styled.div`
width: 83%;
height: 3px;
background-color: white;
margin: auto;
margin-top: 5px;
`;
const Img = styled.img`
width: 70px;
`;

const WriterInfo = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
`;

const LocateInfo = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`;

const ButtonWrapper = styled.div`
display: flex;
width: 30%;
justify-content: space-between;
`;

const BasicContent = styled.div`
background-color: white;
width: 30%;
text-align: center;
`;

const StyledContent = styled(BasicContent)`
width: ${(props) => props.width};
height: ${(props) => props.height};
`;
const BasicButton = styled.button`
background-color: orange;
color: white;
border: 0;
outline: 0;
text-decoration: none;
cursor: pointer;
`;
const StyledButton = styled(BasicButton)`
width: ${(props) => props.width};
height: ${(props) => props.height};
font-size: 16px;
`;
const ContentWrapper = styled.div`
margin: auto;
margin-top: 15px;
width: 80vw;
height: 55vh;
display: flex;
flex-direction: column;
align-items: flex-end;

justify-content: space-between;
`;
const CarpoolInfoWrapper = styled.div`
height: 100vh;
width: 100vw;
background-color: rgb(54, 58, 179);
`;
