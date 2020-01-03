import React from 'react';
import Hand from "./Hand.jsx";
class Player extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            left_isBreak : false,
            right_isBreak : false,
            history_length : 0
        }
        this.onDraggableChange = this.onDraggableChange.bind(this);
    }
    onDraggableChange(historyLength) {
        this.setState({ history_length : historyLength });
    }
    render() {
        return (
            <div className={'player ' + this.props.type}>
                <Hand type="right"
                      onDraggableChange={this.onDraggableChange}
                      historyLength={this.state.history_length}/>
                <Hand type="left"
                      onDraggableChange={this.onDraggableChange}
                      historyLength={this.state.history_length}/>
            </div>
        );
    }
};
export default Player;