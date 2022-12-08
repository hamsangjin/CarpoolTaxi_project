import React, { useState } from 'react';
import { useEffect } from 'react';
const Passenger = (props) => {
    console.log('passenger:', props.passenger);
    return (
        <tr>
            <td>{props.boardId}</td>
            <td>{props.name}</td>
            <td>{props.userId}</td>
            <td>{props.major}</td>
            <td>{props.sex}</td>
            <td>{props.phoneNum}</td>
        </tr>
    );
};
export default Passenger;
