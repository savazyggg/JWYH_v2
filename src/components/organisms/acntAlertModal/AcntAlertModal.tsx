import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BottomNavigationClassKey } from "@mui/material";
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalMsg: string;
  handler: any;
}

export default function AlertModal(props: props) {
  const { isModalOpen, setIsModalOpen, modalMsg, handler } = props;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        setIsModalOpen(!isModalOpen);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalMsg}
        </Typography>
        <Button
          onClick={() => {
            handler();
            setIsModalOpen(false);
          }}
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color="error"
        >
          예
        </Button>
        <Button
          onClick={() => {
            setIsModalOpen(false);
          }}
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          아니요
        </Button>
      </Box>
    </Modal>
  );
}
