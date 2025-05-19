import styles from "./DetailIssue.module.css";

function DetailIssue() {
  return (
    <>
      <div className={styles.postInformation}>
        <div className={styles.titleAndButtons}>
          <div className={styles.issueTitleAndIssueId}>
            <span className={styles.issueTitle}>
              FE 이슈트래커 디자인 시스템 구현
            </span>
            <span className={styles.issueId}>#2</span>
          </div>
          <div className={styles.buttonsInHeader}>
            <button className={styles.outLineS}>
              <div className={styles.editIcon} />
              <span className={styles.buttonTitle}>제목 편집</span>
            </button>
            <button className={styles.outLineS}>
              <div className={styles.closedIssueIcon} />
              <span className={styles.buttonTitle}>이슈 닫기</span>
            </button>
          </div>
        </div>
        <div className={styles.statesInfo}>
          <div className={styles.informationTag}>
            <div className={styles.openIssueIcon} />
            <span className={styles.state}>열린 이슈</span>
          </div>
          <div className={styles.explainState}>
            <span>이 이슈가 3분 전에 samsamis9님에 의해 열렸습니다</span>
            <span>코멘트 2개</span>
          </div>
        </div>
        <div className={styles.line} />
      </div>

      <div className="comentArea">comentArea</div>
    </>
  );
}

export default DetailIssue;
