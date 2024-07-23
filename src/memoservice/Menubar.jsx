import React from "react";
import { Link } from "react-router-dom";
import './css/index.css';
import { setLoginedInSessionID } from "./js/utils";


const Menubar = ({ isLogined, setIsLogined }) => {
    // 로그아웃 버튼 클릭 핸들러
    const signOutBtnClickHandler = () => {
        console.log('[Menubar] signOutBtnClickHandler');
        setLoginedInSessionID(''); // 세션 ID 초기화
        setIsLogined(false); // 로그인 상태 false로 설정
        alert('Sign Out Success!');
    }

    return (
        <div id="menubar">
            <ul>
                <li>
                    <Link to={'/'}>HOME</Link>
                </li>

                {/* 로그인 상태에 따른 메뉴 표시 */}
                {
                    isLogined
                        ? // 로그인된 상태
                        <>
                            <li onClick={signOutBtnClickHandler}>
                                <Link to={'/signout'}>SIGN OUT</Link>
                            </li>
                            <li>
                                <Link to={'/modify'}>MODIFY</Link>
                            </li>
                        </>
                        : // 로그아웃된 상태
                        <>
                            <li>
                                <Link to={'/signin'}>SIGN IN</Link>
                            </li>
                            <li>
                                <Link to={'/signup'}>SIGN UP</Link>
                            </li>
                        </>
                }
                <li>
                    <Link to={'/memo'}>MEMO</Link>
                </li>
                <li>
                    <Link to={'/memolist'}>MEMO LIST</Link>
                </li>
            </ul>
        </div>
    )
}

export default Menubar;