import { useState } from "react";
import styles from "./TitleEditor.module.css";
import { API_URL } from "../../constants/link";

function TitleEditor({
  setEditIssueTitle,
  issueTitle,
  setIssueTitle,
  issueId,
}) {
  const [tempTitle, setTempTitle] = useState(issueTitle);

  const handleSave = () => {
    const formData = new FormData();
    const issueData = { title: tempTitle };
    formData.append(
      "issue",
      new Blob([JSON.stringify(issueData)], { type: "application/json" })
    );

    fetch(`${API_URL}/api/issues/${issueId}`, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("서버 응답:", res);
        setIssueTitle(tempTitle);
        setEditIssueTitle(false);
      })
      .catch((err) => {
        console.error("에러:", err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <span className={styles.label}>제목</span>
        <input
          type="text"
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.buttonsInHeader}>
        <button
          className={styles.outLineS}
          onClick={() => setEditIssueTitle(false)}
        >
          <div className={styles.cancelIcon} />
          <span className={styles.buttonTitle}>편집 취소</span>
        </button>
        <button
          className={`${styles.containedS} ${
            tempTitle !== issueTitle ? styles.changeButtonStyle : ""
          }`}
          onClick={handleSave}
        >
          <div className={styles.editIcon} />
          <span className={styles.buttonTitle}>편집 완료</span>
        </button>
      </div>
    </div>
  );
}

export default TitleEditor;
