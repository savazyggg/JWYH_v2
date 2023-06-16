import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

interface SuccesSendingProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

const SuccesSending = ({ open, onClose, userId }: SuccesSendingProps) => {
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            편지보내기 성공
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Link to={`/main/${userId}`}>
              <button>확인하기</button>
            </Link>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default SuccesSending;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#242424",
  borderRadius: "13px",
  color: "white",
};
