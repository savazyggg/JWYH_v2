import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./letter.css";
import LetterCard from "./Letter";
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

  //편지 ui 정리
  // const [pageSize,setPageSize]=useState(3); //한 페이지에 들어가는 글 갯수
  //   const [totalCount,setTotalCount]=useState(5); //전체 글 갯수
  //   const [currentPage,setCurrentPage]=useState(1);//현재 페이지
  //   const [Letters, setLetters] = useState([]); //편지 담기
  const { id, year, month } = useParams<{
    id: string;
    year: string;
    month: string;
  }>();
  const [letterSavedInfo, setLetterSavedInfo] = useState<LetterSavedInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(year, month);
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

      <div className="letter_box">
        <div className="storage_year">
          {year}년 {month}월 받은 편지
        </div>
        <div className="container_grid">
          {letterSavedInfo.map((data, index) => {
            return <LetterCard id={index} content={data.content} />;
          })}
        </div>
      </div>
    </>
  );
};

export default StorageLetter;
