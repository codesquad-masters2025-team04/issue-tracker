import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useState } from "react";

import styles from "./Comment.module.css";
import userImage from "../../assets/images/userImage.png";
import { getTimeAgo } from "../../utils/getTimeAgo";
import CommentInput from "./CommentInput";

function Comment({
  authorInfo,
  issueAuthorId,
  commentAuthorId,
  content,
  setNewComment,
  createdAt,
  file,
  setFile,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const userId = 3;
  const renderedContent = DOMPurify.sanitize(
    marked(content.replace(/\n/g, "  \n"))
  );

  return (
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
            <button className={styles.deleteCommentButton}>
              <div className={styles.deleteIcon} />
              <span className={styles.commentButtonsText}>삭제</span>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* TODO 편집 버튼을 위한 상태처리 true,false에 따라 해당 코멘트 영역 처리 */}
      {isEditMode ? (
        <CommentInput
          newComment={content}
          setNewComment={setNewComment}
          setFile={setFile}
          file={file}
          isEditMode={isEditMode}
        />
      ) : (
        <div
          className={styles.commentBody}
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
      )}
      {file && !isEditMode && <img src={file} alt="첨부 파일" />}
    </div>
  );
}

export default React.memo(Comment);
