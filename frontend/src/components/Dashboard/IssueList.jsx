import styles from "./IssueList.module.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/link";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { getTextColor } from "../../utils/colorUtils";
import { useNavigate, useLocation } from "react-router-dom";

const getIssueIconByStatus = (status) => {
  if (status) {
    return <div className={styles.openIssueIcon}></div>;
  } else {
    return <div className={styles.closedIssueIcon}></div>;
  }
};

function IssueList({
  isOpen,
  setDetailIssue,
  setDetailData,
  setIssueTitleAndId,
  issues,
  setIssues,
  setPageData,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParam = `state:${isOpen}`;

    fetch(`${API_URL}/api/issues?q=${queryParam}&page=0&size=10`)
      .then((response) => response.json())
      .then((res) => {
        setIssues(res.data.issues || []);
        setPageData({ page: res.data.page, totalPages: res.data.totalPages });

        const params = new URLSearchParams(location.search);
        params.set("q", queryParam);
        navigate(`${location.pathname}?${params.toString()}`);
      })
      .catch((error) => {
        console.error("Error fetching issue data:", error);
      });
  }, [isOpen]);

  const handleClickIssueTitle = (issue, setDetailIssue, setIssueTitleAndId) => {
    setIssueTitleAndId({
      title: issue.title,
      id: issue.id,
      nickname: issue.author.nickname,
      authorId: issue.author.id,
      labels: issue.labels,
      milestone: issue.milestone,
    });

    fetch(`${API_URL}/api/issues/${issue.id}`)
      .then((response) => response.json())
      .then((res) => {
        setDetailData(res.data);
        setDetailIssue(true);
      })
      .catch((error) => {
        console.error("Error fetching issue detail data:", error);
      });
  };

  return (
    <div className={styles.issueListContainer}>
      {Array.isArray(issues) &&
        issues.map((issue) => (
          <div className={styles.IssueContainer} key={issue.id}>
            <div className={styles.mainInfo}>
              <button className={styles.checkbox} />
              <div className={styles.issueItem}>
                <div className={styles.issueDetails}>
                  {getIssueIconByStatus(isOpen)}
                  <div
                    className={styles.issueTitle}
                    onClick={() =>
                      handleClickIssueTitle(
                        issue,
                        setDetailIssue,
                        setIssueTitleAndId
                      )
                    }
                  >
                    {issue.title}
                  </div>

                  {issue.labels &&
                    issue.labels.map((label) => (
                      <div
                        className={styles.issueLabel}
                        key={label.id}
                        style={{
                          backgroundColor: label.color,
                          color: getTextColor(label.color),
                          marginRight: "4px",
                        }}
                      >
                        {label.name}
                      </div>
                    ))}
                </div>
                <div className={styles.issueMetaInfo}>
                  <div>#{issue.id}</div>
                  <div>
                    {getTimeAgo(issue.createdAt)}, {issue.author.nickname}
                    {"님에 의해 작성되었습니다"}
                  </div>
                  <div className={styles.milestone}>
                    {issue.milestone.title !== null && (
                      <>
                        <div className={styles.milestoneIcon} alt="milestone" />
                        <div>{issue.milestone.title}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.userImage} />
          </div>
        ))}
      {issues.length === 0 && (
        <div className={`${styles.IssueContainer} ${styles.noIssue}`}>
          등록된 이슈가 없습니다.
        </div>
      )}
    </div>
  );
}

export default IssueList;
