import { Layout } from "antd";
import Header from "./../Header";
import "./container.css";

const Container = ({ children }) => {
  const { Content, Footer } = Layout;

  return (
    <Layout className="layout">
      <Header />
      <Content>{children}</Content>
      <Footer style={{ textAlign: "center" }}>Bootcamp - ReactJs ©2021</Footer>
    </Layout>
  );
};

export default Container;
