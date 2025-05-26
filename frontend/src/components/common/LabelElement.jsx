import styles from "./LabelElement.module.css";
import { getTextColor } from "../../utils/colorUtils";
import AddLabel from "./AddLabel";
import { useState } from "react";

function LabelElement({
  labelId,
  labelName,
  labelDescription,
  labelColor,
  setAddLabel,
}) {
  const [isLabelEditMode, setIsLabelEditMode] = useState(false);

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
            <button className={styles.deleteButton}>
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
