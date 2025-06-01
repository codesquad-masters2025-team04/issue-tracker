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
  담당자: [],
  레이블: [],
  마일스톤: null,
  작성자: [],
};

function TableHeader({ isOpen, setIsOpen, issueCount, filterData, setIssues }) {
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

  useEffect(() => {
    const filterParams = [];

    selectedFilters["담당자"].forEach((assignee) =>
      filterParams.push(`assigneeId:${assignee.id}`)
    );
    selectedFilters["레이블"].forEach((label) =>
      filterParams.push(`labelId:${label.id}`)
    );
    if (selectedFilters["마일스톤"]) {
      filterParams.push(`milestoneId:${selectedFilters["마일스톤"].id}`);
    }
    if (selectedFilters["작성자"]) {
      filterParams.push(`authorId:${selectedFilters["작성자"].id}`);
    }

    if (filterParams.length > 0) {
      const appendParams = filterParams.join("+");
      const currentParams = new URLSearchParams(searchParams.toString()).get(
        "q"
      );
      const fullUrl = `q=${currentParams}+${appendParams}`;

      fetch(`${API_URL}/api/issues?${fullUrl}`)
        .then((response) => {
          if (!response.ok) throw new Error("요청 실패");
          return response.json();
        })
        .then((res) => {
          setIssues(res.data.issues || []);
        })
        .catch((err) => console.error("필터 요청 실패:", err));
    } else {
      setIssues([]);
    }
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
