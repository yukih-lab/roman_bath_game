import React from 'react';
import Player from "./Player.jsx";
const mod5 = (v) => v % 5; // TODO utilにまとめる
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
const getRandomIntWithIgnore = (max, ignore) => {
    let randomInt;
    while(randomInt == undefined || randomInt == ignore) {
        randomInt = getRandomInt(max);
    }
    return randomInt;
};
const getAvailableHandType = (player) => {
    let toScoreIdx = getRandomInt(player.hands.length);
    let nextScoreBefore = player.hands[toScoreIdx].score;
    let loopLimit = player.hands.length;
    while (nextScoreBefore == 0 && loopLimit > 0) {
        toScoreIdx = getRandomIntWithIgnore(player.hands.length, toScoreIdx);
        nextScoreBefore = player.hands[toScoreIdx].score;
        loopLimit--;
    }
    return player.hands[toScoreIdx].type;
};
const getPlayerIdx = (players, name) => {
    return players.findIndex(p => p.name == name);// TODO IE 非対応
};
const getHandScore = (hands, type) => {
    return hands[hands.findIndex(h => h.type == type)].score;
};
const isBreak = (player) => {
    let breakHands = player.hands.filter(h => h.score % 5 == 0);
    return breakHands.length == player.hands.length;
};
const getTurnAfterHands = (player, type, attackScore) => {
    return player.hands.map(h => {
            h.history.unshift({score: h.score});
            if (type == h.type) {
                h.score = mod5(h.score + attackScore);
            }
            return h;
        });
};
const user = "user";
const opponent = "opponent";
class Stage extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            turnIdx : 0,
            attacker : user,
            players : [
                { name : user,
                  hands : [
                      {type : "left" , score : 1, history : []},
                      {type : "right" , score : 1, history : []}
                  ]},
                { name : opponent,
                  hands : [
                      {type : "left" , score : 1, history : []},
                      {type : "right" , score : 1, history : []}
                  ]}]
        };
        this.onChangeTurn = this.onChangeTurn.bind(this);
    }
    onChangeTurn(name, type, fromType) {
        // TODO 攻撃者がだれかは、Stageが知っているから、どの手が攻撃してきたかを判定すればよい
        // TODO name == attackerの場合、自分攻撃と判断できる。
        if (this.state.attacker == name) {
            console.log("self attacked");
            return;
        }

        let players = this.state.players;
        // turnAfter process
        // attacker
        let attacker = players[getPlayerIdx(players, this.state.attacker)];
        let attackScore = getHandScore(attacker.hands, fromType);
        // attacked
        let attackedPlayer = players[getPlayerIdx(players, name)];
        let attackedHandScore = getHandScore(attackedPlayer.hands, type);
        if (attackedHandScore == 0) {
            console.log("target hand is zero. its disabled attacked.");
            return;
        }
        attackedPlayer.hands = getTurnAfterHands(attackedPlayer, type, attackScore);
        players[getPlayerIdx(players, name)] = attackedPlayer;

        // すべてのHandsが使用不可の場合、敗北と判定
        if (isBreak(attackedPlayer)) {
            this.props.setAppStatus(9);// TODO 定数化
            console.log(attackedPlayer.name, " before Players isBreak");
            return;
        }

        // change turn process
        let idx = this.state.turnIdx;
        idx++;
        let fromIdx = idx % players.length; // automation attack process
        let fromPlayer =  players[fromIdx];
        this.setState({turnIdx : idx, players : players, attacker : fromPlayer.name});

        if (fromPlayer.name != user) {
            // user 以外の場合、攻撃の自動化
            setTimeout((function() {
                // 攻撃可能な値
                let fromHandType = getAvailableHandType(fromPlayer);
                // 被攻撃相手(TODO 生存している人に絞る）
                let toPlayer = players[getRandomIntWithIgnore(players.length, fromIdx)];
                let toHandType = getAvailableHandType(toPlayer);
                this.onChangeTurn(toPlayer.name, toHandType, fromHandType);
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
                            canAttack={ this.state.attacker == p.name && p.name == user }
                            onChangeTurn = {this.onChangeTurn}
                        />)
                }
            </div>
        )
    };
};
export default Stage;