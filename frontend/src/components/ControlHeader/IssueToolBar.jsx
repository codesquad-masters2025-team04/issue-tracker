import styles from "./IssueToolBar.module.css";
import LabelAndMilestone from "./LabelAndMilestone";

function IssueToolBar({
  onClick,
  labelCount,
  milestoneCount,
  isLabelPage,
  setIsLabelPage,
  isMilestonePage,
  setIsMilestonePage,
  addLabel,
  setAddLabel,
  addMilestone,
  setAddMilestone,
}) {
  const handleAddClick = () => {
    if (addLabel === false) setAddLabel(true);
    if (addMilestone === false) setAddMilestone(true);
  };

  return (
    // TODO 버튼 재사용 컴포넌트로 분리 후 적용시킬 것
    <div className={styles.issueToolBar}>
      <div className={styles.issueActionsPanel}>
        <LabelAndMilestone
          labelCount={labelCount}
          milestoneCount={milestoneCount}
          isLabelPage={isLabelPage}
          setIsLabelPage={setIsLabelPage}
          isMilestonePage={isMilestonePage}
          setIsMilestonePage={setIsMilestonePage}
          setAddLabel={setAddLabel}
          setAddMilestone={setAddMilestone}
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
          className={`${styles.addLabelButton} ${
            addLabel && addMilestone && styles.disabled
          }`}
          onClick={handleAddClick}
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
