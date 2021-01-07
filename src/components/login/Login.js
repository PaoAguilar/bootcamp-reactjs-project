import React, { useCallback, useContext } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { withRouter, Redirect } from "react-router";
import app from "./../../base";
import { AuthContext } from "./../Auth";
import login from "../../img/login4.svg";
import "./login.css";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      const { email, password } = event;
      console.log(event);
      try {
        await app.auth().signInWithEmailAndPassword(email, password);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-wrapper">
      <div className="login">
        <Row justify="center" align="middle">
          <Col span={12}>
            <img src={login} alt="Login"></img>
          </Col>
          <Col span={12}>
            <h1>Login</h1>
            <Form onFinish={handleLogin}>
              <Form.Item
                name="email"
                label={<label style={{ color: "white" }}>E-mail</label>}
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<label style={{ color: "white" }}>Password</label>}
                name="password"
                style={{ color: "white" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withRouter(Login);
