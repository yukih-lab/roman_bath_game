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
    render() {
        return (
            <div className={"hand " + this.props.type}>
                <Score type="current"
                       score={this.props.score}
                       draggable={true}
                       onDraggableChange={this.onDraggableChange}/>
                <History scores={this.props.history}/>
            </div>

        );
    }
};
export default Hand;