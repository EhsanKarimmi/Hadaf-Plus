import { PlusOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import Filter from "./components/Filter/Filter";
import Search from "./components/Search/Search";
import DomainsTable from "./components/DomainsTable/DomainsTable";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
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
          onClick={showDrawer}
          type="primary"
          className="w-2/12 !p-6 !text-lg !font-light"
        >
          <span>
            <PlusOutlined />
          </span>
          <span>Add Domain</span>
        </Button>
        {/* filter and search container */}
        <div className="flex justify-center items-center gap-10 bg-amber-100">
          <Filter />
          <Search />
        </div>
      </div>
      {/* domains table */}
      <DomainsTable />
      {/* drawer */}
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}

export default App;
