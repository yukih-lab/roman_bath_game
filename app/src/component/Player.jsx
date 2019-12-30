import React from 'react';
import Hand from "./Hand.jsx";
import rbgCore from "./../core.js";
class Player extends React.Component{
    constructor(props) {
        super(props);
        this.state = {left : 1, right : 1};
        this.onDraggableChange = this.onDraggableChange.bind(this);
    }

    onDraggableChange(type, score) {
        this.setState({[type] : score});
    }

    render() {
        return (
            <div className={'player ' + this.props.type}>
                <Hand type="right" score={this.state.right} onDraggableChange={this.onDraggableChange}/>
                <Hand type="left" score={this.state.left} onDraggableChange={this.onDraggableChange}/>
            </div>
        );
    }
};
export default Player;