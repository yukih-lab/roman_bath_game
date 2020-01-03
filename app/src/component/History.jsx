import React from 'react';
import Score from "./Score.jsx";

const History = (props) => {
    return (
        <div className='history'>
            {
                props.scores.map(
                    (s, idx) => <Score
                        key={idx}
                        type="historyItems"
                        score={s.score}
                        />
                )
            }
        </div>
    );
};
export default History;