import React from 'react';
import Score from "./Score.jsx";
import History from "./History.jsx";

const Hand = (props) => {
    const {
        type,
        score,
        canAttack,
        history
    } =  props;
    const onChange = (fromHandType) => {
        props.onChange(type, fromHandType);
    }
    return (
        <div className={"hand " + type}>
            <Score type={score % 5 == 0 ? "break" : "current"}
                   score={score}
                   canAttack={canAttack}
                   onChange={onChange}/>
            <History scores={history}/>
        </div>
    );
};
export default Hand;