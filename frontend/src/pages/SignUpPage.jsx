import styles from "./SignUpPage.module.css";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

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
          />
        </div>
        <div className={styles.input}>
          <input
            type="password"
            className={styles.inputText}
            placeholder="비밀번호"
          />
        </div>
        <div className={styles.input}>
          <input
            type="text"
            className={styles.inputText}
            placeholder="닉네임"
          />
        </div>
        <button className={styles.submitButton}>회원 가입 완료</button>
      </div>
    </div>
  );
}

export default SignUpPage;
