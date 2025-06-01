import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import IssueTable from "../components/Dashboard/IssueTable";
import IssueToolBar from "../components/ControlHeader/IssueToolBar";
import WriteIssue from "../components/Dashboard/WriteIssue";
import { API_URL } from "../constants/link";
import DetailIssue from "../components/Dashboard/DetailIssue";
import LabelPage from "./LabelPage";
import MilestonePage from "./MilestonePage"; //
import { useSearchParams } from "react-router-dom";

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
  const [isOpen, setIsOpen] = useState("open");
  const [searchParam] = useSearchParams();
  const [issues, setIssues] = useState([]);

  const query = searchParam.get("q");
  // 주소창의 쿼리 값을 가져와서 isOpen의 상태를 open, close 로 변경
  useEffect(() => {
    if (query) {
      if (query.includes("state:open")) {
        setIsOpen("open");
      } else if (query.includes("state:close")) {
        setIsOpen("close");
      }
    }
  }, [query]);

  const fetchFilterData = async () => {
    Promise.all([
      fetch(`${API_URL}/api/users/filter`).then((res) => res.json()),
      fetch(`${API_URL}/api/milestones/filter`).then((res) => res.json()),
      fetch(`${API_URL}/api/labels/filter`).then((res) => res.json()),
    ])
      .then(([usersData, milestonesData, labelsData]) => {
        const users = usersData.data.users;
        const milestones = milestonesData.data.milestones;
        const labels = labelsData.data.labels;

        setFilterData({ users, milestones, labels });
        setLabelCount(labels.length);
        setMilestoneCount(milestones.length);
      })
      .catch((error) => {
        console.error("필터 데이터 로딩 실패:", error);
      });
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

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
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          query={query}
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
        <LabelPage
          labelCount={labelCount}
          setLabelCount={setLabelCount}
          addLabel={addLabel}
          setAddLabel={setAddLabel}
        />
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
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          issues={issues}
          setIssues={setIssues}
        />
      )}
    </>
  );
}

export default Home;
