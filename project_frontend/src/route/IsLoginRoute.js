import React from 'react';
 import { Navigate } from 'react-router-dom';

 // 로그인이 되어 있는 경우에만 자식 컴포넌트를 리턴해줌
 function IsLoginRoute({ account, component: Component }) {
   return (
    // index.js의 StrictMode때문에 두 번 알림나옴
     !!account ? Component : <Navigate to='/login' {...alert("IsLoginRoute: 로그인 먼저 해주세요.")} />
   )
 }

 export default IsLoginRoute;