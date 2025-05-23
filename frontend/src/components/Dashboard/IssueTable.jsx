import { useEffect, useState } from "react";
import styles from "./IssueTable.module.css";
import "../../styles/tokens.css";
import { API_URL } from "../../constants/link";

import IssueList from "./IssueList";
import TableHeader from "./TableHeader";

function IssueTable({
  filterData,
  setDetailIssue,
  setDetailData,
  setIssueTitleAndId,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [issueCount, setIssueCount] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/issues/count`)
      .then((response) => response.json())
      .then((res) => {
        setIssueCount(res.data);
      })
      .catch((error) => {
        console.error("Error fetching issue count data:", error);
      });
  }, []);

  return (
    <div className={styles.issueTableContainer}>
      <div className={styles.tableHeader}>
        <TableHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          issueCount={issueCount}
          filterData={filterData}
        />
      </div>
      <div className={styles.issueListContainer}>
        <IssueList
          isOpen={isOpen}
          setDetailIssue={setDetailIssue}
          setDetailData={setDetailData}
          setIssueTitleAndId={setIssueTitleAndId}
        />
      </div>
    </div>
  );
}

export default IssueTable;
