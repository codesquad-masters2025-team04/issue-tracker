import styles from "./LabelAndMilestone.module.css";

function LabelAndMilestone({
  labelCount,
  milestoneCount,
  isLabelPage,
  setIsLabelPage,
  isMilestonePage,
  setIsMilestonePage,
  setAddLabel,
  setAddMilestone,
}) {
  const handleLabelClick = () => {
    setIsLabelPage(true);
    setIsMilestonePage(false);
    setAddLabel(false);
    setAddMilestone(false);
  };
  const handleMilestoneClick = () => {
    setIsMilestonePage(true);
    setIsLabelPage(false);
    setAddLabel(false);
    setAddMilestone(false);
  };

  return (
    <>
      <div className={styles.labelsAndMilestones}>
        <button
          className={`${styles.labels} ${isLabelPage && styles.active}`}
          onClick={handleLabelClick}
        >
          <span className={styles.labelIcon} />
          <span>레이블({labelCount})</span>
        </button>
        <button
          className={`${styles.milestones} ${isMilestonePage && styles.active}`}
          onClick={handleMilestoneClick}
        >
          <span className={styles.milestoneIcon} />
          <span>마일스톤({milestoneCount})</span>
        </button>
      </div>
    </>
  );
}

export default LabelAndMilestone;
