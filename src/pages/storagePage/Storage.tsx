import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./storage.css";
import StorageCard from "./StorageCard";
import monthImgUrl from "./ImgUrls";
interface LetterCount {
  [year: string]: {
    [month: string]: number;
  };
}

const Storage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>(); // url의 파라미터로 넘겨져 온 것.
  const curr_user = sessionStorage.getItem("user_id");
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState<string>("");
  const [letterCount, setLetterCount] = useState<LetterCount>({});
  const MONTH_NUM = 12;

  const arr_2023 = new Array<number>(MONTH_NUM).fill(0);
  const arr_2022 = new Array<number>(MONTH_NUM).fill(0);

  const [data2022, setData2022] = useState<number[]>(arr_2022);
  const [data2023, setData2023] = useState<number[]>(arr_2023);

  useEffect(() => {
    axios
      .get(`http://34.64.195.153:5000/api/box/choi`)
      .then((response) => {
        if (response.data === "편지가 없어요") {
          console.log("편지가 없어요");
        } else {
          setLetterCount(response.data);
          console.log(letterCount);
          console.log(letterCount.year.month + "여기는 년도");
          console.log(letterCount.month + "여기는 월");
          const year = response.data;
          const month = response.data.data;
          const index = Number(month) - 1; // int로 형변환
          const year2023 = "2023";
          const year2022 = "2022";
          console.log(year);
          if (year === year2023) {
            arr_2023[index] = arr_2023[index] + 1;
          } else if (year === year2022) {
            arr_2022[index] = arr_2022[index] + 1;
          }
          console.log("편지는 들어왔음");

          console.log(letterCount.year + "추상화");
          setData2023(() => [...arr_2023]);
          setData2022(() => [...arr_2022]);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);
  }, []);

  //   axios
  //     .get(`http://34.64.195.153:5000/api/nickName/${id}`)
  //     .then((response) => {
  //       setNickname(response.data[0].nickname);
  //     })
  //     .catch((error) => {
  //       console.log(error+"닉네임 못받아옴 로그인 하셈");
  //     });

  return (
    <>
      <div className="title-bar">
        <div className="title-holder">
          <span className="title">
            <span id="name">{nickname}</span> 님의 보관함입니다.
          </span>
        </div>

        <div className="title_menu">
          {id === curr_user ? (
            <span id="welcome">{nickname}님</span>
          ) : (
            <span
              id="welcome"
              onClick={() => {
                document.location.href = `/login`;
              }}
            >
              로그인/회원가입
            </span>
          )}

          <span
            id="storage"
            onClick={() => {
              if (curr_user == id) {
                document.location.href = `/mypage/${id}`;
                alert("자신의 보관함만 열람 가능합니다.");
              }
            }}
          >
            내 보관함
          </span>
        </div>
      </div>

      <div className="letter_box">
        <div className="storage_year">2023년의 추억들</div>
        <div className="container_grid">
          {data2023.map((data, index) => {
            return (
              <StorageCard
                key={index}
                id={id}
                imgSrc={monthImgUrl[index]}
                month={index + 1}
                letterNum={data}
              />
            );
          })}
        </div>
        <div className="storage_year">2022년의 추억들</div>
        <div className="container_grid">
          {data2022.map((data, index) => {
            return (
              <StorageCard
                key={index}
                id={id}
                imgSrc={monthImgUrl[index]}
                month={index + 1}
                letterNum={data}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Storage;
