import React from 'react';
import Player from "./Player.jsx";
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
const getRandomIntWithIgnore = (max, ignore) => {
    let randomInt;
    while(randomInt == undefined || randomInt == ignore) {
        randomInt = getRandomInt(max);
    }
    return randomInt;
};
class Stage extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            turnIdx : 0,
            players : [
                { name : "user",
                  hands : [
                      {type : "left" , score : 1, history : []},
                      {type : "right" , score : 1, history : []}
                  ]},
                { name : "opponent",
                  hands : [
                      {type : "left" , score : 1, history : []},
                      {type : "right" , score : 1, history : []}
                  ]}]
        };
        this.onChangeTurn = this.onChangeTurn.bind(this);
    }
    onChangeTurn(name, type, score) {
        // TODO リファクタリング

        let players = this.state.players;
        // turnAfter process
        let attackedIdx = players.findIndex(p => p.name == name); // TODO IE 非対応
        let attackedPlayers = players[attackedIdx];
        let hands = attackedPlayers.hands
            .map(h => {
                h.history.unshift({score: h.score});
                if (type == h.type) {
                    h.score = score;
                }
                return h;
           });
        attackedPlayers.hands = hands;
        players[attackedIdx] = attackedPlayers;

        // すべてのHandsが使用不可の場合、敗北と判定
        let breakHands = attackedPlayers.hands.filter(h => h.score % 5 == 0);
        let isBreak = breakHands.length == attackedPlayers.hands.length;
        if (isBreak) {
            console.log(attackedPlayers.name, " before Players isBreak");
        }

        // change turn process
        let idx = this.state.turnIdx;
        idx++;
        this.setState({turnIdx : idx, players : players});

        // automation attack process
        let fromIdx = idx % players.length;
        let fromPlayer = players[fromIdx];
        if (fromPlayer.name != "user") {
            setTimeout((function() {
                let fromScoreIdx = getRandomInt(fromPlayer.hands.length);
                let toIdx = getRandomIntWithIgnore(players.length, fromIdx);
                let toPlayer = players[toIdx];
                let toScoreIdx = getRandomInt(toPlayer.hands.length);
                let nextType = toPlayer.hands[toScoreIdx].type;
                let nextScore = toPlayer.hands[toScoreIdx].score + fromPlayer.hands[fromScoreIdx].score;
                this.onChangeTurn(toPlayer.name, nextType, nextScore);
            }).bind(this), 1500);
        }
    }

    render() {
        return (
            <div className="stage">
                {
                    this.state.players.map(
                        (p, idx) => <Player
                            key={idx}
                            name={p.name}
                            hands={p.hands}
                            canAttack={ this.props.turnIdx % this.state.players.length == 0 }
                            onChangeTurn = {this.onChangeTurn}
                        />)
                }
            </div>
        )
    };
};
export default Stage;