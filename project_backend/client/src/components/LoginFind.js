import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const LoginFind = () => {

    const [mailFind1, setMailFind1] = useState("")
    const [mailFind2, setMailFind2] = useState("")
    const [userIdFind, setuserIdFind] = useState("")

    function handleMail1(e){
        e.preventDefault();
        setMailFind1(e.target.value);
    }
    function handleMail2(e){
        e.preventDefault();
        setMailFind2(e.target.value);
    }
    function handleuserId(e){
        e.preventDefault();
        setuserIdFind(e.target.value);
    }
    function checkemail(e){
        e.preventDefault();
        fetch("http://localhost:5000/api/login")
        .then((res)=>(res.json()))
        .then((data)=> {
            for(var i=0; i < data.length; i++){
                if(mailFind1 === data[i].email){
                    alert(`당신의 아이디는 :  ${data[i].userId}입니다.`)
                    break;
                }
                else{
                    if(i===data.length-1){
                        alert("존재하는 아이디가 없습니다.")
                    }
                }
            }
        })
    }
    function checkpassword(e){
        e.preventDefault();
        fetch("http://localhost:5000/api/login")
        .then((res)=>(res.json()))
        .then((data)=> {
            for(var i=0; i < data.length; i++){
                if(userIdFind===data[i].userId){
                    if(mailFind2 === data[i].email){
                        alert(`비밀번호는 ${data[i].password}입니다.`)
                        break;
                    }
                }
            }
        })
    }
    




    return (
        <div className='loginMain'>
            <h1>아이디/비밀번호 찾기</h1>
            <h3>아이디 찾기</h3>
            이메일: <input type="text" name='mailFind1' value={mailFind1} onChange={handleMail1} ></input>{"  "}
            <Button onClick={checkemail}>찾기</Button>
            <h3>비밀번호 찾기</h3>
            아이디: <input type='text' name='userIdFind' value={userIdFind} onChange={handleuserId}></input><br/>
            이메일: <input type='text' name='mailFind2' value={mailFind2} onChange={handleMail2}></input>{"  "}
            <Button onClick={checkpassword}>찾기</Button>
            <br/><br/><br/>
            <Link to ='/login'>
            <Button>돌아가기</Button>
            </Link>         
        </div>);
};

export default LoginFind;
