import React, { Component } from "react";
import socket from "../services/socketService";

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
        return <div>{this.state.riskScore}</div>;
    }
}

export default ResultsPage;
