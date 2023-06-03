import Header from "../../components/organisms/header/Header";
import GetLetter from "./GetLetter";
import UserInputText from "./UserInputText";
import WritingLetterButton from "./WritingLetterButton";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const localStorageCheck = localStorage.getItem("jwt");
  const loginCheck = () => localStorageCheck && setIsLogin(true);

  const onLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    loginCheck();
  }, [isLogin]);

  console.log(isLogin);

  return (
    <>
      <Header isLogin={isLogin} onLogOut={onLogOut} />
      <UserInputText isLogin={isLogin} />
      <GetLetter />
      <WritingLetterButton />
    </>
  );
};

export default MainPage;
