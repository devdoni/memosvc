import React, { useEffect, useState } from "react";
import { getDateTime, getLoginedInSessionID, getMyMemo, setMyMemo } from "./js/utils";


const MemoList = () => {
    // 상태 정의
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 열림/닫힘 상태
    const [isMyMemo, setIsMyMemo] = useState([]); // 사용자의 메모 목록 상태
    const [newMemo, setNewMemo] = useState(''); // 수정할 메모 내용 상태
    const [currentMemo, setCurrentMemo] = useState({}); // 현재 수정 중인 메모 상태

    // 컴포넌트 마운트 시 실행되는 useEffect
    useEffect(() => {
        console.log('[MemoList] useEffect() called');

        // 로그인된 세션 ID 가져오기
        const sessionId = getLoginedInSessionID();
        if(sessionId) {
            // 세션 ID를 기반으로 사용자의 메모 가져오기
            const myMemos = getMyMemo(sessionId);
            if (myMemos) {
                // 메모 객체를 배열로 변환하여 상태에 저장 (최근 작성된 메모가 위로 오게 reverse)
                const memoArr = Object.keys(myMemos).map(key => ({
                    ...myMemos[key],
                    regDate: key // regDate를 키로 추가
                }));
                setIsMyMemo(memoArr.reverse());
            }
        }
    }, []);

    // 메모 수정 핸들러
    const handleEdit = (memo) => {
        setCurrentMemo(memo); // 현재 수정 중인 메모 설정
        setNewMemo(memo.memo); // 수정할 메모 내용 설정
        setIsModalOpen(true); // 모달 창 열기
    };

    // 메모 삭제 핸들러
    const handleDelete = (regDate) => {
        const sessionId = getLoginedInSessionID(); // 로그인된 세션 ID 가져오기
        const myMemos = getMyMemo(sessionId); // 사용자의 메모 가져오기
        if (myMemos && myMemos[regDate]) {
            delete myMemos[regDate]; // 메모 삭제
            setMyMemo(sessionId, myMemos); // 업데이트된 메모 저장
            const updatedMemos = Object.keys(myMemos).map(key => ({
                ...myMemos[key],
                regDate: key // regDate를 키로 추가
            }));
            setIsMyMemo(updatedMemos.reverse()); // 상태 업데이트
        }
    };

    // 메모 저장 핸들러
    const handleSave = () => {
        const sessionId = getLoginedInSessionID(); // 로그인된 세션 ID 가져오기
        const myMemos = getMyMemo(sessionId); // 사용자의 메모 가져오기
        if (myMemos && myMemos[currentMemo.regDate]) {
            myMemos[currentMemo.regDate].memo = newMemo; // 메모 내용 업데이트
            myMemos[currentMemo.regDate].modDate = getDateTime(); // 수정 날짜 업데이트
            setMyMemo(sessionId, myMemos); // 업데이트된 메모 저장
            const updatedMemos = Object.keys(myMemos).map(key => ({
                ...myMemos[key],
                regDate: key // regDate를 키로 추가
            }));
            setIsMyMemo(updatedMemos.reverse()); // 상태 업데이트
            setIsModalOpen(false); // 모달 창 닫기
        }
    };

    return(
        <div id="memo_list_wrap">
            <div className="memo_item">
                <ul>
                    {isMyMemo.map((memo, index) => (
                        <li key={index}>
                            <p>작성한 시간: {memo.regDate}</p>
                            <p>내용: {memo.memo}</p>
                            <button onClick={() => handleEdit(memo)}>수정</button>
                            <button onClick={() => handleDelete(memo.regDate)}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal_content">
                        <h2>메모 수정</h2>
                        <textarea
                            value={newMemo}
                            onChange={(e) => setNewMemo(e.target.value)}
                        />
                        <button onClick={handleSave}>저장</button>
                        <button onClick={() => setIsModalOpen(false)}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemoList;