import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import { Questions1, Questions2 } from "../services/mockQuestionnaire";
import SingleQuestion from "./SingleQuestion";

class Questionnaire extends Component {
    state = {
        currentQuestionType: 1,
        ansQuestions1: [],
        areAllAnsA: false,
        areAllAnsCheckedInQuestions1: false,
        areAllAnsCheckedInQuestions2: false,
        ansQuestions2: [],
        ptsQuestions2: 0,
    };
    componentDidMount() {
        this.setState({
            ansQuestions1: Questions1.map((x) => {
                return { number: x.number, ans: -1 };
            }),
        });
        this.setState({
            ansQuestions2: Questions2.map((x) => {
                return { number: x.number, ans: -1 };
            }),
        });
    }
    componentWillUnmount() {}
    onQuestionnaire1AnsChecked = (questionNumber, ansNumber) => {
        const allAnsStatus = [...this.state.ansQuestions1];
        let areAllAnsA = true;
        let areAllAnsChecked = true;
        allAnsStatus.forEach((x) => {
            if (x.number === questionNumber) {
                x.ans = ansNumber;
            }
            areAllAnsA = x.ans === 1 && areAllAnsA;
            areAllAnsChecked = areAllAnsChecked && x.ans !== -1;
        });

        this.setState({ areAllAnsA });
        this.setState({ areAllAnsCheckedInQuestions1: areAllAnsChecked });
        this.setState({ ansQuestions1: allAnsStatus });
    };
    onQuestionnaire2AnsChecked = (questionNumber, ansNumber) => {
        const allAnsStatus = [...this.state.ansQuestions2];
        let areAllAnsChecked = true;
        let ptsQuestions2 = 0;

        allAnsStatus.forEach((x) => {
            if (x.number === questionNumber) {
                x.ans = ansNumber;
            }
            areAllAnsChecked = areAllAnsChecked && x.ans !== -1;
            ptsQuestions2 += x.ans;
        });
        this.setState({ areAllAnsCheckedInQuestions2: areAllAnsChecked });
        console.log("are all ans in 2 : " + this.state.areAllAnsCheckedInQuestions2);
        console.log("ptsQuestions2", ptsQuestions2);
        this.setState({ ansQuestions2: allAnsStatus });
        this.setState({ ptsQuestions2 });
    };

    renderNextButton = () => {
        return (
            <Card bg="light" text="dark" style={{ width: "64" }} className="mb-2 mt-2">
                <Card.Header>
                    <h2>Great! </h2>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <b>
                            <Button
                                variant="outline-primary"
                                onClick={() => {
                                    this.setState({ currentQuestionType: 2 });
                                }}
                            >
                                Go to Next Segment
                            </Button>
                        </b>
                    </Card.Title>
                    <Card.Text>Bravissimo, Continue your journey with ETF magic</Card.Text>
                </Card.Body>
            </Card>
        );
    };

    renderGoSomewhereElese = () => {
        return (
            <Card bg="warning" text="dark" style={{ width: "64" }} className="mb-2 mt-2">
                <Card.Header>
                    <h2>:( no fit</h2>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <b>We're sorry</b>
                    </Card.Title>
                    <Card.Text>Our product is not meant for you</Card.Text>
                </Card.Body>
            </Card>
        );
    };

    renderSummary = () => {
        return (
            <Card bg="light" text="dark" style={{ width: "64" }} className="mb-2 mt-2">
                <Card.Header>
                    <h2>Great! </h2>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <b>
                            <Button
                                variant="outline-primary"
                                onClick={() => {
                                    this.props.history.push("/results/" + this.state.ptsQuestions2);
                                }}
                            >
                                Calculate Best ETF for me
                            </Button>
                        </b>
                    </Card.Title>
                    <Card.Text>Your score is : {this.state.ptsQuestions2}</Card.Text>
                </Card.Body>
            </Card>
        );
    };

    render() {
        return (
            <>
                <h1>Questionnaire</h1>
                {this.state.currentQuestionType === 1 &&
                    Questions1.map((x) => (
                        <SingleQuestion
                            key={x.number}
                            data={x}
                            ansChecked={(questionNumber, ansNumber) =>
                                this.onQuestionnaire1AnsChecked(questionNumber, ansNumber)
                            }
                        />
                    ))}
                <hr />
                <hr />
                {this.state.areAllAnsA &&
                    this.state.currentQuestionType === 1 &&
                    this.renderNextButton()}
                {this.state.areAllAnsCheckedInQuestions1 &&
                    !this.state.areAllAnsA &&
                    this.state.currentQuestionType === 1 &&
                    this.renderGoSomewhereElese()}

                {this.state.currentQuestionType === 2 &&
                    Questions2.map((x) => (
                        <SingleQuestion
                            data={x}
                            ansChecked={(questionNumber, ansNumber) =>
                                this.onQuestionnaire2AnsChecked(questionNumber, ansNumber)
                            }
                        />
                    ))}
                {this.state.areAllAnsCheckedInQuestions2 &&
                    this.state.currentQuestionType === 2 &&
                    this.renderSummary()}
            </>
        );
    }
}

export default withRouter(Questionnaire);
