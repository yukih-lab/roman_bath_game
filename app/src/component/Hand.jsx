import React from 'react';
import Score from "./Score.jsx";
import History from "./History.jsx";

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score : 1,
            history : [],
            isBreak : false
        };
        this.onDraggableChange = this.onDraggableChange.bind(this);
        this.appendHistory = this.appendHistory.bind(this);
    }
    onDraggableChange(val) {
        if (!this.state.isBreak) {
            this.appendHistory();
            this.props.onDraggableChange(this.state.history.length);
            this.setState({score : val});
            this.setState({isBreak : val % 5 == 0});
        }
    }
    appendHistory() {
        let scores = [...this.state.history];
        scores.unshift({score: this.state.score});
        this.setState({history : scores});
    }
    render() {
        return (
            <div className={"hand " + this.props.type}>
                <Score type={this.state.isBreak ? "break" : "current"}
                       score={this.state.score}
                       onDraggableChange={this.onDraggableChange}/>
                <History scores={this.state.history}/>
            </div>
        );
    }
};
export default Hand;