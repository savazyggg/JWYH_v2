import Header from "../../components/organisms/header/Header";
import GetLetter from "./GetLetter";
import UserInputText from "./UserInputText";
import WritingLetterButton from "./WritingLetterButton";
import { useEffect, useState } from "react";

//TODO 06.03 윤지 : 로그인 상태는 localstorage, recoilstore 둘다 받아야될듯
//TODO 목적 localstorge : 브라우저 종료 후에 재접속시에도 로그인 유지, recoilstore: 로그인 상태 컴포넌트에 전달

//TODO 06.03 윤지: 메인페이지 url 관리하는거 너무 힘들것 같습니다. 이거 다시 제대로 얘기해봐야 할 거같아요.
//TODO 로그인한 유저가 링크복사 전송 -> 접속 -> url: 1) 로그인 x : 도메인/난수 2) 로그인o 도메인/userID 여기서 로그아웃하면? 난수로 또 바뀔지? 그리고 링크생성자와 들어가서 로그인한 아이디가 다르면? url, 랜딩 바뀜 다시생각해보기

const MainPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const localStorageCheck = localStorage.getItem("jwt");

  /** 메인페이지에서 로그인 유무 체크  */
  const loginCheck = () => localStorageCheck && setIsLogin(true);

  //console.log("mainpage islogin:" + isLogin);

  /** 로그아웃 상태변경은 상태변경 험수 헤더로 props내려주어 헤더에서 상태변경되어 메인페이지에서 상태 반영 */
  const onLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    loginCheck();
  }, [isLogin]);

  return (
    <>
      <Header isLogin={isLogin} onLogOut={onLogOut} />
      <UserInputText isLogin={isLogin} />
      <GetLetter />
      <WritingLetterButton isLogin={isLogin} />
    </>
  );
};

export default MainPage;
