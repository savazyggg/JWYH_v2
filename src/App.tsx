import { Routes, Route } from "react-router-dom";
import IntroPage from "./pages/introPage/IntroPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
    </Routes>
  );
}

export default App;
