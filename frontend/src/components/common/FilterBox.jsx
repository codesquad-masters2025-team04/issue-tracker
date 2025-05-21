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

          {/* TODO 담당자 이미지 추가 예정*/}
          {filter === "담당자" && selectedFilters[filter]?.length > 0 && (
            <div className={styles.selectedList}>
              {selectedFilters[filter].map((item) => (
                <div className={styles.selectedAsignees}>
                  {/* TODO 추후 img로 변경 예정*/}
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "#ccc",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <div key={item.id} className={styles.selectedItem}>
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          )}

          {filter === "레이블" && selectedFilters[filter]?.length > 0 && (
            <div className={styles.selectedLabelList}>
              {selectedFilters[filter].map((item) => (
                <div
                  key={item.id}
                  className={styles.selectedLabelItem}
                  style={{ backgroundColor: `#${item.color}` }}
                >
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
