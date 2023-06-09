import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

function Search(props){

    const [data, setData] = useState([]);
    const getURL = props.parentFunction;
    const [URL, setURL] = useState('http://localhost:3001/board');

    useEffect(()=>{
        // 전체 게시글 정보를 검색 컴포넌트로 넘기기 위해
        // select 문을 변결할 때마다 검색 select에 나오는 옵션을 알맞게 변경시켜주기 위해선 이부분 수정이 필요함
        fetch(URL) 
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            setData(data);
        })
    },[URL])

    var startProvince  = new Set();
    var arrivalProvince = new Set();
    var startCity = new Set();
    var arrivalCity = new Set();

    data.forEach((keyword) =>{
        arrivalProvince.add(keyword.arrivalProvince);
        startProvince.add(keyword.startProvince);
        arrivalCity.add(keyword.arrivalCity);
        startCity.add(keyword.startCity);
    })

    const setAP = [...(arrivalProvince)];
    const setAC = [...(arrivalCity)];
    const setSP = [...(startProvince)];
    const setSC = [...(startCity)];

    const spRef = useRef(null);
    const scRef = useRef(null);
    const apRef = useRef(null);
    const acRef = useRef(null);

    
    function onSubmit(e){
        e.preventDefault();
        var url = 'http://localhost:3001/board?';
        url += !spRef.current.value ? "": `startProvince=${spRef.current.value}&`;
        url += !scRef.current.value ? "": `startCity=${scRef.current.value}&`;
        url += !apRef.current.value ? "": `arrivalProvince=${apRef.current.value}&`;
        url += !acRef.current.value ? "": `arrivalCity=${acRef.current.value}&`;
        console.log(url);
        getURL(url);
    }

    const searchClear = (e) => {
        e.preventDefault();
        spRef.current.value="";
        scRef.current.value="";
        apRef.current.value="";
        acRef.current.value="";
        getURL('http://localhost:3001/board');
        setURL('http://localhost:3001/board');
    }

    const selectChange = (e) =>{
        // select가 변결될 때마다 옵션 항목을 변경하기 위해 여기에 뭘 작성해야 할걱타음
        e.preventDefault();
        var url = 'http://localhost:3001/board?';
        url += !spRef.current.value ? "": `startProvince=${spRef.current.value}&`;
        url += !scRef.current.value ? "": `startCity=${scRef.current.value}&`;
        url += !apRef.current.value ? "": `arrivalProvince=${apRef.current.value}&`;
        url += !acRef.current.value ? "": `arrivalCity=${acRef.current.value}&`;
        setURL(url);

    }

    return <>
    <SearchFormWrapper>
        <form onSubmit={onSubmit}>
            <span>출발지</span>
            <select ref={spRef} name="sp" onChange={selectChange}>
                <option value={""}>선택 안함</option>
                {setSP.map(sp => {
                    return <option key={sp} value={sp}>
                        {sp}
                    </option>
                })}
            </select>
            <select ref={scRef} name="sc" onClick={()=>console.log(1111)} onChange={selectChange}>
                <option value={""}>선택 안함</option>
                {setSC.map(sc => {
                    return <option key={sc} value={sc}>
                        {sc}
                    </option>
                })}
            </select>

            <br />

            <span>목적지</span>
            <select ref={apRef} name="ap" onChange={selectChange}>
                <option value={""}>선택 안함</option>
                {setAP.map(ap => {
                    return <option key={ap} value={ap}>
                        {ap}
                    </option>
                })}
            </select>
            <select ref={acRef} name='ac' onChange={selectChange}>
                <option value={""}>선택 안함</option>
                {setAC.map(ac => {
                    return <option key={ac} value={ac}>
                        {ac}
                    </option>
                })}
            </select>
            <button>검색</button>
        </form>
    </SearchFormWrapper>
        <ClearButton>
            <button onClick={searchClear}>검색 초기화</button>
        </ClearButton>
    </>
}

const ClearButton = styled.div`
    float: right;
`

const SearchFormWrapper = styled.div`
    float: left;
`

export default Search;