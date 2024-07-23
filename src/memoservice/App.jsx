import React, { useState } from "react";
import './css/common.css';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Home";
import SignUp from "./member/SignUp";
import SignIn from "./member/SignIn";
import Menubar from "./Menubar";
import MemoList from "./MemoList";
import Memo from "./Memo";
import Modify from "./member/Modify";

const App = () => {
    // Hook 
    const [isLogined, setIsLogined] = useState(false);

    return (
        <BrowserRouter>
            <div id="wrap">
                <Menubar isLogined={isLogined} setIsLogined={setIsLogined} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn setIsLogined={setIsLogined} />} />
                    <Route path="/memo" element={<Memo />} />
                    <Route path="/memolist" element={<MemoList />} />
                    <Route path="/modify" element={<Modify />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;