import { useState } from "react";
import { getTextColor } from "../../utils/colorUtils";
import styles from "./AddLabel.module.css";

function AddLabel({ setAddLabel }) {
  const [inputLabelContent, setInputLabelContent] = useState({
    labelName: "미리보기",
    labelDescription: "",
    labelColor: "#000000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputLabelContent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div className={styles.addLabelContainer}>
      <h3 className={styles.addLabelTitle}>새로운 레이블 추가</h3>
      <div className={styles.addLabelForm}>
        <div className={styles.previewLabelBox}>
          <span
            className={styles.labelColorBox}
            style={{
              backgroundColor: `${inputLabelContent.labelColor}`,
              color: getTextColor(`${inputLabelContent.labelColor}`),
            }}
          >
            {inputLabelContent.labelName}
          </span>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputText}>
            <span className={styles.label}>이름</span>
            <input
              className={styles.inputLabelName}
              type="text"
              name="labelName"
              value={inputLabelContent.labelName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputText}>
            <span className={styles.label}>설명(선택)</span>
            <input
              className={styles.inputLabelDescription}
              type="text"
              name="labelDescription"
              value={inputLabelContent.labelDescription}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputColor}>
            <span className={styles.label}>배경 색상</span>
            <input
              className={styles.inputLabelColor}
              type="text"
              name="labelColor"
              value={inputLabelContent.labelColor}
              onChange={handleChange}
            />
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
