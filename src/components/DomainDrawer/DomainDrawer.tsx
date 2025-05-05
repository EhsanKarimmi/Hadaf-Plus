import { Drawer, Form, Input, Switch, Select, Button, message } from "antd";
import { useEffect } from "react";
import {
  useCreateDomainMutation,
  useUpdateDomainMutation,
} from "../../services/domainApi";
import { Domain } from "../../types/Domain";

const DomainDrawer = ({
  open,
  onClose,
  editDomain,
}: {
  open: boolean;
  onClose: () => void;
  editDomain?: Domain | null;
}) => {
  // form and hooks
  const [form] = Form.useForm();
  const [addDomain] = useCreateDomainMutation();
  const [updateDomain] = useUpdateDomainMutation();

  // :)
  useEffect(() => {
    if (editDomain) form.setFieldsValue(editDomain);
    else form.resetFields();
    return () => {
      form.resetFields();
    };
  }, []);

  // form submit.
  const onFinish = async (values: {
    domain: string;
    isActive: boolean;
    status: "pending" | "verified" | "rejected";
  }) => {
    try {
      if (editDomain) {
        await updateDomain({ id: editDomain.id, data: values }).unwrap();
        form.resetFields();
        message.success("Domain updated successfully");
      } else {
        await addDomain({ ...values, createdDate: Date.now() }).unwrap();
        form.resetFields();
        message.success("Domain added successfully");
      }
      onClose();
    } catch {
      message.error("Operation failed");
    }
  };
  return (
    <Drawer
      open={open}
      onClose={onClose}
      closeIcon={false}
      title={
        editDomain ? (
          <h2 className="text-2xl font-medium">Edit Domain</h2>
        ) : (
          <h2 className="text-2xl font-medium">Add Domain</h2>
        )
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="domain" label="Domain" rules={[{ required: true }]}>
          <Input placeholder="https://example.com" />
        </Form.Item>
        <Form.Item name="isActive" label="Active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select
            options={[
              { value: "pending", label: "Pending" },
              { value: "verified", label: "Verified" },
              { value: "rejected", label: "Rejected" },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DomainDrawer;
