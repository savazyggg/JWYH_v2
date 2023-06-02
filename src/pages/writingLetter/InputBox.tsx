import styled from "@emotion/styled";

const Input = ({ type, placeholder, inputValue, onChange }) => {
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
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: #242424;
  border-radius: 0px;
  width: 31%;
  height: 50px;
  border: 0px;
  border-bottom: 1px solid white;
`;
