import styles from "./LabelElement.module.css";
import { getTextColor } from "../../utils/colorUtils";
import AddLabel from "./AddLabel";
import { useState } from "react";
import { API_URL } from "../../constants/link";

function LabelElement({
  labelId,
  labelName,
  labelDescription,
  labelColor,
  setAddLabel,
}) {
  const [isLabelEditMode, setIsLabelEditMode] = useState(false);
  const handleDelete = () => {
    if (confirm("해당 레이블을 삭제하시겠습니까?")) {
    }
    fetch(`${API_URL}/api/labels/${labelId}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        const text = await res.text();
        const data = text ? JSON.parse(text) : { message: "삭제되었습니다." };
        console.log("서버 응답:", data);
      })
      .catch((error) => console.error("에러:", error));
  };

  return (
    <>
      {isLabelEditMode ? (
        <AddLabel
          labelId={labelId}
          labelName={labelName}
          labelDescription={labelDescription}
          labelColor={labelColor}
          setAddLabel={setAddLabel}
          isLabelEditMode={isLabelEditMode}
          setIsLabelEditMode={setIsLabelEditMode}
        />
      ) : (
        <div className={styles.labelContent}>
          <div className={styles.labelName}>
            <span
              className={styles.labelColorBox}
              style={{
                backgroundColor: `${labelColor}`,
                color: getTextColor(`${labelColor}`),
              }}
            >
              {labelName}
            </span>
          </div>
          <div className={styles.labelDescription}>{labelDescription}</div>
          <div className={styles.labelButtons}>
            <button
              className={styles.editButton}
              onClick={() => setIsLabelEditMode(true)}
            >
              <span className={styles.editIcon} />
              <span>편집</span>
            </button>
            <button className={styles.deleteButton} onClick={handleDelete}>
              <span className={styles.deleteIcon} />
              <span>삭제</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LabelElement;
