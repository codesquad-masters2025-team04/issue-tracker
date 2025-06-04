import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginInfo = {
    id: loginId,
    password: loginPassword,
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.logo} />
      <button className={styles.githubLogin}>GitHub로그인</button>
      <span className={styles.or}>or</span>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <input
            type="text"
            className={styles.inputText}
            placeholder="아이디"
            onChange={(e) => setLoginId(e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <input
            type="password"
            className={styles.inputText}
            placeholder="비밀번호"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button
          className={`${styles.submitButton} ${
            loginInfo.id && loginInfo.password ? styles.active : ""
          }`}
        >
          아이디로 로그인
        </button>
        <button className={styles.signUp} onClick={() => navigate("/signUp")}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
