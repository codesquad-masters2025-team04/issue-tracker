import styles from "./LabelPage.module.css";
import AddLabel from "../components/common/AddLabel";
import { useEffect, useState } from "react";
import LabelElement from "../components/common/LabelElement";
import { API_URL } from "../constants/link";

function LabelPage({ addLabel, setAddLabel }) {
  const [labelsData, setLabelsData] = useState([
    {
      id: 1,
      name: "버그",
      description: "버그에 대한 설명",
      color: "#FF0000",
    },
    {
      id: 2,
      name: "기능 개선",
      description: "기능 개선에 대한 설명",
      color: "#00FF00",
    },
    {
      id: 3,
      name: "문서화",
      description: "문서화에 대한 설명",
      color: "#0000FF",
    },
  ]);
  // TODO GET /api/labels 요청 후 응답받은 레이블 데이터를 적용할 예정
  // useEffect(() => {
  //   fetch(`${API_URL}/api/labels`)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       setLabelsData(res.data.labels);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching labels:", error);
  //     });
  // }, [labelsData]);
  return (
    <>
      {addLabel && <AddLabel setAddLabel={setAddLabel} />}
      {/* TODO GET /api/labels 요청 후 응답받은 레이블 데이터를 적용할 예정 */}
      <div className={styles.labelPage}>
        <div className={styles.labelPageHeader}>
          {labelsData.length}개의 레이블
        </div>

        {labelsData.map((label) => (
          <LabelElement
            key={label.id}
            labelId={label.id}
            labelName={label.name}
            labelDescription={label.description}
            labelColor={label.color}
            setAddLabel={setAddLabel}
          />
        ))}
      </div>
    </>
  );
}

export default LabelPage;
