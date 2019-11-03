'use strict';

// data 定義
const player = {
    l : 1,
    r : 1,
    isLoss : function() {
        return isBreak(this.l) && isBreak(this.r);
        },
    getStrategy : function(id) {
        switch (id) {
            case "ll":
                return applyLFunc(this.l);
            case "lr":
                return applyRFunc(this.l);
            case "rl":
                return applyLFunc(this.r);
            case "rr":
                return applyRFunc(this.r);
            default:
                throw new Error("Illegal Parameter id : " + id)
                process.exit(1);
        }
    }
};
const strategyIds = [ "ll", "lr", "rl", "rr"];

let entryPoint = function() {
    let pA = Object.assign({name : "a"}, player);
    let pB = Object.assign({name : "b"}, player);

    let turn = 1;

    // いずれかが負けるまでループ
    while(!pA.isLoss() && !pB.isLoss()) {
        // 先攻
        doOnesStrategy(pA, pB, turn);

        outLog("after turn A", pA, pB);

        // 後攻
        if (!pB.isLoss()) {
            doOnesStrategy(pB, pA, turn);
            outLog("after turn B", pA, pB);
        }
        // ターン加算
        turn++;
    }

    if (pB.isLoss()) {
        console.log(pA.name + " win!");
    } else {
        console.log(pB.name + " win!");
    }
};

let outLog = function(title, p1, p2) {

    console.log(title,
        p1.l % 5,
        p1.r % 5,
        p1.l % 5,
        p2.r % 5);
};

let doOnesStrategy = function (p1, p2, turn) {
    // 次戦略IDの取得
    let nextStrategyId = strategyIds[(turn) % 4];
    // 攻め手が決まるまでループ
    // 攻め手の決定
    // 係数
    let coefficient = 0;
    while(unUsableStrategy(p1, p2, nextStrategyId)) {
        //  攻め手利用不可の場合、攻め手の変更
        coefficient++;
        nextStrategyId = strategyIds[(turn + coefficient) % 4];
    }
    // 攻め手を実行
    p1.getStrategy(nextStrategyId)(p2);
};

let applyLFunc = function (v) {
    return function (p) {
        p.l += v;
    };
};
let applyRFunc = function (v) {
    return function (p) {
        p.r += v;
    };
};

let unUsableStrategy = function (pFrom, pTo, strategyId) {
    // 攻め手の利用不可のケース判定
    //   自身の攻め手が使用不可
    // 　または
    //   攻撃対象の相手方の手が使用不可
    let from = strategyId.charAt(0);
    let to = strategyId.charAt(1);
    return isBreak(pFrom[from]) || isBreak(pTo[to]);
};
let isBreak = function (v) {
    return v % 5 == 0;
};

// TODO 値を渡すのではなく、関数を渡したい。　isBreak, apply[LR]Func
// TODO パターン実行ができるようにする

// 実行
entryPoint();
