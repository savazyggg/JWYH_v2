import _, { useState } from "react";
import "./letter.css";
import { Button } from "@mui/material";
import { styled as muiStyled } from "@mui/system";
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
const OkButton = muiStyled(Button)({
  backgroundColor: "#93BA7B",
  "&:hover": {
    backgroundColor: "#76ac56",
  },
});

const Letter: React.FC<LetterCardProps> = ({
  id,
  content,
  sender,
  color,
  unlockDate,
  unlockYear,
  unlockMonth,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
    console.log("여기 들어오긴 했음");
  };

  return (
    <div className="box" onClick={() => setModalVisible(true)}>
      <div className="imgBox">
        <div style={{ backgroundColor: color }} />
        <h2>{id}</h2>
      </div>
      <div className="content">
        <span>{sender}</span>
      </div>
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
            <OkButton variant="contained" size="small" onClick={closeModal}>
              닫기
            </OkButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Letter;
