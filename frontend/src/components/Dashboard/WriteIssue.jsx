import { useState } from "react";
import styles from "./WriteIssue.module.css";
import { API_URL } from "../../constants/link";
import FilterBox from "../common/FilterBox";
import useFilterBox from "../../hooks/useFilterBox";

// 서버에 POST 요청을 보내는 함수
const handleClick = (title, content, file, setWriteIssue, selectedFilters) => {
  const issueData = {
    title,
    content,
    authorId: 1,
    assigneeIds: selectedFilters["담당자"].map((item) => item.id),
    labelIds: selectedFilters["레이블"].map((item) => item.id),
    milestoneId: selectedFilters["마일스톤"]?.id || null,
  };

  const formData = new FormData();
  formData.append(
    "issue",
    new Blob([JSON.stringify(issueData)], { type: "application/json" })
  );

  if (file?.length) {
    file.forEach((f) => formData.append("file", f));
  }

  fetch(`${API_URL}/api/issues`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("서버 응답:", data);
      setWriteIssue(false);
    })
    .catch((err) => console.error("에러:", err));
};

function WriteIssue({ setWriteIssue, filterData }) {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [file, setFile] = useState([]); // 첨부파일 상태
  const [errorFields, setErrorFields] = useState({
    title: false,
    content: false,
  }); // 에러 표시용 상태

  // 커스텀 훅으로 필터 상태 및 함수 추출
  const {
    selectedFilters,
    activeFilter,
    toggleFilter,
    selectOption,
    setActiveFilter,
  } = useFilterBox({
    담당자: [],
    레이블: [],
    마일스톤: null,
  });

  // 첨부파일 변경 핸들러
  const handleFileChange = (e) => {
    setFile(Array.from(e.target.files));
  };

  // 작성 취소 버튼
  const handleClickCancel = () => {
    setWriteIssue(false);
  };

  // 제출 버튼 클릭 시 실행
  const handleSubmit = () => {
    const hasTitle = title.trim() !== "";
    const hasContent = content.trim() !== "";

    setErrorFields({
      title: !hasTitle,
      content: !hasContent,
    });

    if (!hasTitle || !hasContent) return;

    handleClick(title, content, file, setWriteIssue, selectedFilters);
  };

  return (
    <div className={styles.writeIssueContainer}>
      <h3 className={styles.headerName}>새로운 이슈 작성</h3>
      <hr />

      <div className={styles.inputArea}>
        <div className={styles.userImage} />
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="제목"
            className={`${styles.issueTitleInput} ${
              errorFields.title ? styles.errorInput : ""
            }`}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={styles.issueContentInputContainter}>
            <textarea
              placeholder="코멘트를 입력하세요"
              className={`${styles.issueContentInput} ${
                errorFields.content ? styles.errorInput : ""
              }`}
              onChange={(e) => setContent(e.target.value)}
            />
            <input type="file" multiple onChange={handleFileChange} />
            {file.length > 0 && (
              <div className={styles.fileList}>
                {file.map((f, index) => (
                  <div key={index} className={styles.fileItem}>
                    {f.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <FilterBox
          activeFilter={activeFilter}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
          selectOption={selectOption}
          filterData={filterData}
          setActiveFilter={setActiveFilter}
        />
      </div>

      <hr />

      <div className={styles.buttonArea}>
        <button className={styles.cancelButton} onClick={handleClickCancel}>
          작성 취소
        </button>
        <button className={styles.submitButton} onClick={handleSubmit}>
          완료
        </button>
      </div>
    </div>
  );
}

export default WriteIssue;
