import styled from "@emotion/styled";
import { useState } from "react";
import SuccesSending from "./SuccesSending";

interface Props {
  type: "button" | "submit" | "reset" | undefined;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSuccessSendingStatus: boolean;
}

const SendButton: React.FC<Props> = ({
  type,
  onClick,
  onSuccessSendingStatus,
}) => {
  const [open, setOpen] = useState(false);
  const onHandleOpen = () => setOpen(true);
  const onHandleClose = () => setOpen(false);

  const onClickHandler = () => {
    onClick();
    onHandleOpen();
  };

  return (
    <>
      <Button type={type} onClick={onClickHandler}>
        <span>편지 보내기</span>
        <svg
          width="35"
          height="40"
          viewBox="0 0 47 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45.5001 2.19049L15.643 26.9524V39.3333L23.7858 31.9048M2.07153 18.2857L45.5001 2.10382L37.9001 38.0952L2.07153 18.2857Z"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
      {onSuccessSendingStatus && (
        <SuccesSending open={open} onClose={onHandleClose} />
      )}
    </>
  );
};

export default SendButton;

const Button = styled.button`
  border-radius: 13px;
  border: 0px;
  background-color: #93ba7b;
  width: 30%;
  height: 50px;
  color: white;
  font-size: 20px;
  line-height: 50px;
  span {
    margin-right: 7px;
    vertical-align: top;
  }
  svg {
    vertical-align: top;
  }
`;
