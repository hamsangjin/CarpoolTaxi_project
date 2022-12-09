import styled from "styled-components";
import { Link } from "react-router-dom";

// 상단 탭메뉴 구현을 위한 NavBar 사용
export default function NavBar() {
  const menuList = [
    { title: "메인", src: "/" },
    { title: "카풀", src: "/CarPool" },
    { title: "택시", src: "/Taxi" },
    { title: "내정보", src: "/myInfo" },
  ];
  return (
    <NavBarContainer>
      {menuList.map((menu) => {
        return <NavButton key={menu.title} to={menu.src}>{menu.title}</NavButton>;
      })}
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  height: 70px;
  background-color: rgb(45, 45, 146);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavButton = styled(Link)`
  cursor: pointer;
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
`;
