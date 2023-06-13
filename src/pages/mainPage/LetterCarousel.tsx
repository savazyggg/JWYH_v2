import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { styled as muiStyled } from "@mui/system";
import { Button } from "@mui/material";
import "swiper/css";
import "swiper/css/effect-cards";
import "./LetterCarousel.css";
import { EffectCards, Navigation } from "swiper";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIdState } from "../../recoilStore";

interface LetterInterface {
  id: number;
  index: string;
  unlockYear: number;
  unlockMonth: number;
  unlockDate: number;
  sender: string;
  style: string;
}
const OkButton = muiStyled(Button)({
  backgroundColor: "#7B6F93",
  "&:hover": {
    backgroundColor: "#A695BA",
  },
});

/**
 * 편지 캐러셀 컴포넌트
 */
interface LetterCarouselProps {
  isGuest: boolean;
  letters: LetterInterface;
  handleLetterData: any;
}
function LetterCarousel(props: LetterCarouselProps) {
  const { isGuest, letters, handleLetterData } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<any>({});
  const [letterContents, setLetterContent] = useState<any>();
  const [userId, setUserId] = useRecoilState(userIdState);
  /**
   * 슬라이드 클릭 이벤트 핸들러
   * @param {Letter} letter - 클릭한 편지 객체
   */
  const handleSlideClick = async (letter: LetterInterface) => {
    await fetch(`http://34.64.195.153:5000/api/main/${userId}/${letter.index}`)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
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
      .catch((error) => {
        setModalContent({
          unlockDate: `unlocked : ${letter.unlockYear}/${letter.unlockMonth}/${letter.unlockDate}`,
          sender: `from : ${letter.sender}`,
          content: "You can't read this letter yet~~~!",
          color: "#93BA7B",
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
    const unlockDate = new Date(
      letter.unlockYear,
      letter.unlockMonth - 1,
      letter.unlockDate
    );
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
        className="mySwiper"
        navigation={true}
      >
        {letters.length &&
          letters.map((letter) => (
            <SwiperSlide
              key={letter.id}
              onClick={!isGuest ? () => handleSlideClick(letter) : undefined}
              className={!isDatePassed(letter) ? "" : "locked-on"}
            >
              <div className="date-div">
                {`Unlock: ${letter.unlockYear}년 ${letter.unlockMonth}월 ${letter.unlockDate}일`}
              </div>
              <div className="sender-div">{`From .. ${letter.sender}`}</div>
            </SwiperSlide>
          ))}
      </Swiper>

      {modalVisible && (
        <div className={`modal ${modalVisible ? "visible" : ""}`}>
          <div
            className="modal-content"
            style={{ backgroundColor: modalContent.color }}
          >
            <div>{modalContent.unlockDate}</div>
            <div className="modal-sender">{modalContent.sender}</div>
            <div className="modal-content-div">{modalContent.content}</div>
            <OkButton variant="contained" size="small" onClick={closeModal}>
              닫기
            </OkButton>
          </div>
        </div>
      )}
    </div>
  );
}
export { LetterCarousel };
export type { LetterInterface };
