import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useParams,
} from "react-router-dom";
import Navbar from "../Founder/nav/NavBar";
import Curriculam from "./nav/pages/Curriculam";
import FounderHome from "./nav/pages/FounderHome";
import Library from "./nav/pages/Library";
import Profile from "./nav/pages/Profile";
import Progress from "./nav/pages/Progress";
import ProgressDetail from "./nav/pages/ProgressDetail";

function Founders() {
  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
      }}
    >
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/founder/progress" component={Progress} />
            <Route exact path="/founder" component={Profile} />
            <Route path="/founder/library" component={Library} />
            <Route
              path="/founder/details/:slug"
              component={ProgressDetail}
            ></Route>
          </Switch>
        </Router>
      </>
    </div>
  );
}

export default Founders;
