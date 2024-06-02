import { FilterType, FilterTypes, FilterValuesType } from "../types/global";

export function getFilterValues({
  filterName,
  filters,
  filterType
}: {
  filterName: string;
  filters: FilterType[];
  filterType: FilterTypes;
}) {
  if (!filters.length) {
    return null;
  }
  switch (filterType) {
    case "dateRange": {
      const filterData = filters.find(
        (val) => val.filterName === filterName && val.filterType === filterType
      );
      if (!filterData) {
        return null;
      }
      if (filterData) {
        const start = filterData.filterValues?.find(
          (val: FilterValuesType) => val.id === "start"
        );
        const end = filterData.filterValues?.find(
          (val: FilterValuesType) => val.id === "end"
        );
        return { start: start?.value, end: end?.value };
      }
      return null;
    }
  }
}
export function createFilterValues({
  filterName,
  filters,
  filterType,
  startDate,
  endDate
}: {
  filterName: string;
  filters: FilterType[];
  filterType: FilterTypes;
  startDate?: string;
  endDate?: string;
}): FilterType[] {
  const filterIndex = filters.findIndex((val) => val.filterType === filterType);

  switch (filterType) {
    case "dateRange": {
      if (filterIndex < 0) {
        filters.push({
          filterName,
          filterType,
          filterValues: [
            { id: "start", value: startDate },
            { id: "end", value: endDate }
          ]
        });
        return filters;
      }

      const start = filters[filterIndex].filterValues?.find(
        (val: FilterValuesType) => val.id === "start"
      );
      const end = filters[filterIndex].filterValues?.find(
        (val: FilterValuesType) => val.id === "end"
      );

      filters[filterIndex] = {
        ...filters[filterIndex],
        filterValues: [
          { id: "start", value: startDate || start?.value },
          { id: "end", value: endDate || end?.value }
        ]
      };
      return filters;
    }
  }
}
