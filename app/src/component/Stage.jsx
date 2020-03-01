import React from 'react';
import Player from "./Player.jsx";
import core from "../core.js";

const user = "user";
const opponent = "opponent";
class Stage extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            turnIdx : 0,
            attacker : user,
            players : [
                core.createPlayer(user),
                core.createPlayer(opponent)
                ]
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
        // toP 被攻撃側
        let toP = core.getPlayer(players, toName);
        if (core.getHandScore(toP, toType) == 0) {
            console.log("target hand is zero. its disabled attacked.");
            return;
        }
        // fromP 攻撃側
        let fromP = core.getPlayer(players, this.state.attacker);
        // toPに対しfromPの攻撃を適用
        toP.hands = core.getTurnAfterHands(
            toP.hands,
            toType,
            core.getHandScore(fromP, fromType));

        // playersにtoPの変更を適用
        core.applyPlayers(players, toP);

        // すべてのHandsが使用不可の場合、敗北と判定
        if (core.isBreak(toP)) {
            this.props.setAppStatus(9);// TODO 定数化
            console.log(toP.name, " before Players isBreak");
            return;
        }

        // change turn
        let idx = this.state.turnIdx;
        idx++;
        fromP =  core.getTurnPlayer(players, idx);
        this.setState({turnIdx : idx, players : players, attacker : fromP.name});

        if (fromP.name != user) {
            // user 以外の場合、攻撃の自動化
            setTimeout((function() {
                toP = core.getPlayerWithIgnore(players, fromP);
                this.onChangeTurn(toP.name,
                    core.getAvailableHandType(toP),
                    core.getAvailableHandType(fromP));
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