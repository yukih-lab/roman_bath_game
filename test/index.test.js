'use strict';
// TODO APIで提供するメリットを感じない。軽いロジックなのでサーバではなく画面で処理すればよい。
// TODO 画面実行のデモ
//      ターン毎/通知
//      pA ユーザ１
//         アクション From:右手？左手？ -> To:右手？左手？　計４パターン
//         相手の状況によっては一択
//      pB コンピュータ(auto) | ユーザ２ <- 切り替えは可能か？
//
// TODO シナリオ実行
//      ゲーム毎
//      動作シナリオを実行して結果を得る
//
// TODO プロトタイプの移植
//      ゲーム毎
//      現行のプロトタイプ部を移植
// TODO 上記を踏まえて方針
//      画面実行デモのためのモジュールを作る(モジュール化の優先度は低）
//
const rmg = require('../app/index.js');
// シナリオ実行
function entryPointScenario() {
    let scenarios = [];
    rmg.strategyIds.forEach((crr1) => {
        rmg.strategyIds.forEach((crr2) => {
             rmg.strategyIds.forEach((crr3) => {
                 rmg.strategyIds.forEach((crr4) => {
                     rmg.strategyIds.forEach((crr5) => {
                         scenarios.push([crr1, crr2, crr3, crr4, crr5])
                     });
                 });
            });
        });
    });

   // console.log(scenarios);

    // シナリオ実行
    let results = scenarios.reduce((acc, scenario, idx) => {
        let pA = Object.assign({name : "a"}, rmg.player);
        let pB = Object.assign({name : "b"}, rmg.player);

        let turn = 1;
        let result = {idx : idx, scenario : scenario, winner : null, message : null, score : []};

        // 勝負がつくまでループ
        while(!rmg.isNoSide(pA, pB)) {
            // 先攻
            {
                let nextStrategyId = scenario[turn * 2 - 2];
                if (nextStrategyId == null) {
                    result.message = "over scenario length.";
                    break;
                }
                if(rmg.unUsableStrategy(pA, pB, nextStrategyId)) {
                    result.message = "illegal pattern :" + nextStrategyId;
                    break;
                }
                rmg.getStrategy(nextStrategyId)(pA, pB);
                result.score.push(getTurnHalf(turn, pA.name, pA, pB));
            }

            // 後攻
            if (!rmg.isLoss(pB)) {
                let nextStrategyId = scenario[turn * 2 - 1];
                if (nextStrategyId == null) {
                    result.message = "over scenario length.";
                    break;
                }
                if(rmg.unUsableStrategy(pB, pA, nextStrategyId)) {
                    result.message = "illegal pattern :" + nextStrategyId;
                    break;
                }
                rmg.getStrategy(nextStrategyId)(pB, pA);
                result.score.push(getTurnHalf(turn, pB.name, pA, pB));
            }
            // ターン加算
            turn++;
        }

        if (rmg.isLoss(pB)) {
            result.winner = pA.name;
        } else if (rmg.isLoss(pA)) {
            result.winner = pB.name;
        }
        acc.push(result);
        return acc;
    }, []);


    results.filter((result) => result.winner == "a").forEach(outResult);
    results.filter((result) => result.winner == "b").forEach(outResult);
//    results.filter((result) => !result.winner).forEach(outResult);
};
function outResult(result) {
    console.log(result.idx, result.winner, result.message, result.scenario);
    result.score.forEach((turnHalf) => console.log(turnHalf));
};
// 以下、外部処理
function entryPointProtoType() {
    let pA = Object.assign({name : "a"}, rmg.player);
    let pB = Object.assign({name : "b"}, rmg.player);

    let turn = 1;

    // 勝負がつくまでループ
    while(!rmg.isNoSide(pA, pB)) {

        // 先攻
        {
            let nextStrategyId = rmg.strategyIds[(turn) % 4];
            if(rmg.unUsableStrategy(pA, pB, nextStrategyId)) {
                console.log("illegal pattern.");
                break;
            }
            rmg.getStrategy(nextStrategyId)(pA, pB);
            outLog("after turn A", pA, pB);
        }

        // 後攻
        if (!rmg.isLoss(pB)) {
            let nextStrategyId = rmg.strategyIds[(turn) % 4];
            if(rmg.unUsableStrategy(pB, pA, nextStrategyId)) {
                console.log("illegal pattern.");
                break;
            }
            rmg.getStrategy(nextStrategyId)(pB, pA);
            outLog("after turn B", pA, pB);
        }
        // ターン加算
        turn++;
    }

    if (rmg.isLoss(pB)) {
        console.log(pA.name + " win!");
    } else {
        console.log(pB.name + " win!");
    }
};

function entryPointAutomatic() {
    let pA = Object.assign({name : "a"}, rmg.player);
    let pB = Object.assign({name : "b"}, rmg.player);

    let turn = 1;

    // 勝負つくまでループ
    while(!rmg.isNoSide(pA, pB)) {
        // 先攻
        {
            doOwnStrategy(pA, pB, turn);
            outLog("after turn A", pA, pB);
        }

        // 後攻
        if (!rmg.isLoss(pB)) {
            doOwnStrategy(pB, pA, turn);
            outLog("after turn B", pA, pB);
        }
        // ターン加算
        turn++;
    }

    if (rmg.isLoss(pB)) {
        console.log(pA.name + " win!");
    } else {
        console.log(pB.name + " win!");
    }
};

function doOwnStrategy(pFrom, pTo, turn) {
    let nextStrategyId = rmg.strategyIds[(turn) % 4];
    // 攻め手が決まるまでループ
    // 攻め手の決定
    // 係数
    let coefficient = 0;
    while(rmg.unUsableStrategy(pFrom, pTo, nextStrategyId)) {
        //  攻め手利用不可の場合、攻め手の変更
        coefficient++;
        nextStrategyId = rmg.strategyIds[(turn + coefficient) % 4];
    }
    // 攻め手を実行
    rmg.getStrategy(nextStrategyId)(pFrom, pTo);
};
function getTurnHalf(turn, turnUser, p1, p2) {
    let per5 = (v) => v % 5;
    return [turn, turnUser, per5(p1.l), per5(p1.r), per5(p2.l), per5(p2.r)];
};
function outLog(title, p1, p2) {
    let per5 = (v) => v % 5;
    console.log(title,
        per5(p1.l),
        per5(p1.r),
        per5(p2.l),
        per5(p2.r));
};

// 実行
// entryPointProtoType();
// entryPointAutomatic();
entryPointScenario();
