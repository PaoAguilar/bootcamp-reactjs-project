import { Layout, Menu } from "antd";

const Header = () => {
  const { Header } = Layout;

  return (
    <Header>
      <h1 className="title">Sistema de incapacidades</h1>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal"></Menu>
    </Header>
  );
};

export default Header;
