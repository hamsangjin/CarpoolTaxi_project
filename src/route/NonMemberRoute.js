import React from 'react';
 import { Navigate } from 'react-router-dom';

// 로그인이 안 되어 있는 경우에만 자식컴포넌트를 리턴해 줌 
 function NonMemberRoute({ account, component: Component }) {
   return (
    // index.js의 StrictMode때문에 두 번 알림나옴
     !account ? Component : <Navigate to='/' {...alert("NonMemberRoute: 접근할 수 없는 페이지입니다.")} />
   )
 }

 export default NonMemberRoute 