import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import IssueTable from "../components/Dashboard/IssueTable";
import IssueToolBar from "../components/ControlHeader/IssueToolBar";
import WriteIssue from "../components/Dashboard/WriteIssue";
import { API_URL } from "../constants/link";
import DetailIssue from "../components/Dashboard/DetailIssue";
import LabelPage from "./LabelPage";
import MilestonePage from "./MilestonePage"; //

function Home() {
  const [writeIssue, setWriteIssue] = useState(false);
  const [filterData, setFilterData] = useState({
    users: [],
    milestones: [],
    labels: [],
  });
  const [detailIssue, setDetailIssue] = useState(false);
  const [issueTitleAndId, setIssueTitleAndId] = useState({});
  const [detailData, setDetailData] = useState({});
  const [isLabelPage, setIsLabelPage] = useState(false);
  const [isMilestonePage, setIsMilestonePage] = useState(false);
  const [addLabel, setAddLabel] = useState(false);
  const [addMilestone, setAddMilestone] = useState(false);
  const [labelCount, setLabelCount] = useState();
  const [milestoneCount, setMilestoneCount] = useState();

  useEffect(() => {
    //TODO fetch로 여러번 요청을 보내는 것과 Promise.all로 한번에 요청을 보내는 것을 비교해보기
    // 각각의 장단점이 명확하므로 추후 회의를 통해 선택할 예정, 우선 불필요한 리렌더링을 줄이기 위해 Promise.all을 사용
    // Promise.all은 하나의 요청이 실패하면 모두 실패 처리, 결과가 모두 올때까지 기다려야 함
    // fetch는 setFliterData를 여러번 호출 -> 불필요한 리렌더링 발생, 하지만 우선적으로 받아온 데이터응답을 UI에 드러낼 수 있음
    Promise.all([
      fetch(`${API_URL}/api/users/filter`).then((res) => res.json()),
      fetch(`${API_URL}/api/milestones/filter`).then((res) => res.json()),
      fetch(`${API_URL}/api/labels/filter`).then((res) => res.json()),
    ])
      .then(([usersData, milestonesData, labelsData]) => {
        setFilterData({
          users: usersData.data.users,
          milestones: milestonesData.data.milestones,
          labels: labelsData.data.labels,
        });
        setLabelCount(filterData.labels.length);
        setMilestoneCount(filterData.milestones.length);
      })
      .catch((error) => {
        console.error("필터 데이터 로딩 실패:", error);
      });
  }, [labelCount, milestoneCount]);

  return (
    <>
      <Header
        setWriteIssue={setWriteIssue}
        setDetailIssue={setDetailIssue}
        setIsLabelPage={setIsLabelPage}
        setIsMilestonePage={setIsMilestonePage}
      />
      {!writeIssue && !detailIssue ? (
        <IssueToolBar
          onClick={() => setWriteIssue(true)}
          labelCount={labelCount}
          milestoneCount={milestoneCount}
          isLabelPage={isLabelPage}
          setIsLabelPage={setIsLabelPage}
          isMilestonePage={isMilestonePage}
          setIsMilestonePage={setIsMilestonePage}
          addLabel={addLabel}
          setAddLabel={setAddLabel}
          addMilestone={addMilestone}
          setAddMilestone={setAddMilestone}
        />
      ) : (
        ""
      )}
      {writeIssue ? (
        <WriteIssue setWriteIssue={setWriteIssue} filterData={filterData} />
      ) : detailIssue ? (
        <DetailIssue
          filterData={filterData}
          detailData={detailData}
          issueTitleAndId={issueTitleAndId}
          setDetailIssue={setDetailIssue}
        />
      ) : isLabelPage ? (
        <LabelPage addLabel={addLabel} setAddLabel={setAddLabel} />
      ) : isMilestonePage ? (
        <MilestonePage
          milestonesCount={milestoneCount}
          setMilestoneCount={setMilestoneCount}
          addMilestone={addMilestone}
          setAddMilestone={setAddMilestone}
        />
      ) : (
        <IssueTable
          filterData={filterData}
          setDetailIssue={setDetailIssue}
          setDetailData={setDetailData}
          setIssueTitleAndId={setIssueTitleAndId}
        />
      )}
    </>
  );
}

export default Home;
