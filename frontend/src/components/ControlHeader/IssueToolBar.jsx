import styles from "./IssueToolBar.module.css";
import LabelAndMilestone from "./LabelAndMilestone";

function IssueToolBar({
  onClick,
  filterData,
  isLabelPage,
  setIsLabelPage,
  IsMilestonePage,
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
          IsMilestonePage={IsMilestonePage}
          setIsMilestonePage={setIsMilestonePage}
        />
        {!isLabelPage && !IsMilestonePage && (
          <button onClick={onClick} className={styles.writeIssueButton}>
            <span className={styles.writeIssueIcon} />
            <span className={styles.writeIssueText}>이슈 작성</span>
          </button>
        )}
      </div>
      {isLabelPage || IsMilestonePage ? (
        <button
          className={`${styles.addLabelButton} ${addLabel && styles.disabled}`}
          onClick={() => setAddLabel(true)}
        >
          <span className={styles.addLabelIcon} />
          <span className={styles.addLabelText}>레이블 추가</span>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default IssueToolBar;
