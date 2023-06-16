import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./letter.css";
import LetterCard from "./Letter";
// import moment from "moment";
import { useRecoilState } from "recoil";
import Header from "../../components/organisms/header/Header";
import letterImgUrl from "./letterUrls";
import {
  userIdState,

  // providerState,
} from "../../recoilStore";
//리코일
interface LetterSavedInfo {
  unlockYear: string;
  unlockMonth: string;
  unlockDate: string;
  content: string;
  sender: string;
  style: string;
  id: number;
}

const StorageLetter: React.FC = () => {
  const [recoilUserId, _setRecoilUserId] = useRecoilState(userIdState);

  //편지 ui 정리
  // const [pageSize,setPageSize]=useState(3); //한 페이지에 들어가는 글 갯수
  //   const [totalCount,setTotalCount]=useState(5); //전체 글 갯수
  //   const [currentPage,setCurrentPage]=useState(1);//현재 페이지
  //   const [Letters, setLetters] = useState([]); //편지 담기
  const { year, month } = useParams<{
    id: string;
    year: string;
    month: string;
  }>();
  const [letterSavedInfo, setLetterSavedInfo] = useState<LetterSavedInfo[]>([]);
  const [_loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(year, month);
    const getLettersFromDB = async () => {
      try {
        const response = await axios.get(
          `https://kdt-sw-4-team14.elicecoding.com/api/box/${recoilUserId}/${year}/${month}`
        );
        if (!response.data) {
          console.log("No letters");
        } else {
          const letterData = response.data.map((item: any) => ({
            unlockYear: item.unlockYear,
            unlockMonth: item.unlockMonth,
            unlockDate: item.unlockDate,
            content: item.content,
            style: item.style,
            sender: item.sender,
            id: item.index,
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
        <div className="letter_container_grid">
          {letterSavedInfo.map((data, index) => {
            return (
              <LetterCard
                id={data.id}
                content={data.content}
                sender={data.sender}
                unlockDate={data.unlockDate}
                color={data.style}
                unlockYear={data.unlockYear}
                unlockMonth={data.unlockMonth}
                imgSrc={letterImgUrl[index % 3]}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StorageLetter;
