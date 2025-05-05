import { Dropdown, Menu, Table } from "antd";
import {
  useDeleteDomainMutation,
  useGetDomainsQuery,
} from "../../services/domainApi";
import { DomainsTableProps } from "../../types/DomainsTableProps";
import { Domain } from "../../types/Domain";
import { LinkOutlined, MoreOutlined } from "@ant-design/icons";
import { useEffect } from "react";

function DomainsTable({ edit, sort, searchQuery }: DomainsTableProps) {
  const { data = [], isLoading } = useGetDomainsQuery();
  const [deleteDomain] = useDeleteDomainMutation();

  // columns and rows for render.
  const columns = [
    {
      title: "Domain URL",
      dataIndex: "domain",
      render: (text: string) => (
        <p className="flex justify-start items-center gap-3">
          <span>{text}</span>
          <a
            href={text}
            target="_blank"
            className="cursor-pointer text-blue-600 scale-105"
          >
            <LinkOutlined />
          </a>
        </p>
      ),
    },
    {
      title: "Active Status",
      dataIndex: "isActive",
      render: (val: boolean) => (
        <span
          className={`${val ? `text-green-600` : `text-red-600`} font-medium `}
        >
          {val ? "Active" : "Not Active"}
        </span>
      ),
    },
    {
      title: "Verification Status",
      dataIndex: "status",
      render: (status: "pending" | "verified" | "rejected", record: Domain) => (
        <div className="flex justify-between items-center">
          <span
            className={`${status === "verified" && `text-green-600`} ${
              status === "rejected" && `text-red-600`
            } ${status === "pending" && `text-gray-400`}  font-medium `}
          >
            {status}
          </span>
          <Dropdown
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item onClick={() => edit(record)}>Edit</Menu.Item>
                <Menu.Item disabled={status === "verified"}>Verify</Menu.Item>
                <Menu.Item danger onClick={() => deleteDomain(record.id)}>
                  Delete
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <MoreOutlined />
          </Dropdown>
        </div>
      ),
    },
  ];

  // filter data according to sort and search query.
  const checkFilters = (data: Domain[]) => {
    let filteredData: Domain[] | [] = [];
    if (sort === "desc") {
      filteredData = [...data].reverse();
    }
    if (sort === "asc") {
      filteredData = data;
    }
    if (searchQuery !== "") {
      filteredData = data.filter((item: Domain) =>
        item?.domain?.includes(searchQuery)
      );
    }
    return filteredData;
  };

  // :)
  useEffect(() => {
    checkFilters(data);
  }, [sort, searchQuery]);

  return (
    <div className="p-5">
      <Table
        bordered
        pagination={false}
        size="large"
        columns={columns}
        dataSource={checkFilters(data)}
        rowKey="id"
        loading={isLoading}
      />
    </div>
  );
}
export default DomainsTable;
