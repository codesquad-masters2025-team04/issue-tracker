import styles from "./LabelPage.module.css";
import AddLabel from "../components/common/AddLabel";
import { useState } from "react";
import LabelElement from "../components/common/LabelElement";

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
    {
      id: 4,
      name: "테스트",
      description: "테스트에 대한 설명",
      color: "#FFFF00",
    },
    {
      id: 5,
      name: "기타",
      description: "기타에 대한 설명",
      color: "#00FFFF",
    },
  ]);

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
