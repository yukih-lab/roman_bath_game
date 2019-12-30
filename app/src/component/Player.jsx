import React from 'react';
import Hand from "./Hand.jsx";
class Player extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={'player ' + this.props.type}>
                <Hand type="right" />
                <Hand type="left" />
            </div>
        );
    }
};
export default Player;