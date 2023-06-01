import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/introPage/IntroPage";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
    </Routes>
  );
}

export default App;
