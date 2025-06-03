import styles from "./TableHeader.module.css";
import IssueTabButton from "../common/IssueTabButton";
import FilterTabButton from "../common/FilterTabButton";
import PopupList from "../common/PopupList";
import useFilterBox from "../../hooks/useFilterBox";
import { useRef, useEffect } from "react";
import { API_URL } from "../../constants/link";
import { useLocation, useSearchParams } from "react-router-dom";

const changeFilterName = {
  담당자: "users",
  레이블: "labels",
  마일스톤: "milestones",
  작성자: "users", // TODO 추후 담당자와 구분지을 예정
};

const initialFilters = {
  담당자: null,
  레이블: [],
  마일스톤: null,
  작성자: null,
};

function TableHeader({
  isOpen,
  setIsOpen,
  issueCount,
  filterData,
  setIssues,
  setIssueCount,
  setPageData,
  setQueryString,
}) {
  const {
    selectedFilters,
    activeFilter,
    setActiveFilter,
    toggleFilter,
    selectOption,
  } = useFilterBox(initialFilters);

  const filterRef = useRef(null);
  const [searchParams] = useSearchParams();

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

  const buildQueryString = () => {
    const filterParams = [];

    if (selectedFilters["담당자"])
      filterParams.push(`assigneeId:${selectedFilters["담당자"].id}`);
    selectedFilters["레이블"].forEach((label) =>
      filterParams.push(`labelId:${label.id}`)
    );
    if (selectedFilters["마일스톤"])
      filterParams.push(`milestoneId:${selectedFilters["마일스톤"].id}`);
    if (selectedFilters["작성자"])
      filterParams.push(`authorId:${selectedFilters["작성자"].id}`);

    return (
      `state:${isOpen}` +
      (filterParams.length > 0 ? "+" + filterParams.join("+") : "")
    );
  };

  useEffect(() => {
    const q = buildQueryString();
    setQueryString(q);

    fetch(`${API_URL}/api/issues?q=${q}&page=0&size=10`)
      .then((res) => res.json())
      .then((res) => {
        setIssues(res.data.issues);
        setIssueCount({
          openCount: res.data.openCount,
          closeCount: res.data.closeCount,
        });
        setPageData({ page: res.data.page, totalPages: res.data.totalPages });
      });
  }, [selectedFilters]);

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
            issueName={`닫힌 이슈(${issueCount.closeCount})`}
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
