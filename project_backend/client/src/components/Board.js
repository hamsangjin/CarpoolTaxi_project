import React from 'react';
import { useHistory } from 'react-router-dom';

const Board = (props) => {
    const history = useHistory();
    function selectTr(e) {
        e.preventDefault()
        history.push({
            pathname: '/boardDetail',
            state: {props: props}
        })
    }
    return (
        <tr onClick={selectTr}>
            {/* <td>{props.id}</td> */}
            <td>{props.boardId}</td>
            
            <td>{props.title}</td>
            <td>{props.writer}</td>
            
            <td>{props.startProvince}</td>
            <td>{props.startCity}</td>
            <td>{props.startDetail}</td>

            <td>{props.arrivalProvince}</td>
            <td>{props.arrivalCity}</td>
            <td>{props.arrivalDetail}</td>

            <td>{props.date}</td>
            <td>{props.time}</td>

            <td>{props.driver}</td>
            <td>{props.maxPassenger}</td>
            <td>{props.car}</td>
            <td>{props.content}</td>
        </tr>
    );
};

export default Board;



