import "./storage.css";
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
interface StorageCardProps {
  id: string;
  year: number;
  month: number;
  imgSrc: string;
  letterNum: number;
}

const StorageCard: React.FC<StorageCardProps> = ({
  id,
  year,
  month,
  imgSrc,
  letterNum,
}) => {
  const [recoilIsLogined, setRecoilIsLogined] = useRecoilState(isLoginedState);
  const [recoilUniqueId, setRecoilUniqueId] = useRecoilState(uniqueIdState);
  const [recoilUserId, setRecoilUserId] = useRecoilState(userIdState);
  const [myNickName, setMyNickName] = useRecoilState(nickNameState);
  const [recoilJwtString, setRecoilJwtString] = useRecoilState(jwtStringState);
  return (
    <div
      className="box"
      onClick={() => {
        document.location.href = `${recoilUserId}/${year}/${month}`;
      }}
    >
      <div className="imgBox">
        <img src={imgSrc} alt="" />
        <h2>{month}월</h2>
      </div>
      <div className="content">
        <span>
          {letterNum}개의
          <br />
          편지가
          <br />
          있어요!
        </span>
      </div>
    </div>
  );
};

export default StorageCard;
