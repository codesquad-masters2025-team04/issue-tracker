import styles from "./LabelAndMilestone.module.css";

function LabelAndMilestone({
  filterData,
  isLabelPage,
  setIsLabelPage,
  isMilestonePage,
  setIsMilestonePage,
}) {
  const handleLabelClick = () => {
    setIsLabelPage(true);
    setIsMilestonePage(false);
  };
  const handleMilestoneClick = () => {
    setIsMilestonePage(true);
    setIsLabelPage(false);
  };

  return (
    <>
      <div className={styles.labelsAndMilestones}>
        <button
          className={`${styles.labels} ${isLabelPage && styles.active}`}
          onClick={handleLabelClick}
        >
          <span className={styles.labelIcon} />
          <span>레이블({filterData.labels.length})</span>
        </button>
        <button
          className={`${styles.milestones} ${isMilestonePage && styles.active}`}
          onClick={handleMilestoneClick}
        >
          <span className={styles.milestoneIcon} />
          <span>마일스톤({filterData.milestones.length})</span>
        </button>
      </div>
    </>
  );
}

export default LabelAndMilestone;
