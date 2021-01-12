import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Button,
  Card,
  Collapse,
  Table,
  Space,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { getInabilities, deleteInabilities } from "./../../actions/actions";
import { toast } from "react-toastify";

const { Panel } = Collapse;

const Inability = (props) => {
  const [inabilities, setInabilities] = useState([]);

  async function fetchInabilities() {
    const response = await getInabilities();
    setInabilities(response);
  }

  useEffect(() => {
    console.log("Getting data");
    fetchInabilities();
  }, []);

  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";

  const onSubmit = (data) => {
    console.log(data);
    const inability = {
      ...data,
      date: data.date.format("DD/MM/YYYY"),
    };
    props.addOrEdit(inability);
    fetchInabilities();
    form.resetFields();
  };

  const onDeleteInabilities = async (id) => {
    if (window.confirm("Would you like to delete this employee??")) {
      await deleteInabilities(id);
      fetchInabilities();
      toast.error("Employee deleted successfully");
    }
  };

  // TABLE DATA
  const columns = [
    {
      title: "Admission Date",
      dataIndex: "admission_date",
      key: "admission_date",
    },
    {
      title: "Medical Unit",
      dataIndex: "Medical_unit",
      key: "Medical_unit",
    },
    {
      title: "Doctor",
      dataIndex: "Doctor",
      key: "Doctor",
    },
    {
      title: "Start Date",
      key: "start_date",
      dataIndex: "start_date",
    },
    {
      title: "End Date",
      key: "end_date",
      dataIndex: "end_date",
    },
    {
      title: "Action",
      key: "action",
      render: (inability) => {
        return (
          <Space size="middle">
            <a>Edit</a>
            <a onClick={() => onDeleteInabilities(inability.id)}>Delete</a>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="inability-wrapper">
      <Row justify="center">
        {/* <Collapse accordion>
          <Panel
            header="Employee"
            key="1"
            className="site-collapse-custom-panel"
          > */}
        <div className="employee-form">
          <Card style={{ width: 350 }}>
            <Col>
              <Form layout="vertical" form={form} onFinish={onSubmit}>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter the employee's code"
                    prefix={<EditOutlined />}
                  />
                </Form.Item>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    name="name"
                    size="large"
                    placeholder="Enter the employee's name"
                    prefix={<EditOutlined />}
                  />
                </Form.Item>
                <Form.Item name="date">
                  <DatePicker
                    name="date"
                    format={dateFormat}
                    style={{ width: 300 }}
                    size="large"
                    placeholder="Date of entry to the company"
                    prefix={<EditOutlined />}
                  />
                </Form.Item>
                <Form.Item
                  name="position"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    name="position"
                    size="large"
                    placeholder="Enter position"
                    prefix={<EditOutlined />}
                  />
                </Form.Item>
                <Form.Item
                  name="dui"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    name="dui"
                    size="large"
                    placeholder="Enter DUI"
                    prefix={<EditOutlined />}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    shape="round"
                    htmlType="submit"
                    size="large"
                    block
                  >
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Card>
        </div>
        {/* </Panel> */}
        {/* </Collapse> */}
        <Card style={{ width: 800 }}>
          <Col>
            <Table
              columns={columns}
              dataSource={inabilities}
              rowKey="id"
              pagination={{
                defaultPageSize: 5,
              }}
            />
          </Col>
        </Card>
      </Row>
    </div>
  );
};

export default Inability;
