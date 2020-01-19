import React from 'react';
const mod5 = (v) => v % 5;
class Score extends React.Component {
    constructor(props) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this); // TODO bindは不要、thisコンテキストを必要としていない
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
        this.props.onChange(val);
    }
    render() {
        return (
            <div className={"score " + this.props.type}
                 draggable={(this.props.type == "current")}
                 onDragStart={this.onDragStart}
                 onDragOver={this.onDragOver}
                 onDrop={this.onDragStop}>
                {mod5(this.props.score)}
            </div>
        );
    }
};

export default Score;