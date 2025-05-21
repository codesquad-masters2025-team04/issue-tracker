import { useRef } from "react";
import styles from "./CommentInput.module.css";

function CommentInput() {
  const fileInputRef = useRef(null);

  const handleAttachClick = () => {
    fileInputRef.current.click(); // 숨겨진 파일 input 클릭
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("선택한 파일:", file.name);
      // TODO 추후 파일 업로드 로직 추가 예정
    }
  };

  return (
    <div className={styles.wrapper}>
      <textarea className={styles.textarea} placeholder="코멘트를 입력하세요" />
      <div className={styles.footer}>
        <div className={styles.attach} onClick={handleAttachClick}>
          <span className={styles.fileIcon} />
          <span className={styles.fileText}>파일 첨부하기</span>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default CommentInput;
