import React from 'react';
import Score from "./Score.jsx";
import History from "./History.jsx";

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {score : 1, scores : []}
        this.onDraggableChange = this.onDraggableChange.bind(this);
        this.appendHistory = this.appendHistory.bind(this);
    }
    onDraggableChange(val) {
        this.appendHistory(this.state.score);
        this.setState({score : val});
    }
    // TODO appendHistory 実装検討　historyは全体で履歴を刻むべき
    appendHistory(val) {
        let scores = [...this.state.scores];
        scores.push({score: val});
        this.setState({scores : scores});
    }
    render() {
        return (
            <div className={"hand " + this.props.type}>
                <Score type="current"
                       score={this.state.score}
                       draggable={true}
                       onDraggableChange={this.onDraggableChange}/>
                <History scores={this.state.scores}/>
            </div>

        );
    }
};
export default Hand;