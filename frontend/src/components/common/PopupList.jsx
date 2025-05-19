import styles from "./PopupList.module.css";
import checkOffIcon from "../../assets/icons/checkOffCircle.svg";
import checkOnIcon from "../../assets/icons/checkOnCircle.svg";
import profileImage from "../../assets/images/userImage.png";

function PopupList({
  filterName,
  actionLocation,
  data,
  onSelect,
  selectedItems,
}) {
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
        {data.map((item) => {
          // 선택 여부 확인 (배열일 경우: 담당자, 레이블 / 객체일 경우: 마일스톤)
          const isSelected = Array.isArray(selectedItems)
            ? selectedItems.some((el) => el.id === item.id)
            : selectedItems?.id === item.id;

          return (
            <button
              key={item.id}
              className={`${styles.option} ${
                isSelected ? styles.selectedOption : ""
              }`}
              onClick={() => onSelect(item)} // 항목 선택/해제 처리
            >
              <div className={styles.optionInfo}>
                {Object.keys(item).length === 2 ? (
                  ""
                ) : item.hasOwnProperty("profileImage") ? (
                  <img
                    src={profileImage} // 실제로는 item.profileImage 로 대체 가능
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
                src={isSelected ? checkOnIcon : checkOffIcon}
                className={styles.checkOffIcon}
                alt={isSelected ? "checkOn" : "checkOff"}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PopupList;
