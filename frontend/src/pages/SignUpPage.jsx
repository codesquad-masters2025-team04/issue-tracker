import styles from "./SignUpPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUpPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const signUpInfo = {
    id: id,
    password: password,
    nickname: nickname,
  };

  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.logo} onClick={() => navigate("/")} />
      <h1>Sign Up</h1>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <input
            type="text"
            className={styles.inputText}
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <input
            type="password"
            className={styles.inputText}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <input
            type="text"
            className={styles.inputText}
            placeholder="닉네임"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <button
          className={`${styles.submitButton} ${
            signUpInfo.id && signUpInfo.password && signUpInfo.nickname
              ? styles.active
              : ""
          }`}
        >
          회원 가입 완료
        </button>
      </div>
    </div>
  );
}

export default SignUpPage;
