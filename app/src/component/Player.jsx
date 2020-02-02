import React from 'react';
import Hand from "./Hand.jsx";
class Player extends React.Component{
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(toHandType, fromHandType) {
        this.props.onChangeTurn(this.props.name, toHandType, fromHandType);
    }

    render() {
        // canAttack
        return (
            <div className={'player ' + this.props.name}>
                {
                    this.props.hands.map(
                        (h, idx) => <Hand
                            key={idx}
                            type={h.type}
                            score={h.score}
                            history={h.history}
                            canAttack={this.props.canAttack}
                            onChange={this.onChange}
                        />)
                }
            </div>
        );
    }
};
export default Player;