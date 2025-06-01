import styles from "./TableHeader.module.css";
import IssueTabButton from "../common/IssueTabButton";
import FilterTabButton from "../common/FilterTabButton";
import PopupList from "../common/PopupList";
import useFilterBox from "../../hooks/useFilterBox";
import { useRef, useEffect } from "react";

const changeFilterName = {
  담당자: "users",
  레이블: "labels",
  마일스톤: "milestones",
  작성자: "users", // TODO 추후 담당자와 구분지을 예정
};

const initialFilters = {
  담당자: [],
  레이블: [],
  마일스톤: null,
  작성자: [],
};

function TableHeader({ isOpen, setIsOpen, issueCount, filterData }) {
  const {
    selectedFilters,
    activeFilter,
    setActiveFilter,
    toggleFilter,
    selectOption,
  } = useFilterBox(initialFilters);

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.tableHeader}>
      <div className={styles.issueViewControls}>
        <button className={styles.checkbox} />

        <div className={styles.issueTabs}>
          <IssueTabButton
            isActive={isOpen === "open"}
            onClick={() => setIsOpen("open")}
            iconClassName="openIssueIcon"
            issueName={`열린 이슈(${issueCount.openCount})`}
          />
          <IssueTabButton
            isActive={isOpen === "close"}
            onClick={() => setIsOpen("close")}
            iconClassName="closedIssueIcon"
            issueName={`닫힌 이슈(${issueCount.closedCount})`}
          />
        </div>
      </div>

      <div className={styles.filterBar} ref={filterRef}>
        {["담당자", "레이블", "마일스톤", "작성자"].map((name) => (
          <div key={name} className={styles.filterTabWrapper}>
            <FilterTabButton
              filterName={name}
              onClick={() => toggleFilter(name)}
            />
            {activeFilter === name && (
              <PopupList
                filterName={name}
                actionLocation={"tableHeader"}
                data={filterData?.[changeFilterName[name]] ?? []}
                onSelect={(item) => selectOption(name, item)}
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
