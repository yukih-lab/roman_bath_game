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
            case core.STATUS.YOU_WIN:
                msg = "君はたいした男だ。今度のローマ軍の遠征に参加しないか？";
                break;
            case core.STATUS.YOU_LOSS:
                msg = "君の負けだ。";
                break;
            case core.STATUS.DRAW:
                msg = "いつまでやる？もうやめよう";
                break;
            case core.STATUS.SELF_ATTACK:
                msg = "自分に攻撃しちゃダメでしょ";
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