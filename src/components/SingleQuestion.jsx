import React, { Component } from "react";
import { Card, Button, Badge } from "react-bootstrap";

class SingleQuestion extends Component {
    state = {
        checkedNumber: -1,
    };
    componentDidMount() {}
    componentWillUnmount() {}

    btnClick = (number) => {
        this.setState({ checkedNumber: number });
        this.props.ansChecked(this.props.data.number, number);
    };

    render() {
        const { number, question, ans } = this.props.data;
        return (
            <>
                <Card bg="white" text="dark" className="mb-2 mt-2">
                    <Card.Header>
                        <h4 style={{ color: "blue" }}>Question {number}</h4>
                        <h3>{question}</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className="d-grid gap-2">
                            {ans.map((x) => {
                                const badgeContent = x.letter || x.number;
                                const variant =
                                    x.number === this.state.checkedNumber ? "primary" : "light";
                                return (
                                    <Button
                                        key={x.number}
                                        variant={variant}
                                        size="lg"
                                        style={{ textAlign: "left" }}
                                        onClick={() => this.btnClick(x.number)}
                                    >
                                        <Badge bg="dark">{badgeContent}</Badge> {x.text}
                                    </Button>
                                );
                            })}
                        </div>
                    </Card.Body>
                </Card>
                <hr />
            </>
        );
    }
}

export default SingleQuestion;
