import { useState } from "react";
import styles from "./MilestoneElement.module.css";
import AddMilestone from "./AddMilestone";
import { API_URL } from "../../constants/link";

function MilestoneElement({
  milestone,
  addMilestone,
  setAddMilestone,
  reload,
  setReload,
  setMilestoneCount,
}) {
  const [isMilestoneEditMode, setIsMilestoneEditMode] = useState(false);

  const handleDelete = () => {
    if (!confirm("해당 마일스톤을 삭제하시겠습니까?")) return;
    fetch(`${API_URL}/api/milestones/${milestone.id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        const text = await res.text();
        const data = text ? JSON.parse(text) : { message: "삭제되었습니다." };
        console.log("서버 응답:", data);
        setReload(!reload);
        setMilestoneCount((prev) => prev - 1);
      })
      .catch((error) => console.error("에러:", error));
  };
  return (
    <>
      {isMilestoneEditMode ? (
        <AddMilestone
          milestoneId={milestone.id}
          milestoneName={milestone.name}
          milestoneDate={milestone.endDate}
          milestoneDescription={milestone.description}
          setAddMilestone={setAddMilestone}
          isMilestoneEditMode={isMilestoneEditMode}
          setIsMilestoneEditMode={setIsMilestoneEditMode}
          reload={reload}
          setReload={setReload}
        />
      ) : (
        <div key={milestone.id} className={styles.milestoneItem}>
          <div className={styles.milestoneBody}>
            <div className={styles.milestoneInfo}>
              <div className={styles.milestoneTitle}>
                <span className={styles.milestoneIcon} />
                <span className={styles.milestoneTitleText}>
                  {milestone.name}
                </span>
              </div>
              {milestone.endDate && (
                <div className={styles.milestoneDueDate}>
                  <span className={styles.calendarIcon} />
                  <span className={styles.endDateText}>
                    {milestone.endDate?.replace(/-/g, ". ")}
                  </span>
                </div>
              )}
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
              <button
                className={styles.editButton}
                onClick={() => setIsMilestoneEditMode(true)}
              >
                <span className={styles.editIcon} />
                <span className={styles.editText}>편집</span>
              </button>
              <button className={styles.deleteButton} onClick={handleDelete}>
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
      )}
    </>
  );
}

export default MilestoneElement;
