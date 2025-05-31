import { useEffect } from "react";
import styles from "./FilterBar.module.css";
import PopupList from "../common/PopupList";
import useFilterBox from "../../hooks/useFilterBox";

const selectList = [
  { id: "open", title: "열린 이슈" },
  { id: "authorMe", title: "내가 작성한 이슈" },
  { id: "assigneeMe", title: "나에게 할당된 이슈" },
  { id: "commentMe", title: "내가 댓글을 남긴 이슈" },
  { id: "close", title: "닫힌 이슈" },
];

function FilterBar({ isOpen, setIsOpen }) {
  const {
    selectedFilters,
    setSelectedFilters,
    activeFilter,
    toggleFilter,
    selectOption,
  } = useFilterBox({
    이슈:
      isOpen === "open"
        ? { id: "open", title: "열린 이슈" }
        : { id: "close", title: "닫힌 이슈" },
  });

  useEffect(() => {
    setSelectedFilters({
      이슈:
        isOpen === "open"
          ? { id: "open", title: "열린 이슈" }
          : { id: "close", title: "닫힌 이슈" },
    });
  }, [isOpen]);

  const handleFilterButtonClick = () => {
    toggleFilter("이슈");
  };

  const handleOptionSelect = (item) => {
    selectOption("이슈", item);
    if (item.id === "open") {
      setIsOpen("open");
    } else {
      setIsOpen("close");
    }
    toggleFilter("이슈");
  };

  return (
    <div className={styles.filterBarContainer}>
      <div className={styles.filterButtonWrapper}>
        <button
          className={styles.filterBarButton}
          onClick={handleFilterButtonClick}
        >
          <div className={styles.filterBarButtonText}>필터</div>
          <div className={styles.filterBarButtonIcon} />
        </button>
        {activeFilter === "이슈" && (
          <PopupList
            filterName="이슈"
            actionLocation="filterBar"
            data={selectList}
            selectedItems={selectedFilters["이슈"]}
            onSelect={handleOptionSelect}
          />
        )}
      </div>
      <div className={styles.filterBarSearch}>
        <div className={styles.filterBarSearchIcon} />
        <input
          className={styles.filterBarInput}
          type="text"
          placeholder="검색"
        />
      </div>
    </div>
  );
}

export default FilterBar;
