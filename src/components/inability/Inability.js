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
  const [inability, setInabilities] = useState([]);

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
    const Inabilitiees = {
      ...data,
      admission_date: data.admission_date.format("DD/MM/YYYY"),
      start_date: data.start_date.format("DD/MM/YYYY"),
      end_date: data.end_date.format("DD/MM/YYYY"),
    };
    props.addOrEdit(Inabilitiees);
    fetchInabilities();
    form.resetFields();
  };

  const onDeleteInabilities = async (id) => {
    if (window.confirm("Would you like to delete this Disable??")) {
      await deleteInabilities(id);
      fetchInabilities();
      toast.error("Disable employee deleted successfully");
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
      title: "Employes",
      dataIndex: "Employes",
      key: "Employes",
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
        <div className="Inability-form">
          <Card style={{ width: 350 }}>
            <Col>
              <Form layout="vertical" form={form} onFinish={onSubmit}>
                <Form.Item name="admission_date">
                  <DatePicker
                    name="admission_date"
                    format={dateFormat}
                    style={{ width: 300 }}
                    size="large"
                    placeholder="Admission Date"
                    prefix={<EditOutlined />}
                  />
                </Form.Item>
                
                <Form.Item
                  name="Medical_unit"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter the Medical Unit"
                    prefix={<EditOutlined />}
                  />
                </Form.Item>

                <Form.Item
                  name="Employes"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter the Employes"
                    prefix={<EditOutlined />}
                  />
                </Form.Item>
                
                <Form.Item
                  name="Doctor"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter the Doctor"
                    prefix={<EditOutlined />}
                  />
                </Form.Item>

                <Form.Item name="start_date">
                  <DatePicker
                    name="start_date"
                    format={dateFormat}
                    style={{ width: 300 }}
                    size="large"
                    placeholder="Start Date"
                    prefix={<EditOutlined />}
                  />
                </Form.Item>

                <Form.Item name="end_date">
                  <DatePicker
                    name="end_date"
                    format={dateFormat}
                    style={{ width: 300 }}
                    size="large"
                    placeholder="End Date"
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
              dataSource={inability}
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
