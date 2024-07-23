import React, { useEffect, useState } from "react";
import { getAllUserDB, getMyUserInfo, setLoginedInSessionID } from "../js/utils";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setIsLogined }) => {  
    // Hook 선언
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const [uId, setUId] = useState(''); // 사용자 ID 상태
    const [uPw, setUPw] = useState(''); // 사용자 비밀번호 상태

    // 사용자 ID 입력 핸들러
    const userIdChangeHandler = (e) => {
        console.log('[SignIn] userIdChangeHandler Called()');
        setUId(e.target.value); // 사용자 ID 상태 업데이트
    }

    // 사용자 비밀번호 입력 핸들러
    const userPwChangeHandler = (e) => {
        console.log('[SignIn] userPwChangeHandler Called()');
        setUPw(e.target.value); // 사용자 비밀번호 상태 업데이트
    }

    // 로그인 버튼 클릭 핸들러
    const signInBtnClickHandler = () => {
        console.log('[SignIn] signInBtnClickHandler Called()');

        let MyUserInfo = getMyUserInfo(uId); // 입력된 사용자 ID로 사용자 정보 가져오기

        console.log('userDB ==>', MyUserInfo);

        // 사용자 정보가 존재하고 비밀번호가 일치하는지 확인
        if (MyUserInfo !== undefined && MyUserInfo.uPw === uPw) {
            alert('Login Success!');

            setLoginedInSessionID(uId); // 세션 ID 설정
            setIsLogined(true); // 로그인 상태 설정
            navigate('/'); // 메인 페이지로 이동
        } else {
            alert('Login Fail!');
            setUId(''); // 사용자 ID 초기화
            setUPw(''); // 사용자 비밀번호 초기화
        }
    }

    return (
        <div id="signin_wrap">
            <div className="signin_item">
                {/* 사용자 ID 입력 필드 */}
                <input className="input_box" type="text" value={uId} placeholder="INPUT USER ID" onChange={userIdChangeHandler} />
                <br />
                {/* 사용자 비밀번호 입력 필드 */}
                <input className="input_box" type="password" value={uPw} placeholder="INPUT USER PW" onChange={userPwChangeHandler} />
                <br />
                {/* 로그인 버튼 */}
                <button className="basic_btn" onClick={signInBtnClickHandler}>SIGN IN</button>
            </div>
        </div>
    )
}

export default SignIn;