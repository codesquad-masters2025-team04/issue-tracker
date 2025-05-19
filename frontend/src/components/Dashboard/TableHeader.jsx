import { useState } from "react";
import styles from "./TableHeader.module.css";
import IssueTabButton from "../common/IssueTabButton";
import FilterTabButton from "../common/FilterTabButton";
import PopupList from "../common/PopupList";

const changeFilterName = {
  담당자: "users",
  레이블: "labels",
  마일스톤: "milestones",
  작성자: "users", // TODO 추후 담당자와 구분지을 예정
};
// TODO 추후 컴포넌트 분리 예정
function TableHeader({ isOpen, setIsOpen, issueCount, filterData }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    담당자: [],
    레이블: [],
    마일스톤: null,
    작성자: [], // 작성자도 추가
  });

  const handleFilterClick = (filterName) => {
    setActiveFilter((prev) => (prev === filterName ? null : filterName));
  };

  const handleOptionSelect = (filter, item) => {
    setSelectedFilters((prev) => {
      if (filter === "마일스톤") {
        return {
          ...prev,
          [filter]: prev[filter]?.id === item.id ? null : item,
        };
      }

      const alreadySelected = prev[filter].some((el) => el.id === item.id);
      if (alreadySelected) {
        return {
          ...prev,
          [filter]: prev[filter].filter((el) => el.id !== item.id),
        };
      }

      return {
        ...prev,
        [filter]: [...prev[filter], item],
      };
    });
    // TODO 추후 setActiveFilter(null); 을 넣을지 말지 고민해보기
  };

  return (
    <div className={styles.tableHeader}>
      <div className={styles.issueViewControls}>
        <button className={styles.checkbox} />

        <div className={styles.issueTabs}>
          <IssueTabButton
            isActive={isOpen === true}
            onClick={() => setIsOpen(true)}
            iconClassName="openIssueIcon"
            issueName={`열린 이슈(${issueCount.openCount})`}
          />
          <IssueTabButton
            isActive={isOpen === false}
            onClick={() => setIsOpen(false)}
            iconClassName="closedIssueIcon"
            issueName={`닫힌 이슈(${issueCount.closedCount})`}
          />
        </div>
      </div>

      <div className={styles.filterBar}>
        {["담당자", "레이블", "마일스톤", "작성자"].map((name) => (
          <div key={name} className={styles.filterTabWrapper}>
            <FilterTabButton
              filterName={name}
              onClick={() => handleFilterClick(name)}
            />
            {activeFilter === name && (
              <PopupList
                filterName={name}
                actionLocation={"filterBar"}
                data={filterData?.[changeFilterName[name]] ?? []}
                onSelect={(item) => handleOptionSelect(name, item)}
                selectedItems={selectedFilters[name]}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableHeader;
