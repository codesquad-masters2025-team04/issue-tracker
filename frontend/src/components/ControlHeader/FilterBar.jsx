import { useEffect, useState } from "react";
import styles from "./FilterBar.module.css";
import PopupList from "../common/PopupList";
import useFilterBox from "../../hooks/useFilterBox";
import { API_URL } from "../../constants/link";

const selectList = [
  { id: "open", title: "열린 이슈" },
  { id: "authorMe", title: "내가 작성한 이슈" },
  { id: "assigneeMe", title: "나에게 할당된 이슈" },
  { id: "commentMe", title: "내가 댓글을 남긴 이슈" },
  { id: "close", title: "닫힌 이슈" },
];

function FilterBar({
  isOpen,
  setIsOpen,
  query,
  setIssues,
  setIssueCount,
  setPageData,
}) {
  const [inputParamValue, setInputParamValue] = useState("");
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

  const userId = 1;

  useEffect(() => {
    setSelectedFilters({
      이슈:
        isOpen === "open"
          ? { id: "open", title: "열린 이슈" }
          : isOpen === "close"
          ? { id: "close", title: "닫힌 이슈" }
          : {},
    });

    setInputParamValue(`is:issue ${query}`);
  }, [isOpen, query]);

  const handleFilterButtonClick = () => {
    toggleFilter("이슈");
  };

  // 내가 작성한 이슈, 나에게 할당된 이슈, 내가 댓글을 남긴 이슈 fetch 요청 함수
  const fetchIssuesAboutMe = (userId, selectedOptionId) => {
    // selectedOption에 따라 다른 API 호출을 하기 위해 조건문 작성
    let queryParamKey = "";
    if (selectedOptionId === "authorMe") queryParamKey = "authorId";
    else if (selectedOptionId === "assigneeMe") queryParamKey = "assigneeId";
    else if (selectedOptionId === "commentMe")
      queryParamKey = "commentAuthorId";

    // fetch 요청 로직
    fetch(
      `${API_URL}/api/issues?q=state:${isOpen}+${queryParamKey}:${userId}&page=0&size=10`
    )
      .then((response) => response.json())
      .then((res) => {
        setIssues(res.data.issues || []);
        setIssueCount({
          openCount: res.data.openCount,
          closeCount: res.data.closeCount,
        });
        setPageData({ page: res.data.page, totalPages: res.data.totalPages });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchIssueByState = (state) => {
    fetch(`${API_URL}/api/issues?q=state:${state}&page=0&size=10`)
      .then((response) => response.json())
      .then((res) => {
        setIssues(res.data.issues || []);
        setIssueCount({
          openCount: res.data.openCount,
          closeCount: res.data.closeCount,
        });
        setPageData({ page: res.data.page, totalPages: res.data.totalPages });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // 모든 이슈 fetch 요청 함수
  // const fetchIssueAll = () => {
  //   fetch(`${API_URL}/api/issues?q=state:${isOpen}&page=0&size=10`)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       setIssues(res.data.issues || []);
  //       setIssueCount({
  //         openCount: res.data.openCount,
  //         closeCount: res.data.closeCount,
  //       });
  //       setPageData({ page: res.data.page, totalPages: res.data.totalPages });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  const handleOptionSelect = (item) => {
    const result = selectOption("이슈", item);

    if (!result) {
      // 필터 적용 후 적용된 필터 해지시 open 이슈로 변경
      if (isOpen === "close") setIsOpen("open");
      fetchIssueByState("open");
      toggleFilter("이슈");
      return;
    }
    if (result.id === "open") {
      isOpen !== "open" ? setIsOpen("open") : fetchIssueByState("open");
    } else if (result.id === "close") {
      isOpen !== "close" ? setIsOpen("close") : fetchIssueByState("close");
    } else if (
      result.id === "authorMe" ||
      result.id === "assigneeMe" ||
      result.id === "commentMe"
    ) {
      fetchIssuesAboutMe(userId, result.id);
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
          value={inputParamValue}
          readOnly
        />
      </div>
    </div>
  );
}

export default FilterBar;
