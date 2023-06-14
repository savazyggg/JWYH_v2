import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./storage.css";
import StorageCard from "./StorageCard";
import jwt_decode from "jwt-decode";
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

  const monthArray = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const yearArray = [""];
  useEffect(() => {
    axios
      .get(`http://34.64.195.153:5000/api/box/choi`)
      .then((response) => {
        console.log("찍힌 데이터" + response.data);
        if (response.data === "편지가 없어요") {
          const obj = response.data;
          console.log(obj["2021"]["6"]); //1

          console.log("편지가 없어요");
        } else {
          const obj = response.data;
          console.log(obj);
          const yearArray = Object.keys(obj);
          console.log(yearArray + "년도별 array");
          // for (let i = 0; i < yearArray.length; i++) {
          //   for (let j = 0; j < monthArray.length; j++) {
          //         console.log(obj[yearArray[i]][monthArray[j]]+"여기임");
          //         if(yearArray[i]==="2023"){
          //           // setData2023(data2023=>[...data2023,[obj[yearArray[i]][monthArray[j]]]]);
          //           // console.log("hi");
          //         }

          //   }
          //   console.log(data2023);
          // }
          const year2023 = "2023";
          const year2022 = "2022";
          // const month=1;
          // // const index=Number(month)-1;
          for (let i = 0; i < yearArray.length; i++) {
            for (let j = 0; j < monthArray.length; j++) {
              console.log(obj[year2023] + "안녕");
              if (yearArray[i] === year2023) {
                arr_2023[j] = obj[year2023][j];
                console.log(arr_2023[j]);
              }
              setData2023(() => [...arr_2023]);
            }
            console.log(data2023 + "여기다");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoading(false);

    const tokenStr = localStorage.getItem("jwt");
    interface JwtDecoded {
      iat: number;
      id: string;
      nickName: string;
      objectId: string;
    }
    const JwtDecoded: JwtDecoded = jwt_decode(tokenStr);
    console.log("여기에서 찍혀야함" + JwtDecoded + "JWTDecoded");
    setNickname(JwtDecoded.nickName);
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
                document.location.href = `/login`; //로그인 여부에 따라 다르게
              }}
            >
              로그인/회원가입
            </span>
          )}

          <span
            id="storage"
            onClick={() => {
              if (curr_user == id) {
                document.location.href = `/mypage/${id}`; // 유저의 레터스페이스로 이동 (로그인 유저와 같아야 함)
              } else {
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
                year={2023}
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
                year={2022}
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
