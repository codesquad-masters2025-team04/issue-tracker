import styles from "./Header.module.css";
import logo from "../../assets/images/logoMedium.svg";
import userProfile from "../../assets/images/userImage.png";
import { API_URL } from "../../constants/link";
// TODO userProfile 이미지를 불러오는 코드는 추후 변경되어야할 부분

function Header({
  setWriteIssue,
  setDetailIssue,
  setIsLabelPage,
  setIsMilestonePage,
  setIssues,
  setPageData,
  setPageGroup,
}) {
  const handleLogoClick = () => {
    fetch(`${API_URL}/api/issues?q=state:open&page=0&size=10`)
      .then((res) => res.json())
      .then((data) => {
        setIssues(data.data.issues);
        setPageData({ page: 0, totalPages: data.data.totalPages });
        setPageGroup(0);
        setWriteIssue(false);
        setDetailIssue(false);
        setIsLabelPage(false);
        setIsMilestonePage(false);
      })
      .catch((error) => {
        console.error("Error fetching issues:", error);
      });
  };

  return (
    <div className={styles.headerWrapper}>
      <img
        src={logo}
        alt="logo"
        className={styles.logo}
        onClick={handleLogoClick}
      />

      <img
        src={userProfile}
        alt="userProfileImage"
        className={styles.userProfile}
      />
    </div>
  );
}

export default Header;
