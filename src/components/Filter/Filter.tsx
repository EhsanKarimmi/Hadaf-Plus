import { Select } from "antd";
import { FilterProps } from "../../types/FilterProps";

function Filter({ sort, setSort }: FilterProps) {
  return (
    <div className="w-5/12">
      <Select
        defaultValue={sort}
        size="large"
        className="w-full"
        onChange={(value) => setSort(value)}
        options={[
          { value: "asc", label: "Order by Ascending" },
          { value: "desc", label: "Order by Descending" },
        ]}
      />
    </div>
  );
}

export default Filter;
