import { Input } from "antd";
import { SearchProps } from "../../types/SearchProps";
import { SearchOutlined } from "@ant-design/icons";

function Search({ searchQuery, setSearchQuery }: SearchProps) {
  return (
    <div className="w-6/12">
      <Input
        size="large"
        defaultValue={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        addonBefore={<SearchOutlined />}
        placeholder="Search..."
      />
    </div>
  );
}

export default Search;
