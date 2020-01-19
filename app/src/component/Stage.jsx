import React from 'react';
import Player from "./Player.jsx";

class Stage extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            turnIdx : 0,
            players : [
                { name : "user", isBreak : false },
                { name : "opponent", isBreak : false } ]
        };
        this.onChangeTurn = this.onChangeTurn.bind(this);
        this.setPlayersStatus = this.setPlayersStatus.bind(this);
    }
    onChangeTurn(name, isBreak) {
        let idx = this.state.turnIdx;
        idx++;
        this.setState({turnIdx : idx});
        if (isBreak) {
            this.setPlayersStatus(name, isBreak);
        }
    }
    setPlayersStatus (name, isBreak) {
        let players = this.state.players;
        players.filter(p => name == p.name)
            .map(p =>  p.isBreak = isBreak);
        this.setState({ players : players });
//        throw Error("illegal Argument Exception");
    }
    render() {
        return (
            <div className="stage">
                {
                    this.state.players.map(
                        (p, idx) => <Player
                            key={idx}
                            name={p.name}
                            onChangeTurn = {this.onChangeTurn}
                        />)
                }
            </div>
        )
    };
};
export default Stage;