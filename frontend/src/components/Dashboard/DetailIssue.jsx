import { useState } from "react";

import styles from "./DetailIssue.module.css";
import FilterBox from "../common/FilterBox";
import useFilterBox from "../../hooks/useFilterBox";
import Comment from "../common/Comment";
import CommentInput from "../common/CommentInput";
import TitleAndButtons from "./TitleAndButtons";
import TitleEditor from "../common/TitleEditor";

function DetailIssue({ filterData, detailData, issueTitleAndId }) {
  const { selectedFilters, activeFilter, toggleFilter, selectOption } =
    useFilterBox({
      담당자: [],
      레이블: [],
      마일스톤: null,
    });
  const [editIssueTitle, setEditIssueTitle] = useState(false);
  // TODO 추후 이슈 제목을 받아와 초기값을 설정할 예정
  const [issueTitle, setIssueTitle] = useState(issueTitleAndId.title);
  const [isOpenIssue, setIsOpenIssue] = useState(true);

  return (
    <>
      <div className={styles.postInformation}>
        {editIssueTitle ? (
          <TitleEditor
            setEditIssueTitle={setEditIssueTitle}
            issueTitle={issueTitle}
            setIssueTitle={setIssueTitle}
          />
        ) : (
          <TitleAndButtons
            setEditIssueTitle={setEditIssueTitle}
            issueTitle={issueTitle}
            isOpenIssue={isOpenIssue}
            setIsOpenIssue={setIsOpenIssue}
            issueId={issueTitleAndId.id}
          />
        )}
        <div className={styles.statesInfo}>
          <div className={styles.issueStateTag}>
            <div
              className={
                isOpenIssue ? styles.openIssueIcon : styles.closedIssueIcon
              }
            />
            <span className={styles.state}>
              {isOpenIssue ? "열린 " : "닫힌 "}이슈
            </span>
          </div>
          <div className={styles.explainState}>
            <span>
              이 이슈가 3분 전에 {detailData.comments[0].author.nickname}님에
              의해 {isOpenIssue ? "열렸습니다" : "닫혔습니다"}
            </span>
            <span>∙</span>
            <span>코멘트 {detailData.commentSize}개</span>
          </div>
        </div>
        <div className={styles.line} />
      </div>

      <div className={styles.commentsAreaAndFilterBox}>
        <div className={styles.commentsArea}>
          {detailData.comments.map((comment) => (
            <Comment
              key={comment.commentId}
              authorName={comment.author.nickname}
              issueAuthorId={issueTitleAndId.authorId}
              commentAuthorId={comment.author.id}
              content={comment.content}
            />
          ))}

          <CommentInput />

          <button className={styles.newCommentButton}>
            <span className={styles.plusIcon} />
            <span className={styles.newCommentText}>코멘트 작성</span>
          </button>
        </div>
        <div className={styles.rightPanel}>
          <FilterBox
            activeFilter={activeFilter}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            selectOption={selectOption}
            filterData={filterData}
          />
          <button className={styles.issueDelete}>
            <div className={styles.deleteIcon} />
            <span className={styles.buttonTitle}>이슈 삭제</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailIssue;
