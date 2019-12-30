import React from 'react';
import Score from "./Score.jsx";

class History extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='history'>
                {
                    this.props.scores.map(
                        (s, idx) => <Score key={idx} score={s.score} draggable={false} />
                        )
                }
            </div>
        );
    }
};
export default History;