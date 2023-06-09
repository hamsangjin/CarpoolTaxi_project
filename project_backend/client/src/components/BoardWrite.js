import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Main from './Main';
import axios from 'axios';

const BoardWrite = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")

    const [startProvince, setStartProvince] = useState("")
    const [startCity, setStartCity] = useState("")
    const [startDetail, setStartDetail] = useState("")

    const [arrivalProvince, setArrivalProvince] = useState("")
    const [arrivalCity, setArrivalCity] = useState("")
    const [arrivalDetail, setArrivalDetail] = useState("")

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    const [driver, setDriver] = useState("")
    const [maxPassenger, setMaxPassenger] = useState("")
    const [car, setCar] = useState("")
    const [content, setContent] = useState("")
    // const [writer, setWriter]= useState("")



    // 제목
    function handleTitle(e){
        e.preventDefault();
        setTitle(e.target.value)
    }

    // 출발지
    function handleStartProvince(e){
        e.preventDefault();
        setStartProvince(e.target.value)
    }
    function handleStartCity(e){
        e.preventDefault();
        setStartCity(e.target.value)
    }
    function handleStartDetail(e){
        e.preventDefault();
        setStartDetail(e.target.value)
    }

    // 도착지
    function handleArrivalProvince(e){
        e.preventDefault();
        setArrivalProvince(e.target.value)
    }
    function handleArrivalCity(e){
        e.preventDefault();
        setArrivalCity(e.target.value)
    }
    function handleArrivalDetail(e){
        e.preventDefault();
        setArrivalDetail(e.target.value)
    }


    // 시간 설정
    function handleDate(e){
        e.preventDefault();
        setDate(e.target.value)
    }
    function handleTime(e){
        e.preventDefault();
        setTime(e.target.value)
    }

    // 운전자/동승자
    function handleDriver(e){
        e.preventDefault();
        setDriver(e.target.value)
    }

    // 최대 동승인원
    function handleMaxPassenger(e){
        e.preventDefault();
        setMaxPassenger(e.target.value)
    }

    // 차종
    function handleCar(e){
        e.preventDefault();
        setCar(e.target.value)
    }

    // 내용
    function handleContent(e){
        e.preventDefault();
        setContent(e.target.value)
    }

    // 메인으로 이동
    function mainGo(e) {
        e.preventDefault();
        history.push({
            pathname: '/'
        })
    }
    // 게시물 작성
    function writeboard(e){
        e.preventDefault();
        // setWriter(sessionStorage.getItem('user_id'))
        const userData = {
            title: title,
            writer: sessionStorage.getItem('user_id'),

            startProvince: startProvince,
            startCity: startCity,
            startDetail: startDetail,

            arrivalProvince: arrivalProvince,
            arrivalCity: arrivalCity,
            arrivalDetail: arrivalDetail,

            date: date,
            time: time,

            driver: driver,
            maxPassenger: maxPassenger,
            car: car,
            content: content,
        }
        axios.post("http://localhost:5000/api/board", userData)
            .then((res)=> {
                if(res.status===200){
                    alert("생성이 완료되었습니다.")
                    history.push('/')
                }
                else{
                    alert("생성이 실패하였습니다.")
                }
            })

    }
    return (
        <div>
            <Main></Main>
            <div className='Board'>
                <h1>게시글 작성 {' '}<Button onClick={mainGo}>작성 취소</Button></h1>
                <h4>제목</h4><input type="text" name="title" value={title} onChange={handleTitle}></input><br /><br />
                <h4>출발지</h4>
                <input type="text" name="startProvince" value={startProvince} onChange={handleStartProvince}></input>
                <input type="text" name="startCity" value={startCity} onChange={handleStartCity}></input>
                <input type="text" name="startDetail" value={startDetail} onChange={handleStartDetail}></input><br /><br />

                <h4>목적지</h4>
                <input type="text" name="arrivalProvince" value={arrivalProvince} onChange={handleArrivalProvince}></input>
                <input type="text" name="arrivalCity" value={arrivalCity} onChange={handleArrivalCity}></input>
                <input type="text" name="arrivalDetail" value={arrivalDetail} onChange={handleArrivalDetail}></input><br /><br />

                <h4>탑승 일정</h4>
                <input type="text" name="date" value={date} onChange={handleDate}></input>
                <input type="text" name="time" value={time} onChange={handleTime}></input><br /><br />

                <h4>운전자/동승자</h4><input type="text" name="driver" value={driver} onChange={handleDriver}></input><br /><br />
                <h4>최대 동승 인원</h4><input type="text" name="maxPassenger" value={maxPassenger} onChange={handleMaxPassenger}></input><br /><br />
                <h4>차종</h4><input type="text" name="car" value={car} onChange={handleCar}></input><br /><br />

                <br/><h4>내용</h4><textarea name = "content" value={content} onChange={handleContent}></textarea>
                <Button onClick={writeboard}>작성</Button>
            </div>
        </div>
    )
};

export default BoardWrite;
