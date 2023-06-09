import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const Main = props => {

    const [loginOk, setLoginOk] = useState("로그인");
    const [state, setState] = useState("off")
    const [isLogin, setIsLogin] = useState(false)
    const history = useHistory();

    useEffect(() => {
        if(sessionStorage.getItem('user_id')===null){
            console.log('isLogin ?? ::', isLogin)
            setState("비로그인")
        }
        else {
            setLoginOk("로그아웃")
            setIsLogin(true)
            setState(`${sessionStorage.getItem('user_id')}님 안녕하세요`)
        }


    }, [])

    function change(e) {
        e.preventDefault();
        if (sessionStorage.getItem('user_id')===null) {

            history.push('/login')

        } else {
            alert("로그아웃 하셨습니다")
            sessionStorage.removeItem('user_id')
            history.push("/login")
        }
    }
    function boardWrite(e){
        e.preventDefault();
        if(sessionStorage.getItem('user_id')===null){
            alert("로그인 후 이용가능합니다.")
        }
        else{
            history.push({
                pathname: '/boardWrite',
            })
        }
    }
    function boardRead(e){
        e.preventDefault();
        history.push("/boardRead")
    }
    return (
        <div>
            <div className='header'>
                <p>{state}{"  "}<Button onClick={change}>{loginOk}</Button></p>
            </div>
            <div className='mainPage'>
                <h1>메인페이지 입니다</h1>
                <Button onClick={boardWrite}>게시글 작성</Button>{"  "}
                <Button onClick={boardRead}>게시글 조회</Button>
            </div>
        </div>
    )
};

export default Main;
