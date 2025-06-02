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
  isOpen,
  setIsOpen,
  issues,
  setIssues,
}) {
  const [issueCount, setIssueCount] = useState(0);
  const [pageData, setPageData] = useState({});

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

  const handlePageChange = (index) => {
    fetch(`${API_URL}/api/issues?q=state:${isOpen}&page=${index - 1}&size=10`)
      .then((res) => res.json())
      .then((res) => {
        setIssues(res.data.issues);
        setPageData({ page: res.data.page, totalPages: res.data.totalPages });
      })
      .catch((error) => {
        console.error("Error fetching issue data:", error);
      });
  };

  return (
    <div className={styles.issueTableContainer}>
      <div className={styles.tableHeader}>
        <TableHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          issueCount={issueCount}
          filterData={filterData}
          setIssues={setIssues}
        />
      </div>
      <div className={styles.issueListContainer}>
        <IssueList
          isOpen={isOpen}
          setDetailIssue={setDetailIssue}
          setDetailData={setDetailData}
          setIssueTitleAndId={setIssueTitleAndId}
          issues={issues}
          setIssues={setIssues}
          setPageData={setPageData}
        />
      </div>
      <div className={styles.pagenationContainer}>
        {Array(pageData.totalPages)
          .fill()
          .map((_, index) => (
            <button
              key={index}
              className={`${styles.pagenationButton} ${
                pageData.page + 1 === index + 1 && styles.active
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
}

export default IssueTable;
