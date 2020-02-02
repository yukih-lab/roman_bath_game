import React from 'react';
import Score from "./Score.jsx";
import History from "./History.jsx";

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(fromHandType) {
        this.props.onChange(this.props.type, fromHandType);
    }
    render() {
        return (
            <div className={"hand " + this.props.type}>
                <Score type={ this.props.score % 5 == 0 ? "break" : "current"}
                       score={this.props.score}
                       canAttack={this.props.canAttack}
                       onChange={this.onChange}/>
                <History scores={this.props.history}/>
            </div>
        );
    }
};
export default Hand;