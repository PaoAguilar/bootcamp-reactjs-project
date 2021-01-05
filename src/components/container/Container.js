import { Layout, Menu } from "antd";
import "./container.css";

const Container = () => {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout className="layout">
      <Header>
        <h1 className="title">Sistema de incapacidades</h1>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal"></Menu>
      </Header>
      <Content>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Bootcamp - ReactJs ©2021</Footer>
    </Layout>
  );
};

export default Container;
