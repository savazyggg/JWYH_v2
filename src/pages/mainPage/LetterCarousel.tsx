import _, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { styled as muiStyled } from "@mui/system";
// import { Button } from "@mui/material";
import "swiper/css";
import "swiper/css/effect-cards";
import "./LetterCarousel.css";
import { EffectCards, Navigation } from "swiper";
import { useRecoilState } from "recoil";
import { userIdState } from "../../recoilStore";
import Envelope from "../../components/organisms/envelope/Envelope";
import { jwtStringState } from "../../recoilStore";

interface LetterInterface {
  id?: number;
  index?: string;
  unlockYear?: number;
  unlockMonth?: number;
  unlockDate?: number;
  sender?: string;
  style?: string;
}
// const OkButton = muiStyled(Button)({
//   backgroundColor: "#93BA7B",
//   "&:hover": {
//     backgroundColor: "#76ac56",
//   },
// });

/**
 * 편지 캐러셀 컴포넌트
 */
interface LetterCarouselProps {
  letters: LetterInterface[];
  isGuest: boolean;
  handleLetterData: any;
  className: any;
}

function LetterCarousel(props: LetterCarouselProps) {
  const [jwtString, _setJwtString] = useRecoilState(jwtStringState);

  const { isGuest, handleLetterData } = props;
  const letters: LetterInterface[] = Array.isArray(props.letters)
    ? props.letters
    : [];
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<any>({});
  const [_letterContent, setLetterContent] = useState<any>();
  const [userId, _setUserID] = useRecoilState(userIdState);
  /**
   * 슬라이드 클릭 이벤트 핸들러
   * @param {Letter} letter - 클릭한 편지 객체
   */
  const handleSlideClick = async (letter: LetterInterface) => {
    await fetch(
      `https://kdt-sw-4-team14.elicecoding.com/api/main/${userId}/${letter.index}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + jwtString,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("unreadable letter");
        }
        return response.json();
      })
      .then((data) => {
        setLetterContent(data);
        setModalContent({
          unlockDate: `unlocked : ${letter.unlockYear}/${letter.unlockMonth}/${letter.unlockDate}`,
          sender: letter.sender,
          content: data.content,
          color: letter.style,
        });
      })
      .catch((_) => {
        setModalContent({
          unlockDate: `unlocked : ${letter.unlockYear}/${letter.unlockMonth}/${letter.unlockDate}`,
          sender: letter.sender,
          content: "아직 읽으실수 없어요",
          color: "#fff",
        });
      });
    setModalVisible(true);
  };
  /**
   * 특정 편지의 날짜가 현재 날짜를 지났는지 확인합니다.
   * @param {Letter} letter - 확인할 편지 객체
   * @returns {boolean} - 날짜가 지났을 경우 true, 그렇지 않을 경우 false
   */
  const isDatePassed = (letter: LetterInterface) => {
    const unlockYear = letter.unlockYear ?? 0;
    const unlockMonth = letter.unlockMonth ?? 0;
    const unlockDate = new Date(unlockYear, unlockMonth - 1, letter.unlockDate);
    const currentDate = new Date();
    return unlockDate > currentDate;
  };

  /**
   * 모달을 닫습니다.
   */
  const closeModal = () => {
    setModalVisible(false);
    handleLetterData(userId);
  };
  return (
    <div className="container">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Navigation]}
        className={`${letters.length ? "" : "empty-letter"}`}
        navigation={true}
      >
        {letters.length ? (
          letters.map((letter) => (
            <SwiperSlide
              key={letter.index}
              onClick={!isGuest ? () => handleSlideClick(letter) : undefined}
              className={!isDatePassed(letter) ? "" : "locked-on"}
            >
              <div className="date-div">
                {`Unlock: ${letter.unlockYear}년 ${letter.unlockMonth}월 ${letter.unlockDate}일`}
              </div>
              <div className="sender-div">{`From .. ${letter.sender}`}</div>
            </SwiperSlide>
          ))
        ) : (
          <div className="empty-letter">
            <SwiperSlide className={"locked-on"}>
              <div className="date-div">{`Unlock: 2024년 1월 2일`}</div>
              <div className="sender-div">{`From .. 전여친`}</div>
            </SwiperSlide>
            <SwiperSlide className={"locked-on"}>
              <div className="date-div">{`Unlock: 2024년 12월 25일`}</div>
              <div className="sender-div">{`From .. 산타할아버지`}</div>
            </SwiperSlide>
            <SwiperSlide className={"locked-on"}>
              <div className="date-div">{`Unlock: 2024년 7월 2일`}</div>
              <div className="sender-div">{`From .. 엄마`}</div>
            </SwiperSlide>
            <SwiperSlide className={"locked-on"}>
              <div className="date-div">{`Unlock: 2024년 1월 1일`}</div>
              <div className="sender-div">{`From .. 신년인사`}</div>
            </SwiperSlide>
          </div>
        )}
      </Swiper>

      {modalVisible && (
        <div className={`modal ${modalVisible ? "visible" : ""}`}>
          <div className="modal-content">
            <Envelope
              modalContent={modalContent}
              closeModal={closeModal}
            ></Envelope>
            {/* <div>{modalContent.unlockDate}</div>
            <div className="modal-sender">{`From .. ${modalContent.sender}`}</div>
            <div
              className="modal-content-div"
              dangerouslySetInnerHTML={{ __html: modalContent.content }}
            ></div>
            <OkButton variant="contained" size="small" onClick={closeModal}>
              닫기
            </OkButton> */}
          </div>
        </div>
      )}
    </div>
  );
}
export { LetterCarousel };
export type { LetterInterface };
