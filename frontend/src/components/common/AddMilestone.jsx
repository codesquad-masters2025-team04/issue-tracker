import { useState } from "react";
import styles from "./AddMilestone.module.css";

function AddMilestone({
  milestoneId = null,
  milestoneName = "",
  milestoneDate = "",
  milestoneDescription = "",
  setAddMilestone,
  isMilestoneEditMode = false,
  setIsMilestoneEditMode = () => {},
}) {
  const [inputMilestoneContent, setInputMilestoneContent] = useState({
    MilestoneName: milestoneName,
    MilestoneDueDate: milestoneDate.replace(/\-/g, ". "),
    MilestoneDescription: milestoneDescription,
  });
  const tempMilestoneName = milestoneName;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputMilestoneContent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCancel = () => {
    if (isMilestoneEditMode)
      return setIsMilestoneEditMode(!isMilestoneEditMode);
    setAddMilestone(false);
  };

  const isVaildDate = (dateString) => {
    const trimmedDate = dateString.replace(/\s/g, "");
    const regex = /^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])$/;
    if (!regex.test(trimmedDate)) return false;

    const [year, month, day] = trimmedDate.split(".").map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const handleSave = () => {
    const isValid = isVaildDate(inputMilestoneContent.MilestoneDueDate);

    if (!isValid) {
      confirm(
        "날짜 형식이 올바르지 않습니다. YYYY. MM. DD 형식으로 입력해주세요."
      );
      return;
    }
  };

  return (
    <div
      className={`${styles.addMilestoneContainer} ${
        isMilestoneEditMode ? styles.editMilestoneContainer : ""
      }`}
    >
      <h3 className={styles.addMilestoneTitle}>
        {!isMilestoneEditMode ? "새로운 마일스톤 추가" : "마일스톤 편집"}
      </h3>
      <div className={styles.inputFields}>
        <div className={styles.milestoneInfo}>
          <div className={styles.inputArea}>
            <span className={styles.tag}>이름</span>
            <input
              className={styles.inputMilestoneName}
              type="text"
              placeholder="마일스톤의 이름을 입력하세요"
              name="MilestoneName"
              value={inputMilestoneContent.MilestoneName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputArea}>
            <span className={styles.tag}>완료일(선택)</span>
            <input
              className={styles.inputMilestoneDate}
              type="text"
              placeholder="YYYY. MM. DD"
              name="MilestoneDueDate"
              value={inputMilestoneContent.MilestoneDueDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inputDescription}>
          <span className={styles.tag}>설명(선택)</span>
          <input
            type="text"
            className={styles.inputMilestoneDescription}
            placeholder="마일스톤에 대한 설명을 입력하세요"
            name="MilestoneDescription"
            value={inputMilestoneContent.MilestoneDescription}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.buttonsInMilestone}>
        <button className={styles.cancelButton} onClick={handleCancel}>
          <span className={styles.cancelIcon} />
          <span className={styles.buttonText}>취소</span>
        </button>
        <button
          className={`${styles.saveButton} ${
            inputMilestoneContent.MilestoneName !== tempMilestoneName
              ? styles.active
              : ""
          }`}
          onClick={handleSave}
        >
          <span className={styles.saveIcon} />
          <span className={styles.buttonText}>완료</span>
        </button>
      </div>
    </div>
  );
}

export default AddMilestone;
