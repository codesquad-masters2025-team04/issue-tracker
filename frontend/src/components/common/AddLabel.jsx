import { useState } from "react";
import { getTextColor } from "../../utils/colorUtils";
import styles from "./AddLabel.module.css";

function AddLabel({
  setAddLabel,
  isLabelEditMode = false,
  setIsLabelEditMode = () => {},
}) {
  const [inputLabelContent, setInputLabelContent] = useState({
    labelName: "",
    labelDescription: "",
    labelColor: "#000000",
  });

  const handleCancel = () => {
    setAddLabel(false);
    setIsLabelEditMode(!isLabelEditMode);
    setInputLabelContent({
      labelName: "",
      labelDescription: "",
      labelColor: "#000000",
    });
  };

  const handleRefresh = () => {
    setInputLabelContent((prev) => {
      return {
        ...prev,
        labelColor: "#000000",
      };
    });
  };
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
    <div
      className={`${styles.addLabelContainer} ${
        isLabelEditMode && styles.editLabelContainer
      }`}
    >
      {!isLabelEditMode ? (
        <h3 className={styles.addLabelTitle}>새로운 레이블 추가</h3>
      ) : (
        <h3 className={styles.editLabel}> 레이블 수정</h3>
      )}
      <div className={styles.addLabelForm}>
        <div className={styles.previewLabelBox}>
          <span
            className={styles.labelColorBox}
            style={{
              backgroundColor: `${inputLabelContent.labelColor}`,
              color: getTextColor(`${inputLabelContent.labelColor}`),
            }}
          >
            {inputLabelContent.labelName || "preview"}
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
              placeholder="레이블 이름을 입력하세요"
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
              placeholder="레이블에 대한 설명을 입력하세요"
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
            <span className={styles.refreshIcon} onClick={handleRefresh} />
          </div>
        </div>
      </div>
      <div className={styles.buttonsInAddLabel}>
        <button className={styles.cancelButton} onClick={handleCancel}>
          <span className={styles.cancelIcon} />
          <span className={styles.cancelText}>취소</span>
        </button>

        <button
          className={`${styles.addButton} ${
            inputLabelContent.labelName &&
            inputLabelContent.labelColor &&
            styles.active
          }`}
        >
          <span className={styles.addIcon} />
          <span className={styles.addText}>완료</span>
        </button>
      </div>
    </div>
  );
}

export default AddLabel;
