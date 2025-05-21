import styles from "./FilterBox.module.css";
import PopupList from "./PopupList";

const changeFilterName = {
  담당자: "users",
  레이블: "labels",
  마일스톤: "milestones",
};

function FilterBox({
  activeFilter,
  selectedFilters,
  toggleFilter,
  selectOption,
  filterData,
}) {
  return (
    <div className={styles.filtersContainer}>
      {["담당자", "레이블", "마일스톤"].map((filter) => (
        <div className={styles.filterBox} key={filter}>
          <div
            className={styles.filterButton}
            onClick={() => toggleFilter(filter)}
          >
            <span className={styles.filterButtonTitle}>
              {filter}
              {activeFilter === filter && (
                <PopupList
                  filterName={filter}
                  className={styles.activeFilter}
                  data={filterData?.[changeFilterName[filter]] ?? []}
                  onSelect={(item) => selectOption(filter, item)}
                  selectedItems={selectedFilters[filter]}
                />
              )}
            </span>
            <div className={styles.plusIcon} />
          </div>

          {filter === "마일스톤" && selectedFilters[filter] && (
            <div className={styles.selectedList}>
              <div className={styles.selectedItem}>
                {selectedFilters[filter].title}
              </div>
            </div>
          )}

          {filter !== "마일스톤" && selectedFilters[filter]?.length > 0 && (
            <div className={styles.selectedList}>
              {selectedFilters[filter].map((item) => (
                <div key={item.id} className={styles.selectedItem}>
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FilterBox;
