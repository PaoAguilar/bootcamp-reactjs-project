import React, { useCallback } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import signup from "../../img/signup.svg";
import app from "../../firebase";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      const { email, password } = event;
      try {
        await app.auth().createUserWithEmailAndPassword(email, password);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className="login-wrapper">
      <div className="login">
        <Row justify="center" align="middle">
          <Col span={12}>
            <img src={signup} alt="Signin"></img>
          </Col>
          <Col span={12}>
            <h1>Sign up</h1>
            <Form onFinish={handleSignUp}>
              <Form.Item
                name="email"
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
                <Input placeholder="Enter your email address" />
              </Form.Item>
              <Form.Item
                name="password"
                style={{ color: "white" }}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
              <p className="text-center my-3">
                You already have an account?
                <Link to="/login">Login</Link>
              </p>
              <Form.Item>
                <Button type="primary" shape="round" htmlType="submit" block>
                  SignUp
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
