import React from 'react';

const getHandType = (classSelector) => {
    let regex = /(left|right)/g;
    return classSelector.match(regex)[0];
};

const Score = (props) => {
    const {
        type,
        canAttack,
        score
    } = props;

    const onDragStart = (e) => {
        let handType = getHandType(e.target.parentNode.className);
        e.dataTransfer.setData("text/plain", handType);
        e.dataTransfer.dropEffect = "copy";
    }

    const onDragOver = (e) => {
        e.preventDefault();
    }

    const onDragStop = (e) => {
        let handType = e.dataTransfer.getData("text/plain");
        props.onChange(handType);
    }

    return (
        <div className={"score " + type}
             draggable={canAttack}
             onDragStart={onDragStart}
             onDragOver={onDragOver}
             onDrop={onDragStop}>
            {score}
        </div>
    );
};

export default Score;