import { useState } from "react";

// 필터 상태 및 관련 동작들을 관리하는 커스텀 훅
export default function useFilterBox(initialFilters) {
  // 선택된 필터 항목 상태
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  // 현재 열려있는 필터 버튼 상태
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleFilter = (filterName) => {
    setActiveFilter((prev) => (prev === filterName ? null : filterName));
  };

  // 필터 항목 선택 시 필터 상태 업데이트 함수
  const selectOption = (filter, item) => {
    if (filter === "마일스톤" || filter === "이슈" || filter === "작성자") {
      const isSame = selectedFilters[filter]?.id === item.id;
      const newValue = isSame ? null : item;

      setSelectedFilters((prev) => ({
        ...prev,
        [filter]: newValue,
      }));

      return newValue; // ← 선택 해제이면 null, 선택이면 item
    }

    const alreadySelected = selectedFilters[filter]?.some(
      (el) => el.id === item.id
    );

    let newValue;

    if (alreadySelected) {
      newValue = selectedFilters[filter].filter((el) => el.id !== item.id);
    } else {
      newValue = [...(selectedFilters[filter] || []), item];
    }

    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: newValue,
    }));

    return newValue;
  };

  // 필요한 값들과 함수들을 반환
  return {
    selectedFilters,
    setSelectedFilters,
    activeFilter,
    setActiveFilter,
    toggleFilter,
    selectOption,
  };
}
