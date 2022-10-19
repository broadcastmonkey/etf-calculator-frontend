import React, { Component } from "react";
import socket from "../services/socketService";
import Questionnaire from "./Questionnaire";

class LandingPage extends Component {
    state = {
        currentPage: 1,
        pageSize: 10,
        activeGamesCount: 0,
        totalGamesCount: 0,
        golemVsGolemGamesCount: 0,
        playerVsGolemGamesCount: 0,
        isGolemVsGolemActive: false,
        golemVsGolemGameId: false,
        totalMovesCount: 0,
        allGames: [],
    };
    componentDidMount() {
        socket.on("gamesData", this.handleGamesData);

        if (socket.connected) {
            //socket.emit("getGames");
            console.log("connected and get games");
        } else
            socket.on("connect", (data) => {
                //socket.emit("getGames");
                console.log("emit get games");
            });
    }
    componentWillUnmount() {
        socket.removeListener("gamesData", this.handleGamesData);
    }
    handleNewGolemVsGolemGame = (data) => {
        const { gameId } = data;
        this.props.history.push("/game/" + gameId);
    };
    handleGamesData = (data) => {
        console.log(data);
    };

    render() {
        return (
            <div>
                <Questionnaire></Questionnaire>
            </div>
        );
    }
}

export default LandingPage;
