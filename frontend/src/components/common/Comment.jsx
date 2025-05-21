import styles from "./Comment.module.css";
import userImage from "../../assets/images/userImage.png";

function Comment({ authorName, issueAuthorId, commentAuthorId, content }) {
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <div className={styles.userInfo}>
          <img src={userImage} alt="사용자 이미지" />
          <span className={styles.userName}>{authorName}</span>
          <span className={styles.timeGap}>3분 전</span>
        </div>
        <div className={styles.labelAndButtons}>
          {/* TODO 추후 이슈 작성자와 코멘트 작성자 값 비교 후 작성자와 같을 경우 활성화, 다를 경우 비활성화 시킬 예정 */}
          {issueAuthorId === Number(commentAuthorId) ? (
            <div className={styles.assigneeLabel}>작성자</div>
          ) : (
            ""
          )}
          <button className={styles.editButton}>
            <div className={styles.editIcon} />
            <span className={styles.editText}>편집</span>
          </button>
          <button className={styles.reactionButton}>
            <div className={styles.reactionIcon} />
            <span className={styles.reactionText}>반응</span>
          </button>
        </div>
      </div>
      <div className={styles.commentBody}>{content}</div>
    </div>
  );
}

export default Comment;
