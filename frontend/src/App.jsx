import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/fonts.css";
import Home from "./pages/Home";
import styles from "./App.module.css";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className={styles.wrapperPadding}>
      <Routes>
        {/*  TODO 추후 로그인 페이지 추가 후 로그인 페이지로 이동하도록 수정 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/issues" element={<Home />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
