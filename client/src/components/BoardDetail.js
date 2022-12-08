import React, { useEffect, useState } from 'react';
import { Button} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Passenger from './Passenger';
import { Table } from 'react-bootstrap';

const BoardDetail = () => {
    const history = useHistory()
    const location = useLocation();
    // const [passenger, setPassenger] = useState("")
    const [passengers, setPassengers] = useState("")

    useEffect(()=>{
        fetch(`http://localhost:5000/api/passenger/${location.state.props.boarduserId}`)
        .then(res=>res.json())
        .then(data=> {
            setPassengers(data)
        })
    },[])
    
    // function handlePassenger(e){
    //     e.preventDefault();
    //     setPassenger(e.target.value)
    // }
    function sendPassenger(e){
        e.preventDefault();
        if(sessionStorage.getItem('user_id')===null){
            alert("로그인 후 이용가능합니다.")
        }
        else{
            const userData = {
                // 안되면 삭제
                // boardId: location.state.props.boardId,
                title: location.state.props.title,
                userId: sessionStorage.getItem("user_id"),
                name: location.state.props.name,
                phoneNum: location.state.props.phoneNum,
                major: location.state.props.major,
                sex: location.state.props.sex
            }
            axios.post("http://localhost:5000/api/boardPassenger", userData)
            .then((res)=>{
                if(res.status ===200){
                    alert("동승 신청완료")
                    window.location.reload()
                    
                }
            })
            
            
        }
    }
    function deleteBoard(e) {
        e.preventDefault();
        
        if (sessionStorage.getItem('user_id') === location.state.props.writer) {
            const url = `http://localhost:5000/api/board/user/${location.state.props.boardId}`
            fetch(url, {
                method: 'DELETE'
            })
            alert('삭제 완료')
            history.push('/boardRead')
            console.log("삭제")
        } else {
            alert('자신의 글만 삭제가능합니다.')
        }
    }
    return (
        <div>
            <h1>게시글 상세 페이지</h1>

            <h2>제목</h2>
            <input type='text' value={location.state.props.title} readOnly></input>
            <input type='text' value={location.state.props.createDay} readOnly></input>
            <p></p>

            <h2>작성자</h2>
            <input type='text' value={location.state.props.writer} readOnly></input>
            <p></p> 

            <h2>출발지</h2>
            <input type='text' value={location.state.props.startProvince} readOnly></input>
            <input type='text' value={location.state.props.startCity} readOnly></input>
            <input type='text' value={location.state.props.startDetail} readOnly></input>
            <p></p>

            <h2>목적지</h2>
            <input type='text' value={location.state.props.arrivalProvince} readOnly></input>
            <input type='text' value={location.state.props.arrivalCity} readOnly></input>
            <input type='text' value={location.state.props.arrivalDetail} readOnly></input>
            <p></p>

            <h2>탑승 일정</h2>
            <input type='text' value={location.state.props.date} readOnly></input>
            <input type='text' value={location.state.props.time} readOnly></input>
            <p></p>

            <h2>운전자/동승자</h2>
            <input type='text' value={location.state.props.driver} readOnly></input>
            <h2>최대 동승 인원</h2>
            <input type='text' value={location.state.props.maxPassenger} readOnly></input>
            <h2>차종</h2>
            <input type='text' value={location.state.props.car} readOnly></input>
            <p></p>

            <h2>내용</h2>
            <input type='text' value={location.state.props.content} readOnly></input>
            <br /><br />
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>게시물 번호</th>
                        <th>이름</th>
                        <th>학번</th>
                        <th>학과</th>
                        <th>성별</th>
                        <th>전화번호</th>
                    </tr>
                </thead>
                <tbody>
                    {passengers ? passengers.map(c=>{
                        return (<Passenger
                        key = {c.id}
                        id = {c.id}
                        // 안 되면 삭제
                        // boardId = {c.boardId}
                        title = {c.title}
                        userId = {c.userId}
                        major = {c.major}
                        name = {c.name}
                        sex = {c.sex}
                        phoneNum = {c.phoneNum}
                        ></Passenger>)
                    }): 
                    <tr>
                        <td>
                            동승자 없음
                        </td>    
                    </tr>}
                </tbody>
            </Table>
            
            <h2>동승자 신청</h2>
            <Button onClick={sendPassenger}>신청</Button><br></br><br></br> 

            <Link to='/boardRead'>
                <Button>뒤로가기</Button>{'  '}
            </Link>
            <p>
                <br /><Button onClick={deleteBoard}>삭제</Button>
            </p>


        </div>
    );
};

export default BoardDetail;