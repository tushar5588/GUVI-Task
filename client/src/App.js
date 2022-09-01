import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const makeToken = (value) => {
    setToken(value);
  };
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              GUVI
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {token ? (
                  <li className="nav-item">
                    <Link className="nav-link" to={"/"}>
                      Home
                    </Link>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className={`nav-link`} to={"/sign-in"}>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-up"}>
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  token ? (
                    <Home setToken={makeToken} />
                  ) : (
                    <Navigate replace to="/sign-in" />
                  )
                }
              />
              <Route path="/sign-in" element={<Login setToken={makeToken} />} />
              <Route
                path="/sign-up"
                element={<SignUp setToken={makeToken} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
