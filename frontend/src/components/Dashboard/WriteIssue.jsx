import { useState, useRef, useEffect } from "react";
import styles from "./WriteIssue.module.css";
import IssueTable from "./IssueTable";
import IssueToolBar from "../ControlHeader/IssueToolBar";
import PopupList from "../common/PopupList";
import { API_URL } from "../../constants/link";

const changeFilterName = {
  담당자: "users",
  레이블: "labels",
  마일스톤: "milestones",
  작성자: "users", // TODO 추후 담당자와 구분지을 예정
};

const handleClick = (
  title,
  content,
  file,
  setWriteIssue,
  selectedFilters,
  setDetailIssue
) => {
  const issueData = {
    title: title,
    content: content,
    authorId: 1,
    assigneeIds: selectedFilters["담당자"].map((item) => item.id),
    labelIds: selectedFilters["레이블"].map((item) => item.id),
    milestoneId: selectedFilters["마일스톤"]?.id || null,
  };

  const fileData = file;

  const formData = new FormData();
  const issueBlob = new Blob([JSON.stringify(issueData)], {
    type: "application/json",
  });

  formData.append("issue", issueBlob);

  if (fileData && fileData.length > 0) {
    fileData.forEach((file) => formData.append("file", file));
  }

  fetch(`${API_URL}/api/issues`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log("서버 응답:", data))
    .catch((err) => console.error("에러:", err));

  setWriteIssue(false);
  setDetailIssue(true);
};

// TODO 컴포넌트 분리 + filterData를 통해 filtersContainer부분 수정하기
function WriteIssue({ setWriteIssue, filterData, setDetailIssue }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedcancelButton, setselectedcancelButton] = useState(false);
  const [file, setFile] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [errorFields, setErrorFields] = useState({
    title: false,
    content: false,
  });
  // 각 필터에 대해 선택된 항목을 저장하는 상태
  // TODO 백엔드 분들에게 id하나만 전달해도 []배열로 전달하는 것인지 물어보기
  const [selectedFilters, setSelectedFilters] = useState({
    담당자: [],
    레이블: [],
    마일스톤: null,
  });

  // ✅ useRef로 최신 selectedFilters 값 유지
  const selectedFiltersRef = useRef(selectedFilters);

  // ✅ selectedFilters 값이 바뀔 때마다 ref도 동기화
  useEffect(() => {
    selectedFiltersRef.current = selectedFilters;
  }, [selectedFilters]);

  const handleClickcancelButton = (isSelected) => {
    setselectedcancelButton(isSelected);
    setWriteIssue(false);
  };

  const handleFileChange = (e) => {
    setFile(Array.from(e.target.files));
  };

  const handleFilterClick = (filterName) => {
    setActiveFilter((prev) => (prev === filterName ? null : filterName));
  };

  if (selectedcancelButton) {
    return (
      <>
        <IssueToolBar />
        <IssueTable />
      </>
    );
  }

  // PopupList에서 항목 선택 시 해당 필터에 맞게 상태를 업데이트하는 함수
  const handleOptionSelect = (filter, item) => {
    setSelectedFilters((prev) => {
      if (filter === "마일스톤") {
        // 마일스톤은 단일 선택이므로 같은 항목을 다시 클릭하면 제거
        return {
          ...prev,
          [filter]: prev[filter]?.id === item.id ? null : item,
        };
      }

      const alreadySelected = prev[filter].some((el) => el.id === item.id);
      if (alreadySelected) {
        // 선택되어 있으면 제거
        return {
          ...prev,
          [filter]: prev[filter].filter((el) => el.id !== item.id),
        };
      }
      return {
        ...prev,
        [filter]: [...prev[filter], item],
      };
    });
  };

  const handleSubmit = () => {
    const hasTitle = title.trim() !== "";
    const hasContent = content.trim() !== "";

    setErrorFields({
      title: !hasTitle,
      content: !hasContent,
    });

    if (!hasTitle || !hasContent) return;

    handleClick(
      title,
      content,
      file,
      setWriteIssue,
      selectedFilters,
      setDetailIssue
    );
  };

  return (
    <>
      <div className={styles.writeIssueContainer}>
        <h3 className={styles.headerName}>새로운 이슈 작성</h3>
        <hr />

        <div className={styles.inputArea}>
          <div className={styles.userImage} />
          <div className={styles.inputContainer}>
            <div className={styles.inputTitleContainer}>
              <input
                type="text"
                placeholder="제목"
                className={`${styles.issueTitleInput} ${
                  errorFields.title ? styles.errorInput : ""
                }`}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.issueContentInputContainter}>
              <textarea
                placeholder="코멘트를 입력하세요"
                className={`${styles.issueContentInput} ${
                  errorFields.content ? styles.errorInput : ""
                }`}
                onChange={(e) => setContent(e.target.value)}
              />
              <input type="file" multiple onChange={handleFileChange} />
            </div>
          </div>
          <div className={styles.filtersContainer}>
            {["담당자", "레이블", "마일스톤"].map((filter) => {
              return (
                <div
                  className={styles.filterBox}
                  key={changeFilterName[filter]}
                >
                  <div
                    key={filter}
                    className={styles.filterButton}
                    onClick={() => handleFilterClick(filter)}
                  >
                    <span className={styles.filterButtonTitle}>
                      {filter}
                      {activeFilter === filter && (
                        <PopupList
                          filterName={filter}
                          className={styles.activeFilter}
                          data={filterData?.[changeFilterName[filter]] ?? []}
                          onSelect={(item) => handleOptionSelect(filter, item)}
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

                  {filter !== "마일스톤" &&
                    selectedFilters[filter]?.length > 0 && (
                      <div className={styles.selectedList}>
                        {selectedFilters[filter].map((item) => (
                          <div key={item.id} className={styles.selectedItem}>
                            {item.title}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>

        <hr />
        <div className={styles.buttonArea}>
          <button
            className={styles.cancelButton}
            onClick={() => handleClickcancelButton(true)}
          >
            작성 취소
          </button>
          <button
            className={`${styles.submitButton} ${styles.disabledButton}`}
            onClick={handleSubmit}
          >
            완료
          </button>
        </div>
      </div>
    </>
  );
}

export default WriteIssue;
