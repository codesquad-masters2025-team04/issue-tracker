import { useEffect, useState } from "react";
import styles from "./DetailIssue.module.css";
import FilterBox from "../common/FilterBox";
import useFilterBox from "../../hooks/useFilterBox";
import Comment from "../common/Comment";
import CommentInput from "../common/CommentInput";
import TitleAndButtons from "./TitleAndButtons";
import TitleEditor from "../common/TitleEditor";
import { API_URL } from "../../constants/link";

function DetailIssue({ filterData, detailData, issueTitleAndId }) {
  // TODO 추후 서버에서 받아온 데이터를 기반으로 필터박스의 옵션을 설정할 예정
  const { selectedFilters, activeFilter, toggleFilter, selectOption } =
    useFilterBox({
      담당자: [],
      레이블: [],
      마일스톤: null,
    });
  const [editIssueTitle, setEditIssueTitle] = useState(false);
  const [issueTitle, setIssueTitle] = useState(issueTitleAndId.title);
  const [isOpenIssue, setIsOpenIssue] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(detailData.comments);
  const [file, setFile] = useState([]);
  const [fatchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/issues/${issueTitleAndId.id}`)
      .then((response) => response.json())
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching issue detail data:", error);
      });
  }, [fatchTrigger]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      content: newComment,
      issueId: issueTitleAndId.id,
      authorId: 3,
    };

    const formData = new FormData();
    formData.append(
      "comment",
      new Blob([JSON.stringify(newCommentData)], { type: "application/json" })
    );

    // TODO 추후 파일 처리까지 구현하여 POST요청 코드 작성 예정
    if (file?.length) {
      file.forEach((f) => formData.append("file", f));
    }

    fetch(`${API_URL}/api/issues/comments`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("서버 응답:", data);
        setFetchTrigger((prev) => prev + 1);
        setNewComment("");
      })
      .catch((err) => console.error("에러:", err));
  };

  return (
    <>
      <div className={styles.postInformation}>
        {editIssueTitle ? (
          <TitleEditor
            setEditIssueTitle={setEditIssueTitle}
            issueTitle={issueTitle}
            setIssueTitle={setIssueTitle}
          />
        ) : (
          <TitleAndButtons
            setEditIssueTitle={setEditIssueTitle}
            issueTitle={issueTitle}
            isOpenIssue={isOpenIssue}
            setIsOpenIssue={setIsOpenIssue}
            issueId={issueTitleAndId.id}
          />
        )}
        <div className={styles.statesInfo}>
          <div className={styles.issueStateTag}>
            <div
              className={
                isOpenIssue ? styles.openIssueIcon : styles.closedIssueIcon
              }
            />
            <span className={styles.state}>
              {isOpenIssue ? "열린 " : "닫힌 "}이슈
            </span>
          </div>
          <div className={styles.explainState}>
            <span>
              이 이슈가 3분 전에 {issueTitleAndId.nickname}님에 의해{" "}
              {isOpenIssue ? "열렸습니다" : "닫혔습니다"}
            </span>
            <span>∙</span>
            <span>코멘트 {detailData.commentSize}개</span>
          </div>
        </div>
        <div className={styles.line} />
      </div>

      <div className={styles.commentsAreaAndFilterBox}>
        <div className={styles.commentsArea}>
          <Comment
            authorInfo={issueTitleAndId}
            issueAuthorId={issueTitleAndId.authorId}
            commentAuthorId={issueTitleAndId.authorId}
            content={detailData.content}
          />
          {comments.map((comment) => (
            <Comment
              key={comment.commentId}
              authorInfo={comment.author}
              issueAuthorId={issueTitleAndId.authorId}
              commentAuthorId={comment.author?.id}
              content={comment.content}
            />
          ))}

          <CommentInput
            newComment={newComment}
            setNewComment={setNewComment}
            setFile={setFile}
          />

          <button
            className={`${styles.newCommentButton} ${
              newComment.trim() !== "" ? styles.activeButton : ""
            }`}
            onClick={handleAddComment}
          >
            <span className={styles.plusIcon} />
            <span className={styles.newCommentText}>코멘트 작성</span>
          </button>
        </div>
        <div className={styles.rightPanel}>
          <FilterBox
            activeFilter={activeFilter}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            selectOption={selectOption}
            filterData={filterData}
          />
          <button className={styles.issueDelete}>
            <div className={styles.deleteIcon} />
            <span className={styles.buttonTitle}>이슈 삭제</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailIssue;
