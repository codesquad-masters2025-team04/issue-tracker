import { useState } from "react";
import { getTextColor } from "../../utils/colorUtils";
import styles from "./AddLabel.module.css";
import { API_URL } from "../../constants/link";

function AddLabel({
  labelId = null,
  labelName = "",
  labelDescription = "",
  labelColor = "#000000",
  setAddLabel,
  isLabelEditMode = false,
  setIsLabelEditMode = () => {},
  setLabelCount,
  reload,
  setReload = () => {},
}) {
  const [inputLabelContent, setInputLabelContent] = useState({
    labelName: labelName,
    labelDescription: labelDescription,
    labelColor: labelColor,
  });
  const tempLabelName = labelName;
  const tempLabelColor = labelColor;
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCancel = () => {
    if (isLabelEditMode) setIsLabelEditMode(!isLabelEditMode);
    else setAddLabel(false);

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

  const handleAddLabelSave = () => {
    if (!inputLabelContent.labelName) {
      setShowConfirm(true);
      return;
    }
    fetch(`${API_URL}/api/labels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputLabelContent.labelName,
        description: inputLabelContent.labelDescription,
        color: inputLabelContent.labelColor,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`);
        }
        setAddLabel(false);
        setLabelCount((prev) => prev + 1);
        setReload(!reload);
      })
      .catch((err) => console.error(err));
  };

  const handleEditLabelSave = () => {
    fetch(`${API_URL}/api/labels/${labelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputLabelContent.labelName,
        description: inputLabelContent.labelDescription,
        color: inputLabelContent.labelColor,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`);
        }
        setIsLabelEditMode(false);
        setReload(!reload);
      })
      .catch((err) => console.error(err));
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
            inputLabelContent.labelName !== tempLabelName ||
            inputLabelContent.labelColor !== tempLabelColor
              ? styles.active
              : ""
          }`}
          onClick={!isLabelEditMode ? handleAddLabelSave : handleEditLabelSave}
        >
          <span className={styles.addIcon} />
          <span className={styles.addText}>완료</span>
        </button>
      </div>
      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmModal}>
            <p>레이블 이름을 다시 확인해주세요.</p>
            <button
              className={styles.modalButton}
              onClick={() => setShowConfirm(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddLabel;
