import React, { useState, useEffect } from 'react';
import Player from "./Player.jsx";
import core from "../core.js";

const user = "user";
const opponent = "opponent";
const Stage = (props) => {
    const [turnIdx, setTurn] = useState(0);
    const [attacker, setAttacker] = useState(user);
    const [players, setPlayers] = useState([
        core.createPlayer(user),
        core.createPlayer(opponent)
    ]);

    const onChangeTurn = (toName, toType, fromType) => {
        // toName == attackerの場合、自分攻撃と判断
        console.log(turnIdx ,attacker, toName);
        if (attacker == toName) {
            props.setAppStatus(core.STATUS.SELF_ATTACK);
            console.log("self attacked");
            return;
        }

        // TODO ヒストリーからドロー判定、おんなじパターンループが複数続けば

        // turnAfter process
        // toP 被攻撃側
        let toP = core.getPlayer(players, toName);
        if (core.getHandScore(toP, toType) == 0) {
            console.log("target hand is zero. its disabled attacked.");
            return;
        }
        // fromP 攻撃側
        let fromP = core.getPlayer(players, attacker);
        // toPに対しfromPの攻撃を適用
        toP.hands = core.getTurnAfterHands(
            toP.hands,
            toType,
            core.getHandScore(fromP, fromType));

        // すべてのHandsが使用不可の場合、敗北と判定
        if (core.isBreak(toP)) {
            if (toP.name == user) {
                props.setAppStatus(core.STATUS.YOU_LOSS);
            } else {
                props.setAppStatus(core.STATUS.YOU_WIN);
            }
            console.log(toP.name, " before Players isBreak");
            return;
        }

        // playersにtoPの変更を適用
        let _players = core.deepCopyPlayers(players);
        core.applyPlayers(_players, toP);

        // change turn
        let idx = turnIdx;
        idx++;
        fromP = core.getTurnPlayer(players, idx);
        setTurn(idx);
        setAttacker(fromP.name);
        setPlayers(_players);

        console.log("argument", idx, fromP.name);
    }
    // TODO 潜在的なバグ、 onChangeTurn実行時に players, turnIdxが更新されていなかった場合
    useEffect(() => {
        if (attacker != user) {
            // user 以外の場合、攻撃の自動化
            props.setAppStatus(core.STATUS.OPPONENT_SIDE);
            setTimeout((function () {
                let fromP = core.getPlayer(players, attacker);
                let toP = core.getPlayerWithIgnore(players, fromP);
                onChangeTurn(toP.name,
                    core.getAvailableHandType(toP),
                    core.getAvailableHandType(fromP));
            }), 1500);
        } else {
            props.setAppStatus(core.STATUS.USER_SIDE);
        }
    }, [attacker]);

    return (
        <div className="stage">
            {
                players.map(
                    (p, idx) => <Player
                        key={idx}
                        name={p.name}
                        hands={p.hands}
                        canAttack={p.name == user && attacker == user}
                        onChangeTurn={onChangeTurn}
                    />)
            }
        </div>
    );
};
export default Stage;