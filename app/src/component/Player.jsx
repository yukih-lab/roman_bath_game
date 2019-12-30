import React from 'react';
import Hand from "./Hand.jsx";
class Player extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            left : 1,  left_history : [],
            right : 1,  right_history : []
        }
        this.onDraggableChange = this.onDraggableChange.bind(this);
        this.appendHistory = this.appendHistory.bind(this);
    }
    onDraggableChange(type, val) {
        this.appendHistory();
        this.setState({[type] : val});
    }
    appendHistory() {
        let f = (type) => {
            let scores = [...this.state[type +"_history"]];
            scores.unshift({score: this.state[type]});
            this.setState({[type + "_history"] : scores});
        };
        f("left");
        f("right");
    }
    render() {
        return (
            <div className={'player ' + this.props.type}>
                <Hand type="right"
                      score={this.state.right}
                      history={this.state.right_history}
                      onDraggableChange={this.onDraggableChange}/>
                <Hand type="left"
                      score={this.state.left}
                      history={this.state.left_history}
                      onDraggableChange={this.onDraggableChange}/>
            </div>
        );
    }
};
export default Player;