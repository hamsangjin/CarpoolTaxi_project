import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../components/navBar/navBar';

export default function Main() {
  const navigate = useNavigate();
  function onClickBtn(e, btnTitle) {
    navigate(`/${btnTitle}`);
  }
  // 로컬스토리지 키 값을 currentUserId 대신 user로 변경.
  // useEffect(() => {
  //   // 로컬스토리지
  //   const currentUserId = window.localStorage.getItem("currentUserId");

  //   if (!currentUserId) {
  //     navigate("/login");
  //   }
  // }, []);
  useEffect(() => {
    const rawData = localStorage.getItem('currentUserId');
    const user = JSON.parse(rawData);

    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const onLogout = () => {
    localStorage.removeItem('currentUserId');
    navigate('/login');
  };

  return (
    <MainContainer>
      <NavBar />
      <BodyContainer>
        <MainTitle>교통 통합 시스템</MainTitle>
        <ButtonContainer>
          <ImgText>CARPOOL</ImgText>
          <ImgText>TAXI</ImgText>
          <CarPoolBtn onClick={(e) => onClickBtn(e, 'carPool')} />
          <TaxiBtn onClick={(e) => onClickBtn(e, 'taxi')} />
          <MyInfoBtn onClick={onLogout} />
        </ButtonContainer>
      </BodyContainer>
    </MainContainer>
  );
}
const MyInfoBtn = styled.button`
  margin-top: 10px;
  background-size: 320px;
  width: 310px;
  background-image: url('./assets/logout.png');
  height: 70px;
`;
const ImgText = styled.p`
  width: 150px;
  color: white;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 3px;
`;
const CarPoolBtn = styled.button`
  background-image: url('./assets/carPoolLogo.png');
  width: 149px;
  height: 138px;
`;
const TaxiBtn = styled.button`
  background-image: url('./assets/TaxiLogo.png');
  width: 149px;
  height: 138px;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(54, 58, 179);
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 26px;
`;
const MainTitle = styled.p`
  font-size: 23px;
  color: white;
  font-weight: 900;
`;
