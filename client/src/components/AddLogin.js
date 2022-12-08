import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom'

const AddLogin = () => {
    const [adduserId, setAdduserId] = useState("")
    const [addpassword, setAddpassword] = useState("")
    const [addpwCh, setAddpwCh] = useState("")
    const [addName, setAddName] = useState("")
    const [addBirthDate, setAddBirthDate] = useState("")
    const [addEmail, setAddEmail] = useState("")
    const [addPhoneNum, setAddPhoneNum] = useState("")
    const [addMajor, setAddMajor] = useState("")
    const [addSex, setAddSex] = useState("")
    const [usableID, setUsableID] = useState(false)

    const history = useHistory();

    function handleAdduserId(e) {
        e.preventDefault();
        setAdduserId(e.target.value);
    };
    function handleAddpassword(e) {
        e.preventDefault();
        setAddpassword(e.target.value);
    }
    function handleAddpwCh(e) {
        e.preventDefault();
        setAddpwCh(e.target.value);
    }
    function handleAddName(e) {
        e.preventDefault();
        setAddName(e.target.value);
    }
    function handleAddBirthDate(e) {
        e.preventDefault();
        setAddBirthDate(e.target.value);
    }
    function handleAddEmail(e) {
        e.preventDefault();
        setAddEmail(e.target.value);
    }
    function handleAddPhoneNum(e) {
        e.preventDefault();
        setAddPhoneNum(e.target.value);
    }
    function handleAddMajor(e) {
        e.preventDefault();
        setAddMajor(e.target.value);
    }
    function handleAddSex(e) {
        e.preventDefault();
        setAddSex(e.target.value);
    }

    function userIdCheck(e) {
        
        e.preventDefault();
        fetch("http://localhost:5000/api/login/userId")
            .then((res) => (res.json()))
            .then((data) => {
                console.log(data)
                if(adduserId===""){
                    alert("아이디를 입력하세요")
                }else{
                console.log(data.length);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].userId === adduserId) {
                        console.log(adduserId, data[i].userId)
                        alert("존재하는 아이디입니다.")
                        setUsableID(false);
                        break;
                    }else{
                        if(i===data.length-1){
                            alert("사용가능한 아이디입니다.")
                            setUsableID(true);
                        }                 
                    }               
                }}           
            })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (usableID === true) {
            if (addpassword !== addpwCh) {
                return alert('비밀번호와 비밀번호 확인이 다릅니다.')
            } else {
                const userData = {
                    userId: adduserId,
                    password: addpassword,
                    name: addName,
                    birthDate: addBirthDate,
                    email: addEmail,
                    phoneNum: addPhoneNum,
                    major: addMajor,
                    sex: addSex
                };
                axios.post("http://localhost:5000/api/login", userData)
                    .then((res) => {
                        // 요청이 성공적으로 수행되었다면
                        if(res.status===200){
                            // 생성 완료 메시지와 로그인 창으로 이동
                            alert("생성이 완료되었습니다.")
                            history.push('/login')
                        }
                    })
            }
        } else if(usableID === false) {
            alert("아이디 중복체크하세요")
        }
    }



    return (
        <div className='loginMain'>
            <form onSubmit={handleFormSubmit}>
                <h1>회원 가입</h1>
                아이디: <input type='text' name='inputuserId' value={adduserId} onChange={handleAdduserId}></input>{"  "}
                <Button onClick={userIdCheck}>중복체크</Button><br />
                비밀번호: <input type="password" name='inputpassword' value={addpassword} onChange={handleAddpassword}></input><br />
                비밀번호 확인: <input type="password" name='inputpwCh' value={addpwCh} onChange={handleAddpwCh}></input><br />
                이름: <input type='name' name='inputName' value={addName} onChange={handleAddName}></input><br /><br />
                생년월일: <input type='BirthDate' name='inputBirthDate' value={addBirthDate} onChange={handleAddBirthDate}></input><br /><br />
                이메일: <input type='text' name='inputEmail' value={addEmail} onChange={handleAddEmail}></input><br /><br />
                전화번호: <input type='text' name='inputPhoneNum' value={addPhoneNum} onChange={handleAddPhoneNum}></input><br /><br />
                학과: <input type='text' name='inputMajor' value={addMajor} onChange={handleAddMajor}></input><br /><br />
                {/* 그 뭐냐 라디오버튼 ? 그걸로 바꿔야함 성별 입력타입 */}
                성별: <input type='text' name='inputSex' value={addSex} onChange={handleAddSex}></input><br /><br />
                <Button type='submit'>가입</Button> {'  '}
                <Link to='/login'>
                    <Button>돌아가기</Button>
                </Link>
            </form>

        </div>
    )
}

export default AddLogin