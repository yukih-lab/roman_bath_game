import React from 'react';
import Score from "./Score.jsx";
import History from "./History.jsx";

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.onDraggableChange = this.onDraggableChange.bind(this);
    }

    onDraggableChange(val) {
        this.props.onDraggableChange(this.props.type, val);
    }
    // current Score set  current score value.
    // History sets old score values.
    // score and history are caputure that players properties.
    // draggable
    // current score
    // history append child

    render() {
        return (
            <div className={"hand " + this.props.type}>
                <Score type="current"
                       score={this.props.score}
                       draggable={true}
                       onDraggableChange={this.onDraggableChange}/>
                <History/>
            </div>

        );
    }
};
export default Hand;