import styles from "./IssueToolBar.module.css";

function IssueToolBar({ onClick }) {
  return (
    <>
      <button onClick={onClick} className={styles.writeIssueButton}>
        이슈 작성
      </button>
    </>
  );
}

export default IssueToolBar;
