import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Filter from "./components/Filter/Filter";
import Search from "./components/Search/Search";
import DomainsTable from "./components/DomainsTable/DomainsTable";
import { useState } from "react";
import { Domain } from "./types/Domain";
import DomainDrawer from "./components/DomainDrawer/DomainDrawer";

function App() {
  // state
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sort, setSort] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [editDomain, setEditDomain] = useState<Domain | null>(null);

  // store domain data for edit.
  const edit = (domain: Domain) => {
    setEditDomain(domain);
    setOpenDrawer(true);
  };

  return (
    // main container
    <div>
      {/* page title */}
      <h1 className="text-3xl font-light p-5">Domains</h1>
      {/* add domain, filter,search container */}
      <div className="p-5 flex justify-between items-center">
        {/* add domain button */}
        <Button
          onClick={() => setOpenDrawer(true)}
          size="large"
          type="primary"
          className="!px-6 !text-lg !font-light"
        >
          <span>
            <PlusOutlined />
          </span>
          <span>Add Domain</span>
        </Button>
        {/* filter and search container */}
        <div className="w-5/12 flex justify-center items-center gap-10">
          <Filter sort={sort} setSort={setSort} />
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
      {/* domains table */}
      <DomainsTable edit={edit} sort={sort} searchQuery={searchQuery} />
      {/* drawer */}
      <DomainDrawer
        editDomain={editDomain}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      />
    </div>
  );
}

export default App;
