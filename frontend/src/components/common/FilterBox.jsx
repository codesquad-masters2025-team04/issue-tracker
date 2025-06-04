import styles from "./FilterBox.module.css";
import { getTextColor } from "../../utils/colorUtils";
import PopupList from "./PopupList";
import { useEffect, useRef } from "react";
import { API_URL } from "../../constants/link";

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
  setActiveFilter,
  issueId,
  detailIssue = false,
}) {
  const filterBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterBoxRef.current &&
        !filterBoxRef.current.contains(event.target)
      ) {
        setActiveFilter(null);
        if (!detailIssue) return;
        if (selectedFilters["담당자"] && selectedFilters["담당자"].length > 0) {
          const assignees = selectedFilters["담당자"].map((user) => user.id);
          fetch(`${API_URL}/api/issues/${issueId}/assignees`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ assignees: assignees }),
          });
        }

        if (selectedFilters["레이블"] && selectedFilters["레이블"].length > 0) {
          const labels = selectedFilters["레이블"].map((label) => label.id);
          fetch(`${API_URL}/api/issues/${issueId}/labels`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ labels: labels }),
          });
        }

        if (selectedFilters["마일스톤"]) {
          const formData = new FormData();
          const milestone = { milestoneId: selectedFilters["마일스톤"].id };
          formData.append(
            "issue",
            new Blob([JSON.stringify(milestone)], {
              type: "application/json",
            })
          );
          fetch(`${API_URL}/api/issues/${issueId}`, {
            method: "PATCH",
            body: formData,
          })
            .then((response) => response.json())
            .then((res) => {
              console.log("서버 응답:", res);
            })
            .catch((err) => {
              console.error("에러:", err);
            });
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedFilters]);

  return (
    <div className={styles.filtersContainer} ref={filterBoxRef}>
      {["담당자", "레이블", "마일스톤"].map((filter) => (
        <div className={styles.filterBox} key={changeFilterName[filter]}>
          <div
            className={styles.filterButton}
            onClick={() => toggleFilter(filter)}
          >
            <span className={styles.filterButtonTitle}>{filter}</span>
            <div className={styles.plusIcon} />
          </div>
          {activeFilter === filter && (
            <PopupList
              filterName={filter}
              data={filterData?.[changeFilterName[filter]] ?? []}
              onSelect={(item) => selectOption(filter, item)}
              selectedItems={selectedFilters[filter]}
            />
          )}

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
                <div key={item.id} className={styles.selectedAsignees}>
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
                    {item.nickname}
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
                  style={{
                    backgroundColor: item.color,
                    color: getTextColor(item.color),
                  }}
                >
                  {item.name}
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
