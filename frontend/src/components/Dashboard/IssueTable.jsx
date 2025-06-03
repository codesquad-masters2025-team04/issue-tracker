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
  queryString,
  setQueryString,
}) {
  const [pageGroup, setPageGroup] = useState(0);
  const PAGE_GROUP_SIZE = 5;

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
        {pageGroup > 0 && (
          <button
            className={styles.arrowButton}
            onClick={() => {
              const newGroup = pageGroup - 1;
              const newPage = (newGroup + 1) * PAGE_GROUP_SIZE;
              setPageGroup(newGroup);
              handlePageChange(newPage);
            }}
          >
            &lt;
          </button>
        )}
        {Array(PAGE_GROUP_SIZE)
          .fill()
          .map((_, index) => {
            const pageNumber = pageGroup * PAGE_GROUP_SIZE + index + 1;
            if (pageNumber > pageData.totalPages) return null;
            return (
              <button
                key={pageNumber}
                className={`${styles.pagenationButton} ${
                  pageData.page + 1 === pageNumber ? styles.active : ""
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        {(pageGroup + 1) * PAGE_GROUP_SIZE < pageData.totalPages && (
          <button
            className={styles.arrowButton}
            onClick={() => {
              const nextGroup = pageGroup + 1;
              setPageGroup(nextGroup);
              const nextPage = nextGroup * PAGE_GROUP_SIZE + 1;
              handlePageChange(nextPage);
            }}
          >
            &gt;
          </button>
        )}
      </div>
    </>
  );
}

export default IssueTable;
