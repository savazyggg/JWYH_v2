import styled from "@emotion/styled";

interface LetterFormProps {
  value: any;
  onChange: any;
}
const LetterForm = (props: LetterFormProps) => {
  const { value, onChange } = props;
  return <Textarea onChange={onChange} value={value}></Textarea>;
};

export default LetterForm;

const Textarea = styled.textarea`
  visibility: visible;
  font-size: 20px;
  background-color: transparent;
  margin-top: 80px;
  width: 700px;
  height: 60vh;
  color: black;
  z-index: 16;
  border: none;
  :focus-visible {
    outline: 0px;
  }
`;
