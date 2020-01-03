import React from 'react';

const mod5 = (v) => v % 5;
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
        let cData = e.dataTransfer.getData("text/plain");
        let val = parseInt(e.target.innerText) + parseInt(cData);
        this.props.onDraggableChange(val);
    }
    render() {
        if (this.props.type == "current") {
            return (
                <div className={"score " + this.props.type}
                     draggable={true}
                     onDragStart={this.onDragStart}
                     onDragOver={this.onDragOver}
                     onDrop={this.onDragStop}>
                    {mod5(this.props.score)}
                </div>
            );
        } else {
            return (
                <div className={"score " + this.props.type} >
                    {mod5(this.props.score)}
                </div>
            );
        }

    }
};

export default Score;