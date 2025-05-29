import styles from "./LabelPage.module.css";
import AddLabel from "../components/common/AddLabel";
import { useEffect, useState } from "react";
import LabelElement from "../components/common/LabelElement";
import { API_URL } from "../constants/link";

function LabelPage({ labelCount, setLabelCount, addLabel, setAddLabel }) {
  const [labelsData, setLabelsData] = useState([]);
  const [reload, setReload] = useState(false);

  // TODO GET /api/labels 요청 후 응답받은 레이블 데이터를 적용할 예정
  useEffect(() => {
    fetch(`${API_URL}/api/labels`)
      .then((response) => response.json())
      .then((res) => {
        setLabelsData(res.data.labels);
      })
      .catch((error) => {
        console.error("Error fetching labels:", error);
      });
  }, [reload]);
  return (
    <>
      {addLabel && (
        <AddLabel
          setAddLabel={setAddLabel}
          setLabelCount={setLabelCount}
          reload={reload}
          setReload={setReload}
        />
      )}
      <div className={styles.labelPage}>
        <div className={styles.labelPageHeader}>{labelCount}개의 레이블</div>

        {labelsData.map((label) => (
          <LabelElement
            key={label.id}
            labelId={label.id}
            labelName={label.name}
            labelDescription={label.description}
            labelColor={label.color}
            setAddLabel={setAddLabel}
            setLabelCount={setLabelCount}
          />
        ))}
      </div>
    </>
  );
}

export default LabelPage;
