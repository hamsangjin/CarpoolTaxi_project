import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import ForgetPw from "./pages/ForgetPw";
import Taxi from "./pages/Taxi";
import Carpool from "./pages/Carpool";
import MyInfo from "./pages/MyInfo";
import CarpoolInfo from "./pages/CarpoolInfo";
import CarpoolPost from "./pages/CarpoolPost";
import CarpoolUpdate from "./pages/CarpoolUpdate";
import TaxiPost from './pages/TaxiPost';
import TaxiInfo from './pages/TaxiInfo';
import TaxiUpdate from "./pages/TaxiUpdate";
import { BoardProvider } from "./store/boardStore";
import { BoardProviderTaxi } from "./store/boardStoreTaxi";
/*import NonMemberRoute from "./route/NonMemberRoute";
import IsLoginRoute from "./route/IsLoginRoute";*/

function App() {
  // localStorage에 있는 계정(id)를 불러옴
  const account = localStorage.getItem('idx');
  console.log(account);

  return (
    <BrowserRouter>
      <BoardProvider>
      <BoardProviderTaxi>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPw" element={<ForgetPw />} />
        <Route path="/carPool" element={<Carpool />} />
        <Route path="/carpool/post" element={<CarpoolPost />} />
        <Route path="/carpool/update" element={<CarpoolUpdate />} />
        <Route path="/taxi" element={<Taxi />} />
        <Route path="/taxi/post" element={<TaxiPost/>} />
        <Route path="/taxi/update" element={<TaxiUpdate />} />
        <Route path="/myInfo" element={<MyInfo />} />
        <Route path="/carpool/:id" element={<CarpoolInfo />} />
        <Route path="/taxi/:id" element={<TaxiInfo />} />
      </Routes>
      </BoardProviderTaxi>
      </BoardProvider>
    </BrowserRouter>
  );
}
// 접근제한 일단 제외.
// react-router-dom @6 이상이라 기존의 Switch에서 Route로 변경됨.
export default App;