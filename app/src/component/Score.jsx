import React from 'react';

const Score = (props) => {
    return (
        <div className={"score " + props.type} draggable={props.draggable}>
            {props.score}
        </div>
    );
};
export default Score;