import { API_URL } from "../../constants/link";
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
          onClick={() => {
            setIsOpenIssue(!isOpenIssue);
            const formData = new FormData();
            const issueStatus = { isOpen: isOpenIssue ? "false" : "true" };
            formData.append(
              "issue",
              new Blob([JSON.stringify(issueStatus)], {
                type: "application/json",
              })
            );

            fetch(`${API_URL}/api/issues/${issueId}`, {
              method: "PATCH",
              body: formData,
            })
              .then((response) => response.json())
              .then((res) => {
                console.log("서버 응답:", res);
              })
              .catch((err) => {
                console.error("에러:", err);
              });
          }}
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
