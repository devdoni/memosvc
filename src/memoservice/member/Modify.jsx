import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginedInSessionID, getMyUserInfo, setMyUserInfo } from "../js/utils";

const Modify = () => {
    // Hook 선언
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const [uId, setUId] = useState(''); // 사용자 ID 상태
    const [uPw, setUPw] = useState(''); // 사용자 비밀번호 상태
    const [uName, setUName] = useState(''); // 사용자 이름 상태
    const [uPhone, setUPhone] = useState(''); // 사용자 전화번호 상태
    const [uMail, setUMail] = useState(''); // 사용자 이메일 상태
    const [modFlag, setModFlag] = useState(false); // 사용자 정보 수정 여부 상태

    // 컴포넌트가 마운트될 때 실행되는 useEffect
    useEffect(() => {
        console.log('[Modify] useEffect called()');

        // 로그인된 세션 ID가 없을 경우 메인 페이지로 이동
        if(getLoginedInSessionID() === '') {
            alert('Invalid request!');
            navigate('/');
            return;
        } else {
            // 로그인된 세션 ID로 사용자 정보 가져오기
            let myInfo = getMyUserInfo(getLoginedInSessionID());
            setUId(myInfo.uId);
            setUPw(myInfo.uPw);
            setUName(myInfo.uName);
            setUPhone(myInfo.uPhone);
            setUMail(myInfo.uMail);
        }
    }, [modFlag]); // modFlag가 변경될 때마다 실행

    // 비밀번호 변경 핸들러
    const uPwChangeHandler = (e) => {
        console.log('[Modify] uPwChangeHandler Called()');
        setUPw(e.target.value); // 비밀번호 상태 업데이트
    }

    // 이름 변경 핸들러
    const uNameChangeHandler = (e) => {
        console.log('[Modify] uNameChangeHandler Called()');
        setUName(e.target.value); // 이름 상태 업데이트
    }

    // 전화번호 변경 핸들러
    const uPhoneChangeHandler = (e) => {
        console.log('[Modify] uPhoneChangeHandler Called()');
        setUPhone(e.target.value); // 전화번호 상태 업데이트
    }

    // 이메일 변경 핸들러
    const uMailChangeHandler = (e) => {
        console.log('[Modify] uMailChangeHandler Called()');
        setUMail(e.target.value); // 이메일 상태 업데이트
    }

    // 수정 버튼 클릭 핸들러
    const modfiyBtnClickHandler = () => {
        console.log('[Modify] modfiyBtnClickHandler Called()');

        // 현재 사용자 정보 가져오기
        let myInfo = getMyUserInfo(getLoginedInSessionID());

        // 수정된 사용자 정보로 업데이트
        myInfo = {
            "uId": uId,
            "uPw": uPw,
            "uName": uName,
            "uPhone": uPhone,
            "uMail": uMail
        }

        // 업데이트된 사용자 정보를 저장
        setMyUserInfo(getLoginedInSessionID(), myInfo);

        // 수정 플래그를 토글하여 useEffect 재실행
        setModFlag(prev => !prev);
        alert('Modify Success!');
    }

    return (
        <div id="modify_wrap">
            <div className="modify_item">
                {/* 사용자 ID 입력 필드 (읽기 전용) */}
                <input className="input_box" type="text" value={uId} readOnly />
                <br />
                {/* 비밀번호 입력 필드 */}
                <input className="input_box" type="password" placeholder="Change User PW" value={uPw} onChange={uPwChangeHandler} />
                <br />
                {/* 이름 입력 필드 */}
                <input className="input_box" type="text" placeholder="Change User NAME" value={uName} onChange={uNameChangeHandler} />
                <br />
                {/* 전화번호 입력 필드 */}
                <input className="input_box" type="text" placeholder="Change User PHONE" value={uPhone} onChange={uPhoneChangeHandler} />
                <br />
                {/* 이메일 입력 필드 */}
                <input className="input_box" type="text" placeholder="Change User MAIL" value={uMail} onChange={uMailChangeHandler} />
                <br />
                {/* 수정 버튼 */}
                <button className="basic_btn" onClick={modfiyBtnClickHandler}>MODIFY</button>
            </div>
        </div>
    )
}

export default Modify;