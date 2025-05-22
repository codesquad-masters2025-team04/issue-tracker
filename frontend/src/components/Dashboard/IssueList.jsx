import styles from "./IssueList.module.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/link";

const getTimeAgo = (compareTime) => {
  const now = new Date();
  const past = new Date(compareTime);
  const diff = Math.floor((now - past) / 1000); // 초 단위 차이

  if (diff < 60) {
    return "방금 전";
  }

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days}일 전`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}개월 전`;
  }

  const years = Math.floor(months / 12);
  return `${years}년 전`;
};

const getIssueIconByStatus = (status) => {
  // 이슈 상태에 따라 아이콘을 반환하는 함수
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
}) {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/issues?is_open=${isOpen}`)
      .then((response) => response.json())
      .then((res) => {
        setIssues(res.data.issues || []);
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
      {issues.map((issue) => (
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
    </div>
  );
}

export default IssueList;
