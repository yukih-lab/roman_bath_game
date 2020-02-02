import React from 'react';
const getHandType = (classSelector) => {
    let regex = /(left|right)/g;
    return classSelector.match(regex)[0];
};
class Score extends React.Component {
    constructor(props) {
        super(props);
        this.onDragStart = this.onDragStart.bind(this); // TODO bindは不要、thisコンテキストを必要としていない
        this.onDragStop = this.onDragStop.bind(this);
    }
    onDragStart (e) {
        let handType = getHandType(e.target.parentNode.className);
        e.dataTransfer.setData("text/plain", handType);
        e.dataTransfer.dropEffect="copy";
    }
    onDragOver (e) {
        e.preventDefault();
    }
    onDragStop (e) {
        let handType = e.dataTransfer.getData("text/plain");
        this.props.onChange(handType);
    }
    render() {
        return (
            <div className={"score " + this.props.type}
                 draggable={this.props.canAttack}
                 onDragStart={this.onDragStart}
                 onDragOver={this.onDragOver}
                 onDrop={this.onDragStop}>
                {this.props.score}
            </div>
        );
    }
};

export default Score;