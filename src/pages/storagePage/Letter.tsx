import { useState } from "react";
import "./letter.css";
import { Button } from "@mui/material";
import axios from "axios";
//리코일
import { useRecoilState } from "recoil";
import { forceReRender } from "@storybook/react";
//리코일
interface LetterCardProps {
  id: number;
  content: string;
  sender: string;
  unlockDate: string;
  color: string;
  unlockYear: string;
  unlockMonth: string;
  imgSrc: string;
}
// const Button = muiStyled(Button)({
// backgroundColor: "#93BA7B",
// "&:hover": {
// backgroundColor: "#76ac56",
// },
// });
import {
  isLoginedState,
  jwtStringState,
  uniqueIdState,
  userIdState,
  nickNameState,
} from "../../recoilStore";
const Letter: React.FC<LetterCardProps> = ({
  id,
  content,
  sender,
  color,
  unlockDate,
  unlockYear,
  unlockMonth,
  imgSrc,
}) => {
  const [recoilUserId, _setRecoilUserId] = useRecoilState(userIdState);
  const [modalVisible, setModalVisible] = useState(false);
  const [recoilJwtString, _setRecoilJwtString] = useRecoilState(jwtStringState);
  const closeModal = () => {
    setModalVisible(false);
    console.log("여기 들어오긴 했음");
  };
  const deleteLetter = () => {
    console.log(Letter);
    axios
      .delete(
        `https://kdt-sw-4-team14.elicecoding.com/api/letter/${recoilUserId}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + recoilJwtString,
          },
        }
      )
      .then((response) => {
        console.log(response);
        // console.log("삭제 성공" + response.message);
        alert("삭제 성공했습니다!");
        setModalVisible(false);
        window.location.reload();
      });
  };
  return (
    <div
      className="mybox"
      style={{ backgroundColor: color }}
      onClick={() => setModalVisible(true)}
    >
      <img src={imgSrc} alt="" />
      <span>
        {unlockYear}-{unlockMonth}-{unlockDate}
      </span>
      <br />
      <h2>{sender}</h2>
      {modalVisible && (
        <div className={`modal ${modalVisible ? "visible" : ""}`}>
          <div className="modal-content" style={{ backgroundColor: color }}>
            <div>
              {unlockYear}-{unlockMonth}-{unlockDate}
            </div>
            <div className="modal-sender">{sender}</div>
            <div
              className="modal-content-div"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            <Button
              variant="contained"
              size="small"
              style={{ marginRight: "80px", backgroundColor: "#DE0044" }}
              onClick={(e: any) => {
                e.stopPropagation();
                deleteLetter();
              }}
            >
              삭제
            </Button>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#93BA7B" }}
              onClick={(e: any) => {
                e.stopPropagation();
                closeModal();
                forceReRender();
              }}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Letter;
