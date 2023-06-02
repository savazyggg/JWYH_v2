import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/introPage/IntroPage";
import WritingLetter from "./pages/writingLetter/WritingLetter";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/writingletter" element={<WritingLetter />} />
      {/* <Route Path="/letterspace" element={<LetterSpace/>} /> */}
    </Routes>
  );
}

export default App;
