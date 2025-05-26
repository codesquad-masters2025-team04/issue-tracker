import { useState } from "react";
import IssueTabButton from "../components/common/IssueTabButton";
import styles from "../pages/MilestonePage.module.css";

function MilestonePage({ milestonesCount }) {
  const [isOpenMilestone, setIsOpenMilestone] = useState(false);
  const [closedMilestone, setClosedMilestone] = useState(0);
  const [milestoneData, setMilestoneData] = useState([
    {
      id: 1,
      title: "프로젝트 시작",
      description: "프로젝트의 초기 단계",
      endDate: "2023-12-31",
      progress: 0.0,
      openIssues: 0,
      closedIssues: 0,
    },
    {
      id: 2,
      title: "기능 개발",
      description: "주요 기능 개발 완료",
      endDate: "2024-01-15",
      progress: 25.0,
      openIssues: 3,
      closedIssues: 1,
    },
  ]);
  return (
    <div className={styles.milestoneContainer}>
      <div className={styles.milestoneHeader}>
        <IssueTabButton
          isActive={isOpenMilestone === true}
          onClick={() => setIsOpenMilestone(true)}
          iconClassName={"openIssueIcon"}
          issueName={`열린 마일스톤(${milestonesCount})`}
        />

        <IssueTabButton
          isActive={isOpenMilestone === false}
          onClick={() => setIsOpenMilestone(false)}
          iconClassName={"closedIssueIcon"}
          issueName={`닫힌 마일스톤(${closedMilestone})`}
        />
      </div>
      <div className={styles.milestoneList}>
        {milestoneData.map((milestone) => (
          <div key={milestone.id} className={styles.milestoneItem}>
            <div className={styles.milestoneBody}>
              <div className={styles.milestoneInfo}>
                <div className={styles.milestoneTitle}>
                  <span className={styles.milestoneIcon} />
                  <span className={styles.milestoneTitleText}>
                    {milestone.title}
                  </span>
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
        ))}
      </div>
    </div>
  );
}

export default MilestonePage;
