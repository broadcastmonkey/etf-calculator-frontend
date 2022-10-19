import React, { Component } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import socket from "../services/socketService";
import { Results } from "../services/mockResults";

class ResultsPage extends Component {
    state = {
        riskScore: 0,
    };
    componentDidMount() {
        let { riskScore } = this.props.match.params;
        this.setState({ riskScore });
        socket.on("scoreRequestFinished", this.handleScoreRequestFinished);

        if (socket.connected) {
            socket.emit("newScoreRequest", { score: riskScore }, (callback) =>
                console.log(callback),
            );
            //console.log("connected and get games");
        } else
            socket.on("connect", (data) => {
                socket.emit("newScoreRequest", { score: riskScore }, (callback) =>
                    console.log(callback),
                );
                //    console.log("emit get games");
            });
    }
    componentWillUnmount() {
        socket.removeListener("scoreRequestFinished", this.handleScoreRequestFinished);
    }
    handleNewGolemVsGolemGame = (data) => {
        const { gameId } = data;
        this.props.history.push("/game/" + gameId);
    };
    handleScoreRequestFinished = (data) => {
        console.log("handleScoreRequestFinished", data);
    };

    render() {
        return (
            <>
                {" Allocations "}
                <Card bg="white" text="dark" className="mb-2 mt-2">
                    <Card.Header>
                        <h4 style={{ color: "blue" }}>score: {this.state.riskScore}</h4>
                    </Card.Header>
                    <Card.Body>
                        {Results.Allocation.map((x) => {
                            return (
                                <>
                                    {x.name + " : " + x.value}
                                    <ProgressBar
                                        min={0}
                                        max={1}
                                        now={x.value}
                                        label={x.name + " : " + x.value}
                                        striped={true}
                                        animated={false}
                                        variant="info"
                                    ></ProgressBar>
                                    <hr />
                                </>
                            );
                        })}
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default ResultsPage;
