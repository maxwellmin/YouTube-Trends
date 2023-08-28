import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Category from "./components/category-count";
import Login from "./components/login";
import UserSummary from "./components/user-info-summary";
import UserPage from "./components/user-page";
import VideosList from "./components/videos-list";

function App() {
  const [user, setUser] = useState();
  const [name, setName] = useState();

  async function login(user = null, name = null) {
    setUser(user);
    setName(name);
  }

  async function logout() {
    setUser(null);
    setName(null);
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/videos"} className="navbar-brand">
          Youtube Trending Videos
        </Link>
        <div className="navbar-nav mr-auto">
          {user ? (
            <li className="nav-item">
              <Link to={"/users/" + user} className="nav-link">
                User Page
              </Link>
            </li>
          ) : (
            <></>
          )}

          <li className="nav-item">
            {user ? (
              <a
                href="/#"
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {name ? name : user}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route
            exact
            path={["/", "/videos"]}
            render={(props) => (
              <VideosList {...props} user={user} name={name} />
            )}
          />
          <Route
            path="/users/summary/:id"
            render={(props) => (
              <UserSummary {...props} user={user} name={name} />
            )}
          />
          <Route
            path="/users/:id"
            render={(props) => <UserPage {...props} user={user} name={name} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} login={login} />}
          />
          <Route path="/category/count" component={Category} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
