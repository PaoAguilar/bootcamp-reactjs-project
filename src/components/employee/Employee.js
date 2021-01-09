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
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { getEmployees } from "./../../actions/actions";

const { Panel } = Collapse;

const Employee = (props) => {
  const [employees, setEmployees] = useState([]);

  async function fetchEmployee() {
    const response = await getEmployees();
    setEmployees(response);
  }

  useEffect(() => {
    // peticion a firebase
    console.log("Getting data");
    fetchEmployee();
  }, []);

  console.log(employees);

  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";

  const onSubmit = (data) => {
    console.log(data);
    const employee = {
      ...data,
      date: data.date.format("DD/MM/YYYY"),
    };
    props.addOrEdit(employee);
    fetchEmployee();
    form.resetFields();
  };

  // TABLE DATA
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date of start working",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "DUI",
      key: "dui",
      dataIndex: "dui",
    },
    {
      title: "Actions",
      key: "action",
    },
  ];

  function onChange(pagination) {
    console.log("params", pagination);
  }

  return (
    <div className="employee-wrapper">
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
                  >
                    Save
                  </Button>
                  <Button type="primary" shape="round" size="large">
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Card>
        </div>
        {/* </Panel> */}
        {/* </Collapse> */}
        <Card style={{ width: 700 }}>
          <Col>
            <Table
              columns={columns}
              dataSource={employees}
              rowKey="id"
              onChange={onChange}
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

export default Employee;
