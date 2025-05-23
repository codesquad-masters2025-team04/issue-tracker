import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

import styles from "./Comment.module.css";
import userImage from "../../assets/images/userImage.png";

function Comment({
  authorInfo,
  issueAuthorId,
  commentAuthorId,
  content,
  file,
}) {
  const userId = 1;
  const renderedContent = DOMPurify.sanitize(
    marked(content.replace(/\n/g, "  \n"))
  );

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <div className={styles.userInfo}>
          <img src={userImage} alt="사용자 이미지" />
          <span className={styles.userName}>{authorInfo.nickname}</span>
          <span className={styles.timeGap}>3분 전</span>
        </div>
        <div className={styles.labelAndButtons}>
          {issueAuthorId === Number(commentAuthorId) ? (
            <div className={styles.assigneeLabel}>작성자</div>
          ) : (
            ""
          )}

          {Number(authorInfo.id) === userId ? (
            <button className={styles.editButton}>
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
      <div
        className={styles.commentBody}
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
      {file && <img src={file} alt="첨부 파일" />}
    </div>
  );
}

export default React.memo(Comment);
