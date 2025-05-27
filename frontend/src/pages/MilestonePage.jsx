import { useState } from "react";
import IssueTabButton from "../components/common/IssueTabButton";
import styles from "../pages/MilestonePage.module.css";
import MilestoneElement from "../components/common/MilestoneElement";

function MilestonePage({ milestonesCount, addMilestone, setAddMilestone }) {
  const [isOpenMilestone, setIsOpenMilestone] = useState(true);
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
          <MilestoneElement key={milestone.id} milestone={milestone} />
        ))}
      </div>
    </div>
  );
}

export default MilestonePage;
