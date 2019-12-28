import React from 'react';

const Score = (props) => {
    return (
        <div className={"score " + props.type} draggable={true}>
            {props.score}
        </div>
    );
};
export default Score;