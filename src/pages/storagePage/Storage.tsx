import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import "./storage.css";
import StorageCard from "./StorageCard";
import monthImgUrl from "./ImgUrls";
//리코일
import { useRecoilState } from "recoil";
import {
  isLoginedState,
  jwtStringState,
  uniqueIdState,
  userIdState,
  nickNameState,
} from "../../recoilStore";
//리코일
import Header from "../../components/organisms/header/Header";

const Storage = (): JSX.Element => {
  //리코일
  const [recoilIsLogined, _setRecoilIsLogined] = useRecoilState(isLoginedState);
  const [recoilUniqueId, _setRecoilUniqueId] = useRecoilState(uniqueIdState);
  const [recoilUserId, _setRecoilUserId] = useRecoilState(userIdState);
  const [myNickName, _setMyNickName] = useRecoilState(nickNameState);
  const [recoilJwtString, _setRecoilJwtString] = useRecoilState(jwtStringState);

  //리코일

  const MONTH_NUM = 12;

  const arr_2023 = new Array<number>(MONTH_NUM).fill(0);
  const arr_2022 = new Array<number>(MONTH_NUM).fill(0);

  const [data2022, _setData2022] = useState<number[]>(arr_2022);
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
  // const yearArray = [""];
  useEffect(() => {
    axios
      .get(`https://kdt-sw-4-team14.elicecoding.com/api/box/${recoilUserId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + recoilJwtString,
        },
      })
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

          const year2023 = "2023";

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

    console.log(recoilIsLogined);
    console.log(recoilJwtString);
    console.log(myNickName);
    console.log(recoilUniqueId);
    console.log(recoilUserId);
  }, []);

  return (
    <>
      <>
        <Header></Header>
      </>

      <div className="letter_box">
        <div className="storage_year">2023년의 추억들</div>
        <div className="container_grid">
          {data2023.map((data, index) => {
            return (
              <StorageCard
                key={index}
                id={recoilUserId}
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
                id={recoilUserId}
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
