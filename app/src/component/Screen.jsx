import React, { Fragment } from 'react';
import core from "../core.js";

const Screen = (props) => {
    const {appStatus} = props;

    const drewImageSrc = () => {
        let src;
        switch (appStatus) {
            case 1:
            default:
                src = "https://placehold.jp/430x200.png";
                break;
        }
        return src;
    };

    const drewMessage = () => {
        let msg;
        switch (appStatus) {
            case core.STATUS.INIT:
                msg = "開始";
                break;
            case core.STATUS.USER_SIDE:
                msg = "君の番だ。";
                break;
            case core.STATUS.OPPONENT_SIDE:
                msg = "さぁ、私が攻めるぞ。";
                break;
            case core.STATUS.YOU_WIN:
                msg = "君はたいした男だ。今度のガリア遠征に参加しないか？";
                break;
            case core.STATUS.YOU_LOSS:
                msg = "君の負けだ。";
                break;
            case core.STATUS.DRAW:
                msg = "こんなことしてる場合じゃない！！ガリア人が反乱を起こしたというではないか！！！";
                break;
            case core.STATUS.SELF_ATTACK:
                msg = "若人よ、自分を責めるな。";
                break;
            default:
                throw Error("illegalArgumentsException")
                break;
        }
        return msg;
    };

    return (
        <div className="screen">
            <img src={drewImageSrc()} title="dummy"/>
            <div className="message">{drewMessage()}</div>
        </div>
    );
};
export default Screen;