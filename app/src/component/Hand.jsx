import React from 'react';
import Score from "./Score.jsx";
import History from "./History.jsx";

const Hand = (props) => {
    return (
        <div className={"hand " + props.type}>
            <Score type="current" score="1"/>
            <History />
        </div>

    );
};
export default Hand;