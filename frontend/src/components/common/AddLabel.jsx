import { useState } from "react";
import { getTextColor } from "../../utils/colorUtils";
import styles from "./AddLabel.module.css";

function AddLabel({ setAddLabel }) {
  const [inputLabelContent, setInputLabelContent] = useState({
    name: "document",
    description: "문서에 대한 레이블",
    color: "#000000",
  });
  return (
    <div className={styles.addLabelContainer}>
      <h3 className={styles.addLabelTitle}>새로운 레이블 추가</h3>
      <div className={styles.addLabelForm}>
        <div className={styles.previewLabelBox}>
          <span
            className={styles.labelColorBox}
            style={{
              backgroundColor: `${inputLabelContent.color}`,
              color: getTextColor(`${inputLabelContent.color}`),
            }}
          >
            {inputLabelContent.name}
          </span>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputText}>
            <span className={styles.label}>이름</span>
            <input className={styles.inputLabelName} type="text" />
          </div>
          <div className={styles.inputText}>
            <span className={styles.label}>설명(선택)</span>
            <input className={styles.inputLabelDescription} type="text" />
          </div>
          <div className={styles.inputColor}>
            <span className={styles.label}>배경 색상</span>
            <input className={styles.inputLabelColor} type="text" />
          </div>
        </div>
      </div>
      <div className={styles.buttonsInAddLabel}>
        <button
          className={styles.cancelButton}
          onClick={() => setAddLabel(false)}
        >
          <span className={styles.cancelIcon} />
          <span className={styles.cancelText}>취소</span>
        </button>

        <button className={styles.addButton}>
          <span className={styles.addIcon} />
          <span className={styles.addText}>완료</span>
        </button>
      </div>
    </div>
  );
}

export default AddLabel;
