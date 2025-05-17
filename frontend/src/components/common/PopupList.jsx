import styles from "./PopupList.module.css";
import checkOffIcon from "../../assets/icons/checkOffCircle.svg";
import profileImage from "../../assets/images/userImage.png";

function PopupList({ filterName, actionLocation, data, onSelect }) {
  const positionClass =
    actionLocation === "filterBar"
      ? styles.filterBarPosition
      : styles.sideBarPosition;

  return (
    <div className={`${styles.dropdownPanel} ${positionClass}`}>
      <div className={styles.dropdownPanelTitle}>
        {actionLocation === "filterBar"
          ? `${filterName} 필터`
          : `${filterName} 정렬`}
      </div>
      <div className={styles.dropdownPanelOptions}>
        {actionLocation === "filterBar" ? (
          <button className={styles.option}>
            <span>{filterName} 없는 이슈</span>
            <img src={checkOffIcon} alt="checkOff" />
          </button>
        ) : (
          ""
        )}
        {/*TODO API 명세서 name,title 중 무엇인지 확인해보기*/}
        {data.map((item) => (
          <button
            key={item.id}
            className={styles.option}
            onClick={() => onSelect(item)}
          >
            <div className={styles.optionInfo}>
              {Object.keys(item).length === 2 ? (
                ""
              ) : item.hasOwnProperty("profileImage") ? (
                // TODO 추후 응답받은 이미지링크로 변경 예정
                <img
                  src={profileImage}
                  className={styles.userImageSmall}
                  alt="사용자 프로필 이미지"
                />
              ) : (
                <div
                  className={styles.userImageSmall}
                  style={{ backgroundColor: `#${item.color}` }}
                ></div>
              )}
              <span>{item.name}</span>
            </div>
            <img
              src={checkOffIcon}
              className={styles.checkOffIcon}
              alt="checkOff"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default PopupList;
