import styles from "./LoginPage.module.css";

function LoginPage() {
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
          />
        </div>
        <div className={styles.input}>
          <input
            type="password"
            className={styles.inputText}
            placeholder="비밀번호"
          />
        </div>
        <button className={styles.submitButton}>아이디로 로그인</button>
        <div className={styles.signUp}>회원가입</div>
      </div>
    </div>
  );
}

export default LoginPage;
