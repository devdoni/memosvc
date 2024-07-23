import React, { useState } from "react";
import { getAllUserMemoDB, getDateTime, getLoginedInSessionID, getMyMemo, setMyMemo } from "./js/utils";
import { useNavigate } from "react-router-dom";

const Memo = () => {
    // Hook 선언
    const [isMemo, setIsMemo] = useState(''); // 사용자 입력 메모 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    
    // 메모 입력 핸들러
    const writeChangeHandler = (e) => {
        console.log('[Memo] writeChangeHandler called()');
        const userMemo = e.target.value;
        setIsMemo(userMemo); // 사용자 입력 메모 상태 업데이트
    }

    // 메모 작성 버튼 클릭 핸들러
    const writeClickHandler = () => {
        // 로그인된 세션 ID와 현재 날짜 및 시간 가져오기
        const sessionId = getLoginedInSessionID();
        const DateTime = getDateTime();

        // 사용자 메모 가져오기
        let UserMemo = getMyMemo(sessionId);

        // 새로운 메모 추가
        UserMemo[DateTime] = {
            memo: isMemo,
            regDate: DateTime,
            modDate: DateTime
        }

        // 업데이트된 메모 저장
        setMyMemo(sessionId, UserMemo);

        // 작성 성공 메시지 표시 및 메모 목록 페이지로 이동
        alert('Write Success!');
        navigate('/memolist');
    }

    return(
        <div id="memo_write_wrap">
            <div className="memo_write_item">
                {/* 메모 입력 필드 */}
                <input className="input_box" type="text" placeholder="INPUT MEMO" onChange={writeChangeHandler}/>
                <br />
                {/* 메모 작성 버튼 */}
                <button className="basic_btn" onClick={writeClickHandler}>WRITE</button>
            </div>
        </div>
    )
}

export default Memo;