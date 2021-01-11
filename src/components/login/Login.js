import React, { useCallback, useContext } from "react";
import { Row, Col, Form, Input, Button } from "antd";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../../firebase";
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
                You don't have an account?
                <Link to="/signup" className="nav-link">
                  SignUp
                </Link>
              </p>
              <Form.Item>
                <Button type="primary" shape="round" htmlType="submit" block>
                  Login
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
