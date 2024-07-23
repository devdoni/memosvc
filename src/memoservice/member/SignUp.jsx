import React, { useState } from "react";
import { getAllUserDB, getAllUserMemoDB, setAllUserDB, setAllUserMemoDB } from "../js/utils";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    // Hook 선언
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    const [uId, setUId] = useState(''); // 사용자 ID 상태
    const [uPw, setUPw] = useState(''); // 사용자 비밀번호 상태
    const [uName, setUName] = useState(''); // 사용자 이름 상태
    const [uPhone, setUPhone] = useState(''); // 사용자 전화번호 상태
    const [uMail, setUMail] = useState(''); // 사용자 이메일 상태

    // 사용자 ID 입력 핸들러
    const uIdChangeHandler = (e) => {
        console.log('[SignUp] userIdChangeHandler()');
        setUId(e.target.value); // 사용자 ID 상태 업데이트
    }

    // 사용자 비밀번호 입력 핸들러
    const uPwChangeHandler = (e) => {
        console.log('[SignUp] userPwChangeHandler()');
        setUPw(e.target.value); // 사용자 비밀번호 상태 업데이트
    }

    // 사용자 이름 입력 핸들러
    const uNameChangeHandler = (e) => {
        console.log('[SignUp] userNameChangeHandler()');
        setUName(e.target.value); // 사용자 이름 상태 업데이트
    }

    // 사용자 전화번호 입력 핸들러
    const uPhoneChangeHandler = (e) => {
        console.log('[SignUp] userPhoneChangeHandler()');
        setUPhone(e.target.value); // 사용자 전화번호 상태 업데이트
    }

    // 사용자 이메일 입력 핸들러
    const uMailChangeHandler = (e) => {
        console.log('[SignUp] userMailChangeHandler()');
        setUMail(e.target.value); // 사용자 이메일 상태 업데이트
    }

    // 회원가입 버튼 클릭 핸들러
    const signUpBtnClickHandler = () => { 
        console.log('[SignUp] signUpBtnClickHandler()');

        let allUserDB = getAllUserDB(); // 모든 사용자 DB 가져오기
        let allUserMemoDB = getAllUserMemoDB(); // 모든 사용자 메모 DB 가져오기

        // 사용자 DB가 비어 있는 경우
        if (allUserDB === null) {
            let NewUserObj = {
                [uId]: {
                    "uId": uId,
                    "uPw": uPw,
                    "uName": uName,
                    "uPhone": uPhone,
                    "uMail": uMail
                }
            }
            setAllUserDB(NewUserObj); // 새로운 사용자 DB 설정

        } else {
            // 사용자 DB가 비어 있지 않은 경우
            let userObj = allUserDB;
            userObj[uId] = {
                "userId": uId,
                "userPw": uPw,
                "userName": uName,
                "userPhone": uPhone,
                "userMail": uMail
            }
            setAllUserDB(userObj); // 기존 사용자 DB에 새로운 사용자 추가
        }

        // 사용자 메모 DB가 비어 있는 경우
        if (allUserMemoDB === null) {
            let newMemoObj = {
                [uId]: {}
            }
            setAllUserMemoDB(newMemoObj); // 새로운 사용자 메모 DB 설정

            alert("Sign Up Success");
            navigate("/signin"); // 회원가입 성공 시 로그인 페이지로 이동

        } else {
            // 사용자 메모 DB가 비어 있지 않은 경우
            let memoObj = allUserMemoDB;
            memoObj[uId] = {}
            setAllUserMemoDB(memoObj); // 기존 사용자 메모 DB에 새로운 사용자 추가

            alert("Sign Up Success");
            navigate("/signin"); // 회원가입 성공 시 로그인 페이지로 이동
        }
    }

    return ( 
        <div id="signup_wrap">
            <div className="signup_item">
                {/* 사용자 ID 입력 필드 */}
                <input className="input_box" type="text" placeholder="INPUT USER ID" onChange={uIdChangeHandler}/>
                <br />
                {/* 사용자 비밀번호 입력 필드 */}
                <input className="input_box" type="password" placeholder="INPUT USER PW" onChange={uPwChangeHandler} />
                <br />
                {/* 사용자 이름 입력 필드 */}
                <input className="input_box" type="text" placeholder="INPUT USER NAME" onChange={uNameChangeHandler}/>
                <br />
                {/* 사용자 전화번호 입력 필드 */}
                <input className="input_box" type="text" placeholder="INPUT USER PHONE" onChange={uPhoneChangeHandler}/>
                <br />
                {/* 사용자 이메일 입력 필드 */}
                <input className="input_box" type="text" placeholder="INPUT USER MAIL" onChange={uMailChangeHandler}/>
                <br />
                {/* 회원가입 버튼 */}
                <button className="basic_btn" onClick={signUpBtnClickHandler}>SIGN UP</button>
            </div>
        </div>
    )
}
export default SignUp;