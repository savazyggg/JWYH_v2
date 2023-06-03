import styled from "@emotion/styled";

interface Props {
  type: "text" | "date";
  placeholder: string;
  inputValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
//TODO 6.3 인풋 범위 좁히기 넣어야됨
const Input: React.FC<Props> = ({
  type,
  placeholder,
  inputValue,
  onChange,
}) => {
  return (
    <>
      <InputBox
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
      ></InputBox>
    </>
  );
};

export default Input;

const InputBox = styled.input`
  margin-bottom: 20px;
  background-color: #343434;
  color: white;
  width: 31%;
  height: 50px;
  border: 0px;
  border-bottom: 1px solid white;
`;
