import { Table } from "antd";

function DomainsTable() {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Domain URL",
      dataIndex: "Domain URL",
      key: "Domain URL",
    },
    {
      title: "Active Status",
      dataIndex: "Active_Status",
      key: "Active_Status",
    },
    {
      title: "Verification Status",
      dataIndex: "Verification_Status",
      key: "Verification_Status",
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default DomainsTable;
