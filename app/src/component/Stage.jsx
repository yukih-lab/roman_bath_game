import React from 'react';
import Player from "./Player.jsx";
const mod5 = (v) => v % 5; // TODO utilにまとめる
const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
const getRandomIntWithIgnore = (max, ignores) => {
    if (Array.isArray(ignores) == false) {
        ignores = [ignores];
    }
    if (max < ignores.length) {
        throw Error("illegalArgumentsException.");
    }
    let retInt;
    while(true) {
        console.log("getRandomIntWithIgnore");
        let randomInt = getRandomInt(max);
        if (ignores.findIndex((idx) => idx == randomInt) < 0) {
            retInt = randomInt;
            break;
        }
    }
    return retInt;
};
const getAvailableHandType = (player) => {
    let loopLimit = player.hands.length;
    let ignores = [];
    let toScoreIdx;
    while (loopLimit >= 0) {
        try {
            toScoreIdx = getRandomIntWithIgnore(loopLimit, ignores);
            if(player.hands[toScoreIdx].score > 0) {
                break;
            }
            ignores.push(toScoreIdx);
        } catch (e) { /* NOP */ }
        loopLimit--;
    }
    return player.hands[toScoreIdx].type;
};
const getPlayerIdx = (players, name) => {
    return players.findIndex(p => p.name == name);// TODO IE 非対応
};
const getHandScore = (hands, type) => {
    return hands[hands.findIndex(h => h.type == type)].score;// TODO IE 非対応
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
    onChangeTurn(toName, toType, fromType) {
        // toName == attackerの場合、自分攻撃と判断
        if (this.state.attacker == toName) {
            this.props.setAppStatus(5);// TODO 定数化
            console.log("self attacked");
            return;
        }

        let players = this.state.players;
        // turnAfter process
        // attacked
        let toP = players[getPlayerIdx(players, toName)];
        let toHandScore = getHandScore(toP.hands, toType);
        if (toHandScore == 0) {
            console.log("target hand is zero. its disabled attacked.");
            return;
        }
        // attacker
        let fromP = players[getPlayerIdx(players, this.state.attacker)];
        let fromHandScore = getHandScore(fromP.hands, fromType);
        toP.hands = getTurnAfterHands(toP, toType, fromHandScore);
        players[getPlayerIdx(players, toName)] = toP;

        // すべてのHandsが使用不可の場合、敗北と判定
        if (isBreak(toP)) {
            this.props.setAppStatus(9);// TODO 定数化
            console.log(toP.name, " before Players isBreak");
            return;
        }

        // change turn process
        let idx = this.state.turnIdx;
        idx++;
        let fromIdx = idx % players.length; // automation attack process
        fromP =  players[fromIdx];
        this.setState({turnIdx : idx, players : players, attacker : fromP.name});

        // TODO 以下の処理は別メソッドにするなど
        if (fromP.name != user) {
            // user 以外の場合、攻撃の自動化
            setTimeout((function() {
                // 攻撃可能な値
                let fromHandType = getAvailableHandType(fromP);
                // 被攻撃相手(TODO 生存している人に絞る）
                toP = players[getRandomIntWithIgnore(players.length, fromIdx)];
                let toHandType = getAvailableHandType(toP);
                this.onChangeTurn(toP.name, toHandType, fromHandType);
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