import { useRef, useState } from "react";
import styles from "./CommentInput.module.css";

function CommentInput({
  newComment,
  setNewComment,
  setNewCommentFile,
  newCommentFile,
  isEditMode,
  editCommentFile,
  setEditCommentFile,
  file,
}) {
  const fileInputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleAttachClick = () => {
    fileInputRef.current.click(); // 숨겨진 파일 input 클릭
  };

  const handleFileChange = (e) => {
    if (isEditMode) return setEditCommentFile(Array.from(e.target.files));
    else return setNewCommentFile(Array.from(e.target.files));
  };

  return (
    <div
      className={`${styles.wrapper} ${isFocused ? styles.focused : ""} ${
        isEditMode ? styles.editMode : styles.readMode
      }`}
    >
      <textarea
        className={styles.textarea}
        placeholder="코멘트를 입력하세요"
        value={newComment}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <div className={styles.footer}>
        <div className={styles.attach} onClick={handleAttachClick}>
          <span className={styles.fileIcon} />
          <span className={styles.fileText}>파일 첨부하기</span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          multiple
          onChange={handleFileChange}
        />
        {!isEditMode && newCommentFile.length > 0 && (
          <div className={styles.fileList}>
            {newCommentFile.map((f, index) => (
              <div key={index} className={styles.fileItem}>
                {f.name}
              </div>
            ))}
          </div>
        )}
        {isEditMode && editCommentFile.length > 0 && (
          <div className={styles.fileList}>
            {editCommentFile.map((f, index) => (
              <div key={index} className={styles.fileItem}>
                {f.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentInput;
