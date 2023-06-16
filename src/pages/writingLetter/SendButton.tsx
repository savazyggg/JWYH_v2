import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccesSending from "./SuccesSending";
import { useRecoilValue } from "recoil";
import { uniqueIdState } from "../../recoilStore";

interface Props {
  type: "button";
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<string>;
  onSuccessSendingStatus: boolean;
}

const SendButton: React.FC<Props> = ({
  type,
  onClick,
  onSuccessSendingStatus,
}) => {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const onHandleOpen = () => onSuccessSendingStatus && setOpen(true);
  const _userId: string = useRecoilValue(uniqueIdState);
  const onHandleClose = () => {
    setOpen(false);
    nav(`/main/${_userId}`);
  };

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick(e);
    onHandleOpen();
  };

  useEffect(() => {
    onSuccessSendingStatus && setOpen(true);
  }, [onSuccessSendingStatus]);
  return (
    <>
      <Button type={type} onClick={onClickHandler}>
        <span>
          편지 보내기
          {/* <svg
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
          </svg> */}
        </span>
      </Button>

      <SuccesSending open={open} onClose={onHandleClose} userId={_userId} />
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
  cursor: pointer;
  line-height: 50px;

  &:hover {
    background-color: #bed7a9;
  }
  span {
    margin-right: 7px;
    font-weight: 600;
  }
`;
