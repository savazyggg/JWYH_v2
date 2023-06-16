import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "@emotion/styled";

interface Props {
  value: string;
  onChange: (value: string) => void;
  letterStyle: string;
}

const EditorQill: React.FC<Props> = ({ value, onChange, letterStyle }) => {
  const modules = {
    toolbar: [
      //[{ 'font': [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"],
    ],
  };

  const formats = [
    //'font',
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Quill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value || ""}
        myLetterStyle={letterStyle}
        onChange={(_content, _delta, _source, editor) =>
          onChange(editor.getHTML())
        }
      />
    </div>
  );
};

export default EditorQill;

const Quill = styled(ReactQuill)<{ myLetterStyle: string }>`
  margin-left: 25px;
  width: 95%;
  height: 90%;

  border: none;
  .ql-container {
    border: none;
  }
  .ql-toolbar {
    border: none;
  }

  .ql-editor {
    ::-webkit-scrollbar {
      width: 10px;
      background-color: ${(props) => props.myLetterStyle};
    }

    ::-webkit-scrollbar-thumb {
      background-color: #242424;
    }
  }
`;
