import React from 'react';

class Score extends React.Component {
    constructor(props) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragStop = this.onDragStop.bind(this);
    }
    onDragStart (e) {
        e.dataTransfer.setData("text/plain", e.target.innerText);
        e.dataTransfer.dropEffect="copy";
        console.log("onDragStart", e.target.innerText);
    }
    onDragOver (e) {
        e.preventDefault();
    }
    onDragStop (e) {
        // TODO 加算イベントと紐づけ
        let cData = e.dataTransfer.getData("text/plain");
        let val = parseInt(e.target.innerText) + parseInt(cData);
        this.props.onDraggableChange(val);
    }

    render() {
        if (this.props.type == 'current') {
            return (
                <div className={"score " + this.props.type}
                     draggable={this.props.draggable}
                     onDragStart={this.onDragStart}
                     onDragOver={this.onDragOver}
                     onDrop={this.onDragStop}>
                    {this.props.score}
                </div>
            );
        } else {
            return (
                <div className="score">{this.props.score}</div>
            );
        }
    }
};

export default Score;