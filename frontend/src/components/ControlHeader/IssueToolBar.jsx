import styles from "./IssueToolBar.module.css";
import LabelAndMilestone from "./LabelAndMilestone";

function IssueToolBar({
  onClick,
  filterData,
  isLabelPage,
  setIsLabelPage,
  isMilestonePage,
  setIsMilestonePage,
  addLabel,
  setAddLabel,
}) {
  return (
    // TODO 버튼 재사용 컴포넌트로 분리 후 적용시킬 것
    <div className={styles.issueToolBar}>
      <div className={styles.issueActionsPanel}>
        <LabelAndMilestone
          filterData={filterData}
          isLabelPage={isLabelPage}
          setIsLabelPage={setIsLabelPage}
          isMilestonePage={isMilestonePage}
          setIsMilestonePage={setIsMilestonePage}
        />
        {!isLabelPage && !isMilestonePage && (
          <button onClick={onClick} className={styles.writeIssueButton}>
            <span className={styles.writeIssueIcon} />
            <span className={styles.writeIssueText}>이슈 작성</span>
          </button>
        )}
      </div>
      {isLabelPage || isMilestonePage ? (
        <button
          className={`${styles.addLabelButton} ${addLabel && styles.disabled}`}
          onClick={() => setAddLabel(true)}
        >
          <span className={styles.addLabelIcon} />
          <span className={styles.addLabelText}>
            {isLabelPage ? "레이블 추가" : "마일스톤 추가"}
          </span>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default IssueToolBar;
