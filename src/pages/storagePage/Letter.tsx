import _, { useState } from "react";
import "./letter.css";
import { Button } from "@mui/material";
import { styled as muiStyled } from "@mui/system";
import axios from "axios";
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
}
// const OkButton = muiStyled(Button)({
//   backgroundColor: "#93BA7B",
//   "&:hover": {
//     backgroundColor: "#76ac56",
//   },
// });
// const CancelButton = muiStyled(Button)({
//   backgroundColor: "#93BA7B",
//   "&:hover": {
//     backgroundColor: "#76ac56",
//   },
// });

const Letter: React.FC<LetterCardProps> = ({
  id,
  content,
  sender,
  color,
  unlockDate,
  unlockYear,
  unlockMonth,
}) => {
  const [recoilUserId, setRecoilUserId] = useRecoilState(userIdState);
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
    console.log("여기 들어오긴 했음");
  };
  const deleteLetter = () => {
    console.log(Letter);
    axios
      .delete(
        `https://kdt-sw-4-team14.elicecoding.com/api/letter/${recoilUserId}/${id}`
      )
      .then((response) => {
        console.log(response);
        console.log("삭제 성공" + response.message);
        alert("삭제 성공했습니다!");
        setModalVisible(false);
      });
  };
  return (
    <div
      className="mybox"
      style={{ backgroundColor: color }}
      onClick={() => setModalVisible(true)}
    >
      <span>{sender}</span>
      <br />
      <h2>
        {unlockYear}-{unlockMonth}-{unlockDate}
      </h2>
      {modalVisible && (
        <div className={`modal ${modalVisible ? "visible" : ""}`}>
          <div className="modal-content" style={{ backgroundColor: color }}>
            <div>
              열린날짜 :{unlockYear}-{unlockMonth}-{unlockDate}
            </div>
            <div className="modal-sender">{sender}</div>
            <div
              className="modal-content-div"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            <Button
              variant="outlined"
              size="small"
              style={{ marginRight: "80px" }}
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
              className="modal-button"
              onClick={(e: any) => {
                e.stopPropagation();
                closeModal();
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
