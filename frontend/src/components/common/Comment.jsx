import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useState } from "react";

import styles from "./Comment.module.css";
import userImage from "../../assets/images/userImage.png";
import { getTimeAgo } from "../../utils/getTimeAgo";
import CommentInput from "./CommentInput";
import { API_URL } from "../../constants/link";

function Comment({
  commentId,
  authorInfo,
  issueId = -1,
  issueAuthorId,
  commentAuthorId,
  content,
  createdAt,
  file,
  setFetchTrigger,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [tempComment, setTempComment] = useState(content);
  const [editCommentFile, setEditCommentFile] = useState([]);
  const userId = 3;
  const renderedContent = DOMPurify.sanitize(
    marked(tempComment.replace(/\n/g, "  \n"))
  );

  // TODO 추후 서버 연결 완료 후 주석 제거 예정
  const handleSaveComment = () => {
    if (tempComment === content) {
      setIsEditMode(!isEditMode);
      return;
    }
    const formData = new FormData();
    const updatedComment = {
      content: tempComment,
    };

    formData.append(
      "comment",
      new Blob([JSON.stringify(updatedComment)], {
        type: "application/json",
      })
    );

    if (editCommentFile?.length)
      editCommentFile.forEach((f) => formData.append("file", f));

    fetch(`${API_URL}/api/issues/comments/${commentId}`, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("댓글 수정 실패");
        }
        return res.json();
      })
      .then((data) => {
        console.log("댓글 수정 성공:", data);
        setIsEditMode(false);
        setFetchTrigger((prev) => prev + 1);
      })
      .catch((err) => {
        console.error("댓글 수정 중 오류 발생:", err);
      });
  };

  const handleDeleteComment = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      fetch(`${API_URL}/api/issues/comments/${issueId}/${commentId}`, {
        method: "DELETE",
      })
        .then(async (res) => {
          const text = await res.text();
          const data = text ? JSON.parse(text) : { message: "삭제되었습니다." };
          console.log("서버 응답:", data);
          setFetchTrigger((prev) => prev + 1);
        })
        .catch((err) => console.error("에러:", err));
    }
  };

  return (
    <>
      <div className={`${!isEditMode ? styles.comment : styles.editComment}`}>
        <div className={styles.commentHeader}>
          <div className={styles.userInfo}>
            <img src={userImage} alt="사용자 이미지" />
            <span className={styles.userName}>{authorInfo.nickname}</span>
            <span className={styles.timeGap}>{getTimeAgo(createdAt)}</span>
          </div>
          <div className={styles.labelAndButtons}>
            {issueAuthorId === Number(commentAuthorId) ? (
              <div className={styles.assigneeLabel}>작성자</div>
            ) : (
              ""
            )}

            {Number(authorInfo.id) === userId ? (
              <button
                className={styles.editButton}
                onClick={() => setIsEditMode(!isEditMode)}
              >
                <div className={styles.editIcon} />
                <span className={styles.commentButtonsText}>편집</span>
              </button>
            ) : (
              ""
            )}
            <button className={styles.reactionButton}>
              <div className={styles.reactionIcon} />
              <span className={styles.commentButtonsText}>반응</span>
            </button>

            {Number(authorInfo.id) === userId ? (
              <button
                className={styles.deleteCommentButton}
                onClick={handleDeleteComment}
              >
                <div className={styles.deleteIcon} />
                <span className={styles.commentButtonsText}>삭제</span>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        {isEditMode ? (
          <CommentInput
            newComment={tempComment}
            setNewComment={setTempComment}
            setEditCommentFile={setEditCommentFile}
            editCommentFile={editCommentFile}
            isEditMode={isEditMode}
          />
        ) : (
          <div className={styles.commentBody}>
            <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
            {file && <img src={file} alt="첨부 파일" />}
          </div>
        )}
      </div>
      {isEditMode && (
        <div className={styles.editButtons}>
          {/* TODO outlineS, containedS 공통 컴포넌트로 추후 수정 예정 */}
          <button
            className={styles.cancelButton}
            onClick={() => {
              setIsEditMode(false);
              setTempComment(content);
            }}
          >
            <span className={styles.cancelIcon} />
            <span className={styles.cancelButtonText}>편집 취소</span>
          </button>
          <button
            className={`${styles.saveButton} ${
              content !== tempComment ? styles.saveButtonActive : ""
            }`}
            onClick={handleSaveComment}
          >
            <span className={styles.saveEditIcon} />
            <span className={styles.saveButtonText}>편집 완료</span>
          </button>
        </div>
      )}
    </>
  );
}

export default React.memo(Comment);
