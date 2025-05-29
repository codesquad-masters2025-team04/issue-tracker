import { useState, useEffect } from "react";
import IssueTabButton from "../components/common/IssueTabButton";
import styles from "../pages/MilestonePage.module.css";
import MilestoneElement from "../components/common/MilestoneElement";
import AddMilestone from "../components/common/AddMilestone";
import { API_URL } from "../constants/link";

function MilestonePage({ milestonesCount, addMilestone, setAddMilestone }) {
  const [isOpen, setIsOpen] = useState(true);
  const [closedMilestone, setClosedMilestone] = useState(0);
  const [milestoneData, setMilestoneData] = useState([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/milestones?isOpen=${isOpen}`)
      .then((response) => response.json())
      .then((res) => {
        setMilestoneData(res.data.milestones);
      })
      .catch((error) => {
        console.error("Error fetching milestones:", error);
      });
  }, [isOpen, reload]);

  return (
    <>
      {addMilestone && (
        <AddMilestone
          setAddMilestone={setAddMilestone}
          reload={reload}
          setReload={setReload}
        />
      )}
      <div className={styles.milestoneContainer}>
        <div className={styles.milestoneHeader}>
          <IssueTabButton
            isActive={isOpen === true}
            onClick={() => setIsOpen(true)}
            iconClassName={"openIssueIcon"}
            issueName={`열린 마일스톤(${milestonesCount})`}
          />

          <IssueTabButton
            isActive={isOpen === false}
            onClick={() => setIsOpen(false)}
            iconClassName={"closedIssueIcon"}
            issueName={`닫힌 마일스톤(${closedMilestone})`}
          />
        </div>
        <div className={styles.milestoneList}>
          {milestoneData.map((milestone) => (
            <MilestoneElement
              key={milestone.id}
              milestone={milestone}
              addMilestone={addMilestone}
              setAddMilestone={setAddMilestone}
              reload={reload}
              setReload={setReload}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MilestonePage;
