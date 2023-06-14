import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./letter.css";
import moment from "moment";
import { useRecoilState } from "recoil";
import Header from "../../components/organisms/header/Header";
import {
  isLoginedState,
  jwtStringState,
  uniqueIdState,
  userIdState,
  nickNameState,
  providerState,
} from "../../recoilStore";
//리코일
interface LetterSavedInfo {
  unlockYear: string;
  unlockMonth: string;
  unlockDate: string;
  content: string;
  sender: string;
  style: string;
}

const StorageLetter: React.FC = () => {
  const [recoilIsLogined, setRecoilIsLogined] = useRecoilState(isLoginedState);
  const [recoilUniqueId, setRecoilUniqueId] = useRecoilState(uniqueIdState);
  const [recoilUserId, setRecoilUserId] = useRecoilState(userIdState);
  const [myNickName, setMyNickName] = useRecoilState(nickNameState);
  const [recoilJwtString, setRecoilJwtString] = useRecoilState(jwtStringState);
  const { id, year, month } = useParams<{
    id: string;
    year: string;
    month: string;
  }>();
  const [letterSavedInfo, setLetterSavedInfo] = useState<LetterSavedInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getLettersFromDB = async () => {
      try {
        const response = await axios.get(
          `http://34.64.195.153:5000/api/box/${recoilUserId}/${year}/${month}`
        );
        if (response.data === "편지가 없어요") {
          console.log("No letters");
        } else {
          const letterData = response.data.map((item: any) => ({
            unlockYear: item.unlockYear,
            unlockMonth: item.unlockMonth,
            unlockDate: item.unlockDate,
            content: item.content,
            style: item.style,
            sender: item.sender,
          }));
          setLetterSavedInfo(letterData);
          console.log(letterData);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    getLettersFromDB();
  }, [year, month]);

  return (
    <>
      <>
        <Header></Header>
      </>

      <div>
        <h1>{`${year}년 ${month}월 편지 보관함`}</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="letter-container">
            <div className="letter-box">
              {letterSavedInfo.map((letter) => (
                <div className="letter" style={{ background: letter.style }}>
                  <div key={letter.unlockDate}>
                    <h2>{letter.sender}</h2>
                    <p>{`열람일: ${moment(letter.unlockDate).format(
                      "YYYY-MM-DD"
                    )}`}</p>
                    <p>{letter.content}</p>
                    <p>{`효과 종류: ${letter.style}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StorageLetter;
