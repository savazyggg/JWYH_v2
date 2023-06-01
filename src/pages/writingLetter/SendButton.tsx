import styled from "@emotion/styled";

const SendButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
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
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Button>
  );
};

export default SendButton;

const Button = styled.button`
  margin-top: 10px;
  border-radius: 13px;
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
