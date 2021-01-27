import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Login from "./components/MainPage/Login";
import Signup from "./components/MainPage/Signup";
import Home from "./components/MainPage/Home";
import Founders from "./components/Founder/Founders";
import PrivateRoute from "./auth/PrivateRoute";
import VerifyEmail from "./components/MainPage/VerifyEmail";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ChakraProvider>
  );
};

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/verifyemail/:token" component={VerifyEmail} />
        <PrivateRoute path="/founder" component={Founders} />
      </Switch>
    </main>
  );
};

export default App;
