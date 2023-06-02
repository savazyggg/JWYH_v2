import styled from "@emotion/styled";

const Input = ({
  labelName,
  required,
  type,
  placeholder,
  inputValue,
  onChange,
}) => {
  return (
    <>
      <label htmlFor={labelName}>{labelName}</label>
      <InputBox
        id={labelName}
        name={labelName}
        required={required}
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
