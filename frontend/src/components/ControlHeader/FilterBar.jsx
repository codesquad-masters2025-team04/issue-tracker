import PopupList from "../common/PopupList";
import styles from "./FilterBar.module.css";
import { useState } from "react";
const selectList = [
  { id: "open", title: "열린 이슈" },
  { id: "authorMe", title: "내가 작성한 이슈" },
  { id: "assigneeMe", title: "나에게 할당된 이슈" },
  { id: "commentMe", title: "내가 댓글을 남긴 이슈" },
  { id: "closed", title: "닫힌 이슈" },
];

function FilterBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className={styles.filterBarContainer}>
      <div className={styles.filterButtonWrapper}>
        <button
          className={styles.filterBarButton}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className={styles.filterBarButtonText}>필터</div>
          <div className={styles.filterBarButtonIcon} />
        </button>
        {dropdownOpen && (
          <PopupList
            filterName={"이슈"}
            actionLocation={"filterBar"}
            data={selectList}
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
