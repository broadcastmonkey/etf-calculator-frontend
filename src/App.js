import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navBar";

// import logo from "./logo.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/notFound";

import LandingPage from "./components/landingPage";
import ResultsPage from "./components/resultsPage";

class App extends Component {
    state = {};

    componentDidMount() {}
    render() {
        let speedway = "container-fluid";

        return (
            <React.Fragment>
                <ToastContainer />

                <main className={speedway}>
                    <NavBar />{" "}
                    <Switch>
                        {/* <Route path="/register" component={RegisterForm} /> */}
                        <Route path="/not-found" component={NotFound} />{" "}
                        <Route path="/" exact component={LandingPage} />
                        <Route path="/results/:riskScore" exact component={ResultsPage} />
                        <Redirect to="/not-found" />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
