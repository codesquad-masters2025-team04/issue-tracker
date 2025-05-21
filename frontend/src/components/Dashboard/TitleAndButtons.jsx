import styles from "./TitleAndButtons.module.css";

function TitleAndButtons({
  setEditIssueTitle,
  issueTitle,
  isOpenIssue,
  setIsOpenIssue,
  issueId,
}) {
  return (
    <div className={styles.titleAndButtons}>
      <div className={styles.issueTitleAndIssueId}>
        <span className={styles.issueTitle}>{issueTitle}</span>
        <span className={styles.issueId}>#{issueId}</span>
      </div>
      <div className={styles.buttonsInHeader}>
        <button
          className={styles.outLineS}
          onClick={() => setEditIssueTitle(true)}
        >
          <div className={styles.editIcon} />
          <span className={styles.buttonTitle}>제목 편집</span>
        </button>
        <button
          className={styles.outLineS}
          onClick={() => setIsOpenIssue(!isOpenIssue)} // TODO 추후 fetch요청 추가 예정
        >
          <div
            className={
              isOpenIssue ? styles.closedIssueIcon : styles.openIssueIcon
            }
          />
          <span className={styles.buttonTitle}>
            {isOpenIssue ? "이슈 닫기" : "다시 열기"}
          </span>
        </button>
      </div>
    </div>
  );
}

export default TitleAndButtons;
