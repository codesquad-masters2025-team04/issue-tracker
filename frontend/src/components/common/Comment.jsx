import styles from "./Comment.module.css";
import userImage from "../../assets/images/userImage.png";

function Comment() {
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <div className={styles.userInfo}>
          <img src={userImage} alt="사용자 이미지" />
          <span className={styles.userName}>samsamis9</span>
          <span className={styles.timeGap}>3분 전</span>
        </div>
        <div className={styles.labelAndButtons}>
          <div className={styles.assigneeLabel}>작성자</div>
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
      <div className={styles.commentBody}>
        이번 그룹 프로젝트에서 디자인 특징은 아래와 같습니다. <br />
        <br />
        1. 타이포그래피 시스템에 display, selected, available같은 용법을 함께
        표기함
        <br />
        2. 컬러 시스템에 라이트/다크 모드가 있음
        <br />
        3. Components 페이지에 기획서에 없는 선택 미션 두 가지가 있음
        <br />
        a. Text Input의 지우기 기능
        <br />
        b. Comment Elements의 히스토리 기능
      </div>
    </div>
  );
}

export default Comment;
