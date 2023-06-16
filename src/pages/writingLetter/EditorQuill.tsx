import ReactQuill, { Quill as QuillTest } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "@emotion/styled";
import ImageResize from "quill-image-resize-module-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  letterStyle: string;
}
QuillTest.register("modules/imageResize", ImageResize);
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
    imageResize: {
      parchment: QuillTest.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
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
