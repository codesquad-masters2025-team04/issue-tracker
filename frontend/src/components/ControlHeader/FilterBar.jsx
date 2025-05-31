import styles from "./FilterBar.module.css";

function FilterBar() {
  return (
    <div className={styles.filterBarContainer}>
      <button className={styles.filterBarButton}>
        <div className={styles.filterBarButtonText}>필터</div>
        <div className={styles.filterBarButtonIcon} />
      </button>
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
