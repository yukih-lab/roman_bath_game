import React, {useState} from 'react';
import Score from "./Score.jsx";

const History = (props) => {
    const [scores] = useState([
        {type : null, score : 1},
        {type : null, score : 1},
        {type : null, score : 1},
        {type : null, score : 1},
        {type : null, score : 1},
        {type : null, score : 1},
        {type : null, score : 1},
        {type : null, score : 1},
    ]);
    return (
        <div className={'history'}>
            {scores.map(s => <Score score={s.score} draggable={false} />)}
        </div>
    );
};
export default History;