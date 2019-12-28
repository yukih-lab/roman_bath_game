import React from 'react';
import Hand from "./Hand.jsx";

const Player = (props) => {
    return (
        <div className={'player ' + props.type}>
            <Hand type="right" />
            <Hand type="left" />
        </div>
    );
};
export default Player;