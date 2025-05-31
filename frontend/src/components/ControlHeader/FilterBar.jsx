import styles from "./FilterBar.module.css";
import PopupList from "../common/PopupList";
import useFilterBox from "../../hooks/useFilterBox";

const selectList = [
  { id: "open", title: "열린 이슈" },
  { id: "authorMe", title: "내가 작성한 이슈" },
  { id: "assigneeMe", title: "나에게 할당된 이슈" },
  { id: "commentMe", title: "내가 댓글을 남긴 이슈" },
  { id: "closed", title: "닫힌 이슈" },
];

function FilterBar() {
  const { selectedFilters, activeFilter, toggleFilter, selectOption } =
    useFilterBox({
      이슈: [],
    });

  const handleFilterButtonClick = () => {
    toggleFilter("이슈");
  };

  const hanleOptionSelect = (item) => {
    selectOption("이슈", item);
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
            filterName={"이슈"}
            actionLocation={"filterBar"}
            data={selectList}
            selectedItems={selectedFilters["이슈"]}
            onSelect={hanleOptionSelect}
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
