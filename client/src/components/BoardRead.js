import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Table } from 'react-bootstrap'
import Board from './Board';




const BoardRead = () => {
    const [board, setBoard] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [myBoard, setMyBoard] = useState([])

    


    function boardRead(e) {
        e.preventDefault();
        fetch("http://localhost:5000/api/board")
            .then((res) => (res.json()))
            .then((data) => {
                setBoard(data)
                console.log(data);
            })
    }
    function myboardRead(e){
        e.preventDefault();
        fetch(`http://localhost:5000/api/board/user/${sessionStorage.getItem('user_id')}`)
        .then((res)=>(res.json()))
        .then(data=>{
            setBoard(data)
            console.log(data)
        })
    }


    return (
        <div>
            <h1>게시글 조회</h1>
            <Button onClick={boardRead}>전체 조회</Button> {'  '}
            <Button onClick={myboardRead}>내 글 조회</Button> {'  '}
            <Link to='/'>
                <Button>뒤로가기</Button>
            </Link>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {/* <th>#</th> */}
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        
                        <th>출발지(도)</th>
                        <th>출발지(시)</th>
                        <th>출발지(상세)</th>

                        <th>목적지(도)</th>
                        <th>목적지(시)</th>
                        <th>목적지(상세)</th>

                        <th>탑승 날짜</th>
                        <th>탑승 시간</th>

                        <th>운전자/동승자</th>
                        <th>최대 동승 인원</th>
                        <th>차종</th>
                        <th>내용</th>
                    </tr>
                </thead>
                <tbody>
                    {board ? board.map(c=>{
                        return (<Board
                        key={c.idBoard}
                        id={c.idBoard}

                        boardId={c.boardId}
                        title={c.title}
                        writer={c.writer}
                        createDay={c.createDay}

                        startProvince={c.startProvince}
                        startCity={c.startCity}
                        startDetail={c.startDetail}

                        arrivalProvince={c.arrivalProvince}
                        arrivalCity={c.arrivalCity}
                        arrivalDetail={c.arrivalDetail}

                        date={c.date}
                        time={c.time}

                        driver={c.driver}
                        maxPassenger={c.maxPassenger}
                        car={c.car}
                        
                        content={c.content}
                        ></Board>)
                    }): 
                    <tr>
                        <td>
                            게시글 없음
                        </td>    
                    </tr>}
                </tbody>
            </Table>
        </div>
    )
};

export default BoardRead;
