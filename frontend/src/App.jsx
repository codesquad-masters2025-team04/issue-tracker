import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/fonts.css";
import Home from "./pages/Home";
import styles from "./App.module.css";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className={styles.wrapperPadding}>
      <Routes>
        {/*  TODO 추후 로그인 페이지 추가 후 로그인 페이지로 이동하도록 수정 */}
        <Route path="/" element={<Navigate to="/issues" />} />
        <Route path="/issues" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
