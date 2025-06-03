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
  issueCount,
  setIssueCount,
  pageData,
  setPageData,
}) {
  const [queryString, setQueryString] = useState("state:open");

  useEffect(() => {
    setQueryString(`state:${isOpen}`);
  }, [isOpen]);

  const handlePageChange = (index) => {
    fetch(`${API_URL}/api/issues?q=${queryString}&page=${index - 1}&size=10`)
      .then((res) => res.json())
      .then((res) => {
        setIssues(res.data.issues);
        setIssueCount({
          openCount: res.data.openCount,
          closeCount: res.data.closeCount,
        });
        setPageData({ page: res.data.page, totalPages: res.data.totalPages });
      })
      .catch((error) => {
        console.error("Error fetching issue data:", error);
      });
  };

  return (
    <>
      <div className={styles.issueTableContainer}>
        <div className={styles.tableHeader}>
          <TableHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            issueCount={issueCount}
            filterData={filterData}
            setIssues={setIssues}
            setIssueCount={setIssueCount}
            setPageData={setPageData}
            setQueryString={setQueryString}
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
    </>
  );
}

export default IssueTable;
