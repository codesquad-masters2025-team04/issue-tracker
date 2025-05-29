import { useEffect, useState } from "react";
import styles from "./DetailIssue.module.css";
import FilterBox from "../common/FilterBox";
import useFilterBox from "../../hooks/useFilterBox";
import Comment from "../common/Comment";
import TitleAndButtons from "./TitleAndButtons";
import TitleEditor from "../common/TitleEditor";
import { API_URL } from "../../constants/link";
import { getTimeAgo } from "../../utils/getTimeAgo";
import CommentInput from "../common/CommentInput";

function DetailIssue({
  filterData,
  detailData,
  issueTitleAndId,
  setDetailIssue,
}) {
  // TODO 추후 서버에서 받아온 데이터를 기반으로 필터박스의 옵션을 설정할 예정
  // labels, milestone은 적용 완료 => assignee 추후 적용 예정
  const { selectedFilters, activeFilter, toggleFilter, selectOption } =
    useFilterBox({
      담당자: [],
      레이블: issueTitleAndId.labels || [],
      마일스톤: issueTitleAndId.milestone || null,
    });
  const [editIssueTitle, setEditIssueTitle] = useState(false);
  const [issueTitle, setIssueTitle] = useState(issueTitleAndId.title);
  const [isOpenIssue, setIsOpenIssue] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(detailData.comments);
  const [file, setFile] = useState([]);
  const [fatchTrigger, setFetchTrigger] = useState(0);
  const [commentSize, setCommentSize] = useState(detailData.commentSize);

  useEffect(() => {
    fetch(`${API_URL}/api/issues/${issueTitleAndId.id}`)
      .then((response) => response.json())
      .then((res) => {
        setComments(res.data.comments);
        setCommentSize(res.data.commentSize);
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
        setFile([]);
      })
      .catch((err) => console.error("에러:", err));
  };

  const handleDeleteIssue = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      fetch(`${API_URL}/api/issues/${issueTitleAndId.id}`, {
        method: "DELETE",
      })
        .then(async (res) => {
          const text = await res.text();
          const data = text ? JSON.parse(text) : { message: "삭제되었습니다." };
          console.log("서버 응답:", data);
          setDetailIssue(false);
        })
        .catch((err) => console.error("에러:", err));
    }
  };
  return (
    <>
      <div className={styles.postInformation}>
        {editIssueTitle ? (
          <TitleEditor
            setEditIssueTitle={setEditIssueTitle}
            issueTitle={issueTitle}
            setIssueTitle={setIssueTitle}
            // issueId={issueTitleAndId.id}
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
              이 이슈가 {getTimeAgo(detailData.createdAt)}에{" "}
              {issueTitleAndId.nickname}님에 의해{" "}
              {isOpenIssue ? "열렸습니다" : "닫혔습니다"}
            </span>
            <span>∙</span>
            <span>코멘트 {commentSize}개</span>
          </div>
        </div>
        <div className={styles.line} />
      </div>

      <div className={styles.commentsAreaAndFilterBox}>
        <div className={styles.commentsArea}>
          <Comment
            commentId={issueTitleAndId.id}
            authorInfo={issueTitleAndId}
            issueAuthorId={issueTitleAndId.authorId}
            commentAuthorId={issueTitleAndId.authorId}
            content={detailData.content}
            createdAt={detailData.createdAt}
            file={detailData.contentFileUrl ? detailData.contentFileUrl : ""}
            setFile={setFile}
            setFetchTrigger={setFetchTrigger}
          />
          {comments.map((comment) => (
            <Comment
              key={comment.commentId}
              commentId={comment.commentId}
              authorInfo={comment.author}
              issueId={issueTitleAndId.id}
              issueAuthorId={issueTitleAndId.authorId}
              commentAuthorId={comment.author?.id}
              content={comment.content}
              createdAt={comment.createdAt}
              file={comment.fileUrl ? comment.fileUrl : ""}
              setFile={setFile}
              setFetchTrigger={setFetchTrigger}
            />
          ))}

          <CommentInput
            newComment={newComment}
            setNewComment={setNewComment}
            setFile={setFile}
            file={file}
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
          <button className={styles.issueDelete} onClick={handleDeleteIssue}>
            <div className={styles.deleteIcon} />
            <span className={styles.buttonTitle}>이슈 삭제</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailIssue;
