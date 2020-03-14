import React from 'react';
import Hand from "./Hand.jsx";

const Player = (props) => {
    const {
        name,
        hands,
        canAttack
    } = props;
    const onChange = (toHandType, fromHandType) => {
        props.onChangeTurn(name, toHandType, fromHandType);
    }
    return (
        <div className={'player ' + name}>
            {
                hands.map(
                    (h, idx) => <Hand
                        key={idx}
                        type={h.type}
                        score={h.score}
                        history={h.history}
                        canAttack={canAttack}
                        onChange={onChange}
                    />)
            }
        </div>
    );
};
export default Player;