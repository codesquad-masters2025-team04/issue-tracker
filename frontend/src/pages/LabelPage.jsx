import { getTextColor } from "../utils/colorUtils";
import styles from "./LabelPage.module.css";
import AddLabel from "../components/common/AddLabel";
import { useState } from "react";

function LabelPage({ addLabel, setAddLabel }) {
  const [isLabelEditMode, setIsLabelEditMode] = useState(false);

  return (
    <>
      {addLabel && <AddLabel setAddLabel={setAddLabel} />}
      {/* TODO GET /api/labels 요청 후 응답받은 레이블 데이터를 적용할 예정 */}
      <div className={styles.labelPage}>
        <div className={styles.labelPageHeader}>3개의 레이블</div>

        {isLabelEditMode ? (
          <AddLabel
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
                  backgroundColor: "#007AFF",
                  color: getTextColor("#007AFF"),
                }}
              >
                Label
              </span>
            </div>
            <div className={styles.labelDescription}>레이블에 대한 설명</div>
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
      </div>
    </>
  );
}

export default LabelPage;
