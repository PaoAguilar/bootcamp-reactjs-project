import React from "react";
import Container from "./components/container/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const App = () => {
  return (
    <Container>
      <div className="site-layout-content">
        <AuthProvider>
          <Router>
            <div>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </div>
          </Router>
        </AuthProvider>
      </div>
    </Container>
  );
};

export default App;
