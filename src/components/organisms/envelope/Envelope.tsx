import "./envelope.css";
import { styled as muiStyled } from "@mui/system";
import { Button } from "@mui/material";
import "../../../pages/mainPage/LetterCarousel.css";

interface EnvelopeProps {
  modalContent: any;
  closeModal: () => void;
}
const Envelope = (props: EnvelopeProps) => {
  const { modalContent, closeModal } = props;
  const OkButton = muiStyled(Button)({
    backgroundColor: "#93BA7B",
    "&:hover": {
      backgroundColor: "#76ac56",
    },
  });
  return (
    <>
      <div className="envelope envelopeLetterCarousel ">
        <div className="cover top  loopLetterAnimation"></div>
        <div className="cover bottom right"></div>
        <div className="cover left"></div>
        <div className="introLetter loopPartOutNInAnimation "></div>
        <div
          className="introLetter enlargeLetter"
          style={{ backgroundColor: modalContent.color }}
        >
          <div>{modalContent.unlockDate}</div>
          <div className="modal-sender">{`From .. ${modalContent.sender}`}</div>
          <div
            className="modal-content-div"
            dangerouslySetInnerHTML={{ __html: modalContent.content }}
          ></div>
          <OkButton variant="contained" size="small" onClick={closeModal}>
            닫기
          </OkButton>
        </div>
      </div>
    </>
  );
};
export default Envelope;
