// 상수 정의
const USER_DB_IN_LOCAL_STORAGE = "userDB"; // 사용자 DB를 저장하는 로컬 스토리지 키
const USER_MEMO_DB_IN_LOCAL_STORAGE = "userMemoDB"; // 사용자 메모 DB를 저장하는 로컬 스토리지 키
const LOGINED_IN_SESSION_STORAGE = "sessionID"; // 로그인된 세션 ID를 저장하는 세션 스토리지 키

// 세션 스토리지 함수
export const getLoginedInSessionID = () => {
    console.log('[Utils] getLoginedInSessionID() called');
    return sessionStorage.getItem(LOGINED_IN_SESSION_STORAGE); // 로그인된 세션 ID를 반환
}

export const setLoginedInSessionID = (id = '') => {
    console.log('[Utils] setLoginedInSessionID() called');
    sessionStorage.setItem(LOGINED_IN_SESSION_STORAGE, id); // 로그인된 세션 ID를 세션 스토리지에 설정
}

// 사용자 DB 함수
export const getAllUserDB = () => {
    console.log('[Utils] getAllUserDB() called');
    return JSON.parse(localStorage.getItem(USER_DB_IN_LOCAL_STORAGE)); // 모든 사용자 DB를 로컬 스토리지에서 가져와 객체로 반환
}

export const setAllUserDB = (userObj) => {
    console.log('[Utils] setAllUserDB() called');
    localStorage.setItem(USER_DB_IN_LOCAL_STORAGE, JSON.stringify(userObj)); // 모든 사용자 DB를 로컬 스토리지에 저장
}

export const getMyUserInfo = (uId) => {
    console.log('[Utils] getMyUserInfo called()');
    let UserDB = getAllUserDB(); // 모든 사용자 DB를 가져옴
    let MyInfo = UserDB[uId]; // 특정 사용자의 정보를 반환
    return MyInfo;
}

export const setMyUserInfo = (uId, userObj) => {
    console.log('[Utils] setMyUserInfo called()');
    let AlluserDB = getAllUserDB(); // 모든 사용자 DB를 가져옴
    AlluserDB[uId] = userObj; // 특정 사용자의 정보를 업데이트
    setAllUserDB(AlluserDB); // 업데이트된 사용자 DB를 로컬 스토리지에 저장
}

// 사용자 메모 DB 함수
export const getAllUserMemoDB = () => {
    console.log('[Utils] getAllUserMemoDB() called');
    return JSON.parse(localStorage.getItem(USER_MEMO_DB_IN_LOCAL_STORAGE)); // 모든 사용자 메모 DB를 로컬 스토리지에서 가져와 객체로 반환
}

export const setAllUserMemoDB = (memoObj) => {
    console.log('[Utils] setAllUserMemoDB() called');
    localStorage.setItem(USER_MEMO_DB_IN_LOCAL_STORAGE, JSON.stringify(memoObj)); // 모든 사용자 메모 DB를 로컬 스토리지에 저장
}

export const getMyMemo = (uId) => {
    console.log('[Utils] getMyMemoDB() called');
    let AllMemos = getAllUserMemoDB(); // 모든 사용자 메모 DB를 가져옴
    return AllMemos[uId] || {}; // 특정 사용자의 메모를 반환, 없을 경우 빈 객체 반환
}

export const setMyMemo = (uId, memoObj) => {
    console.log('[Utils] setMyMemo() called');
    let AllMemos = getAllUserMemoDB(); // 모든 사용자 메모 DB를 가져옴
    AllMemos[uId] = memoObj; // 특정 사용자의 메모를 업데이트
    setAllUserMemoDB(AllMemos); // 업데이트된 사용자 메모 DB를 로컬 스토리지에 저장
}

// 날짜와 시간 가져오기 함수
export const getDateTime = () => {
    console.log('[Utils] getDateTime() called');
    let now = new Date();
    let fullYear = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10 ) month = '0' + month;
    let date = now.getDate()
    if (date < 10 ) date = '0' + date;
    let hours = now.getHours();
    if (hours < 10 ) hours = '0' + hours;
    let minutes = now.getMinutes();
    if (minutes < 10 ) minutes = '0' + minutes;
    let seconds = now.getSeconds();
    if (seconds < 10 ) seconds = '0' + seconds;

    return `${fullYear}/${month}/${date} ${hours}:${minutes}:${seconds}`; // 현재 날짜와 시간을 포맷팅하여 반환
}