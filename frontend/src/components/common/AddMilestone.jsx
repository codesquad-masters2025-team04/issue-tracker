import { useState, useEffect } from "react";
import styles from "./AddMilestone.module.css";
import { API_URL } from "../../constants/link";

function AddMilestone({
  milestoneId = null,
  milestoneName = "",
  milestoneDate = "",
  milestoneDescription = "",
  setAddMilestone,
  isMilestoneEditMode = false,
  setIsMilestoneEditMode = () => {},
  reload,
  setReload = () => {},
}) {
  const [inputMilestoneContent, setInputMilestoneContent] = useState({
    name: milestoneName,
    dueDate: milestoneDate?.replace(/\-/g, ". "),
    description: milestoneDescription,
  });
  const tempMilestoneName = milestoneName;
  const [showConfirm, setShowConfirm] = useState(false);

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
    if (!dateString) return;
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

  const handleAddMilestoneSave = () => {
    const isValid = isVaildDate(inputMilestoneContent.dueDate);
    if (!inputMilestoneContent.name) {
      setShowConfirm(true);
      return;
    }
    if (inputMilestoneContent.dueDate && !isValid) {
      setShowConfirm(true);
      return;
    }

    const milestoneData = {
      name: inputMilestoneContent.name,
      description: inputMilestoneContent.description || "",
      endDate:
        inputMilestoneContent.dueDate.replace(/\./g, "-").replace(/\s/g, "") ||
        "",
    };

    fetch(`${API_URL}/api/milestones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(milestoneData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`);
        }
        console.log("응답 데이터: 생성 완료");
        setAddMilestone(false);
        setReload(!reload);
      })
      .catch((err) => console.error(err));
  };

  const handleEditMilestoneSave = () => {
    const isValid = isVaildDate(inputMilestoneContent.dueDate);

    if (inputMilestoneContent.dueDate && !isValid) {
      confirm(
        "날짜 형식이 올바르지 않습니다. YYYY. MM. DD 형식으로 입력해주세요."
      );
      return;
    }
    fetch(`${API_URL}/api/milestones/${milestoneId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputMilestoneContent.name,
        description: inputMilestoneContent.description,
        endDate: inputMilestoneContent.dueDate
          ? inputMilestoneContent.dueDate.replace(/\s/g, "").replace(/\./g, "-")
          : "",
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`);
        }
        console.log("응답 데이터: 편집 완료");
        setIsMilestoneEditMode(false);
        setReload(!reload);
      })
      .catch((err) => console.error(err));
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
              name="name"
              value={inputMilestoneContent.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputArea}>
            <span className={styles.tag}>완료일(선택)</span>
            <input
              className={styles.inputMilestoneDate}
              type="text"
              placeholder="YYYY. MM. DD"
              name="dueDate"
              value={inputMilestoneContent.dueDate}
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
            name="description"
            value={inputMilestoneContent.description}
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
            inputMilestoneContent.name !== tempMilestoneName
              ? styles.active
              : ""
          }`}
          onClick={
            !isMilestoneEditMode
              ? handleAddMilestoneSave
              : handleEditMilestoneSave
          }
        >
          <span className={styles.saveIcon} />
          <span className={styles.buttonText}>완료</span>
        </button>
      </div>

      {showConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.confirmModal}>
            <p>입력하신 마일스톤 이름, 완료일을 다시 확인해주세요.</p>
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

export default AddMilestone;
