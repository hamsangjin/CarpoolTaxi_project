import { createContext, useContext, useEffect, useReducer, useState } from "react";
import boardInfo from "../mocks/boardDataTaxi";
const BoardContext = createContext();

// 전역상태를 관리하는 context api, 각 컴포넌트끼리 상태를 공유하기 위해 사용.
// 게시글 작성 컴포넌트에서 생긴 변수를 게시글 열람 컴포넌트로 보내주기 위해 사용.
// 게시글 썸네일 불러오기나 동승하기 버튼 눌렀을 시 썸네일 탑승인원 수 카운팅.
// Provider과 Consumer 개념 사용
function countReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Custom Provider
function BoardProviderTaxi({ children }) {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });
  const [selectedOption, setSelectedOption] = useState({ district: "경기도", region: "" });
  const [boards, setBoards] = useState(boardInfo);
  const value = { boards, setBoards, state, dispatch, selectedOption, setSelectedOption };
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

// Custom Consumer
function useBoardDataTaxi() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

// 최상단 컴포넌트에서 Custom Provider를, 각 컴포넌트에서 이 Custom Consumer를 사용할 수 있다.
export { BoardProviderTaxi, useBoardDataTaxi };
