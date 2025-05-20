import { useState } from "react";
import styles from "./TitleEditor.module.css";

function TitleEditor({ setEditIssueTitle, issueTitle, setIssueTitle }) {
  const [tempTitle, setTempTitle] = useState(issueTitle);

  // TODO 추후 수정된 제목 fetch 요청 코드 작성 예정
  const handleSave = () => {
    setIssueTitle(tempTitle);
    setEditIssueTitle(false);
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
