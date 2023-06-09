import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [inputuserId, setInputuserId] = useState("")
    const [inputpassword, setInputpassword] = useState("")
    const [useId, setUseId] = useState(false);
    const history = useHistory();
    function handleInputuserId(e) {
        e.preventDefault();
        setInputuserId(e.target.value);
    };
    function handleInputpassword(e) {
        e.preventDefault();
        setInputpassword(e.target.value);
    }
    function checkLogin(e) {
        e.preventDefault();
        fetch("http://localhost:5000/api/login")
            .then((res) => (res.json()))
            .then(data => {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    if (inputuserId === data[i].userId) {
                        if (inputpassword === data[i].password) {
                            setUseId(true)
                            console.log(useId)
                            alert("로그인 성공")
                            sessionStorage.setItem('user_id',inputuserId)
                            history.push({
                                pathname: '/',
                                state: {
                                    useid: !(useId),
                                    userId: inputuserId,
                                    password: inputpassword
                                }
                            })
                            break;
                        }
                        else{
                            alert('비밀번호가 올바르지 않습니다.')
                        } 
                    }
                    else {
                        if (i === data.length - 1) {
                            alert('ID가 올바르지 않습니다.')
                        }
                    }
                }
            })
    }
    return (
        <div className='loginMain'>
            <h1>로그인</h1>
            ID: <input type='text' name='inputuserId' value={inputuserId} onChange={handleInputuserId}></input><br />
            PW: <input type="password" name='inputpassword' value={inputpassword} onChange={handleInputpassword}></input><br /><br />
            <Button onClick={checkLogin}>확인</Button>{'  '}
            <Link to='/loginAdd'>
                <Button>회원가입</Button>
            </Link>
            {'   '}
            <Link to='/loginFind'>
                <Button>ID/PW찾기</Button>
            </Link>
            <br></br><br></br>
            <Link to="/">
                <Button>메인으로</Button>
            </Link>
        </div>
    )
}

export default Login
