import React from 'react';
import Hand from "./Hand.jsx";
class Player extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hands : [
                { name : "left", score : 1, history : [] },
                { name : "right", score : 1, history : [] }
                ],
            history_length : 0
        }
        this.onChange = this.onChange.bind(this);
    }
    // todo
    // onAttack() {
    //
    // }
    onChange(type, score) {
        let hands = this.state.hands
            .map(h => {
                h.history.unshift({score: h.score});
                if (type == h.name) {
                    h.score = score;
                }
                return h;
            });
        console.log(type, score, hands);
        this.setState({hands : hands});
        // すべてのHandsが使用不可の場合、敗北と判定
        let breakHands = hands.filter(h => h.score % 5 == 0);
        let isBreak = breakHands.length == this.state.hands.length;
        this.props.onChangeTurn(this.props.name, isBreak);
    }

    render() {
        return (
            <div className={'player ' + this.props.name}>
                {
                    this.state.hands.map(
                        (h, idx) => <Hand
                            key={idx}
                            type={h.name}
                            score={h.score}
                            history={h.history}
                            onChange={this.onChange}
                        />)
                }
            </div>
        );
    }
};
export default Player;