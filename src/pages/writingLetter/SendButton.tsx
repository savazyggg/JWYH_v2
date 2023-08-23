import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccesSending from "./SuccesSending";
import { useRecoilValue } from "recoil";
import { uniqueIdState } from "../../recoilStore";
import { theme } from "../../common/core";

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
        <span>편지 보내기</span>
      </Button>

      <SuccesSending open={open} onClose={onHandleClose} userId={_userId} />
    </>
  );
};

export default SendButton;

const Button = styled.button`
  border-radius: 13px;
  border: 0px;
  background-color: ${theme.green};
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
