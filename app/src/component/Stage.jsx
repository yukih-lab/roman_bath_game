import React from 'react';
import Player from "./Player.jsx";

const Stage = (props) => {
    return (
        <div className="stage">
            <Player type="user"/>
            <Player type="opponent"/>
        </div>
    );
};
export default Stage;