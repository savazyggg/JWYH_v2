import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "@emotion/styled";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const EditorQill: React.FC<Props> = ({ value, onChange }) => {
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
    <div>
      <Quill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value || ""}
        onChange={(_content, _delta, _source, editor) =>
          onChange(editor.getHTML())
        }
      />
    </div>
  );
};

export default EditorQill;

const Quill = styled(ReactQuill)`
  margin-left: 10px;
  width: 750px;
  height: 550px;

  border: none;
  .ql-container {
    border: none;
  }
  .ql-toolbar {
    border: none;
  }
`;
