import "./letter.css";
//리코일
import { useRecoilState } from "recoil";
import {
  isLoginedState,
  jwtStringState,
  uniqueIdState,
  userIdState,
  nickNameState,
  providerState,
} from "../../recoilStore";
//리코일
interface LetterCardProps {
  id: string;
  content: number;
}

const Letter: React.FC<LetterCardProps> = ({ id, content }) => {
  const [recoilIsLogined, setRecoilIsLogined] = useRecoilState(isLoginedState);
  const [recoilUniqueId, setRecoilUniqueId] = useRecoilState(uniqueIdState);
  const [recoilUserId, setRecoilUserId] = useRecoilState(userIdState);
  const [myNickName, setMyNickName] = useRecoilState(nickNameState);
  const [recoilJwtString, setRecoilJwtString] = useRecoilState(jwtStringState);
  return (
    <div
      className="box"
      onClick={() => {
        // document.location.href = `${recoilUserId}/${year}/${month}`;
      }}
    >
      <div className="imgBox">
        <h2>{id}월</h2>
      </div>
      <div className="content">
        <span>{content}</span>
      </div>
    </div>
  );
};

export default Letter;
