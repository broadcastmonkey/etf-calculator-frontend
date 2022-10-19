import React, { Component } from "react";
import { Card, ProgressBar, Spinner } from "react-bootstrap";
import socket from "../services/socketService";
import { Results } from "../services/mockResults";

class ResultsPage extends Component {
    state = {
        cash: 0,
        riskScore: 0,
        Results: [],
        sharpe: 0,
        revenue: 0,
        volatility: 0,
        leftover: 0,
        calculationsFinished: false,
    };
    componentDidMount() {
        let { riskScore, cash } = this.props.match.params;
        this.setState({ cash });
        this.setState({ riskScore });
        socket.on("scoreRequestFinished", this.handleScoreRequestFinished);
        let portfolio = cash;
        if (socket.connected) {
            socket.emit("newScoreRequest", { score: riskScore, portfolio }, (callback) =>
                console.log(callback),
            );
            //console.log("connected and get games");
        } else
            socket.on("connect", (data) => {
                socket.emit("newScoreRequest", { score: riskScore, portfolio }, (callback) =>
                    console.log(callback),
                );
                //    console.log("emit get games");
            });
    }
    componentWillUnmount() {
        socket.removeListener("scoreRequestFinished", this.handleScoreRequestFinished);
    }

    handleScoreRequestFinished = (data) => {
        console.log("handleScoreRequestFinished", data);

        let Results = [];
        Object.keys(data.allocation).forEach(function (key, index) {
            console.log(key + " : " + data.allocation[key]);
            Results.push({ name: key, value: data.allocation[key] });
            // key: the name of the object key
            // index: the ordinal position of the key within the object
        });
        this.setState({
            sharpe: data.sharpe_ratio,
            revenue: data.annualised_return,
            volatility: data.annualised_volatality,
            leftover: data.leftover,
        });
        this.setState({ Results });
        this.setState({ calculationsFinished: true });
    };

    render() {
        let max = Math.max(...this.state.Results.map((o) => o.value));

        return (
            <>
                <Card bg="white" text="dark" className="mb-2 mt-2">
                    <Card.Header></Card.Header>
                    <Card.Body>
                        Your risk score: &nbsp;<b>{this.state.riskScore}</b>
                        <br />
                        Funds: &nbsp;<b>${this.state.cash}</b>
                        <br />
                        Sharpe ratio: &nbsp;<b>{this.state.sharpe}</b>
                        <br />
                        Expected annual return: &nbsp;<b>{this.state.revenue}%</b>
                        <br />
                        Annual Volatility: &nbsp;<b>{this.state.volatility}</b>
                        <br />
                        Remaining cash: &nbsp;<b>${this.state.leftover}</b>
                        <br />
                    </Card.Body>
                </Card>
                {this.state.Results.map((x) => {
                    return (
                        <>
                            {x.name + " : " + x.value + (x.value === 1 ? " share" : " shares")}
                            <ProgressBar
                                key={x.name}
                                min={0}
                                max={max}
                                now={x.value}
                                label={
                                    x.name +
                                    " : " +
                                    x.value +
                                    (x.value === 1 ? " share" : " shares")
                                }
                                striped={false}
                                animated={false}
                                variant="info"
                            ></ProgressBar>
                        </>
                    );
                })}
                {this.state.calculationsFinished && (
                    <img
                        src={
                            process.env.REACT_APP_SOCKET_SERVER_URL +
                            "chrumka/diagram_" +
                            this.state.riskScore +
                            ".png"
                        }
                        alt="Logo"
                    />
                )}
                {!this.state.calculationsFinished && (
                    <Spinner
                        animation="border"
                        variant="info"
                        className="m-4 text-center"
                        style={{ width: 250, height: 250 }}
                    />
                )}
            </>
        );
    }
}

export default ResultsPage;
