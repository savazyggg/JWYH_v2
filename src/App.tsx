import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Intro from "./pages/intro/Intro";
import WritingLetter from "./pages/writingLetter/WritingLetter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/writing" element={<WritingLetter />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
