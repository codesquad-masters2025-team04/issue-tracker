import styles from "./MilestoneElement.module.css";

function MilestoneElement({ milestone }) {
  return (
    <div key={milestone.id} className={styles.milestoneItem}>
      <div className={styles.milestoneBody}>
        <div className={styles.milestoneInfo}>
          <div className={styles.milestoneTitle}>
            <span className={styles.milestoneIcon} />
            <span className={styles.milestoneTitleText}>{milestone.title}</span>
          </div>
          <div className={styles.milestoneDueDate}>
            <span className={styles.calendarIcon} />
            <span className={styles.endDateText}>
              {milestone.endDate.replace(/-/g, ". ")}
            </span>
          </div>
        </div>
        <div className={styles.milestoneDescription}>
          {milestone.description}
        </div>
      </div>
      <div className={styles.milestoneMetaData}>
        <div className={styles.rightButtons}>
          <button className={styles.closedMilestoneButton}>
            <span className={styles.closedIcon} />
            <span className={styles.closedText}>닫기</span>
          </button>
          <button className={styles.editButton}>
            <span className={styles.editIcon} />
            <span className={styles.editText}>편집</span>
          </button>
          <button className={styles.deleteButton}>
            <span className={styles.deleteIcon} />
            <span className={styles.deleteText}>삭제</span>
          </button>
        </div>
        <div className={styles.progressIndicator}>
          <div className={styles.progressBar}>
            <div
              className={styles.filled}
              style={{ width: `${milestone.progress}%` }}
            />
          </div>
          <div className={styles.textRow}>
            <span>{parseInt(milestone.progress)}%</span>
            <div className={styles.meta}>
              <span>열림 이슈 {milestone.openIssues}</span>
              <span>닫힘 이슈 {milestone.closedIssues}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MilestoneElement;
