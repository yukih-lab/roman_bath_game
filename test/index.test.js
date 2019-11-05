'use strict';

// TODO コードの整理整頓
// TODO テストデータとの突合せも実施

const rmg = require('../app');
// シナリオ実行
function entryPointScenario() {
    let scenarios = [];
    for (let s1 of rmg.strategyIds()) {
        for (let s2 of rmg.strategyIds()) {
            for (let s3 of rmg.strategyIds()) {
                for (let s4 of rmg.strategyIds()) {
                    for (let s5 of rmg.strategyIds()) {
                        scenarios.push([s1, s2, s3, s4, s5])
                    }
                }
            }
        }
    }

    // TODO over scenario lengthのシナリオのみ、再度パターン実行して検証できるようにする。
    // シナリオ実行
    let results = scenarios.reduce((acc, scenario, idx) => {
        let pA = rmg.createPlayer("a");
        let pB = rmg.createPlayer("b");

        let turn = 1;
        let result = {idx : idx, scenario : scenario, winner : null, message : null, score : []};

        // 勝負がつくまでループ
        while(!rmg.isNoSide(pA, pB)) {
            // 先攻
            {
                try {
                    rmg.doStrategy(pA, pB, scenario[turn * 2 - 2]);
                    result.score.push(getTurnHalf(turn, pA.name, pA, pB));
                } catch (e) {
                    result.message = e.message;
                    break;
                }
            }

            // 後攻
            if (!rmg.isLoss(pB)) {
                try {
                    rmg.doStrategy(pB, pA, scenario[turn * 2 - 1]);
                    result.score.push(getTurnHalf(turn, pB.name, pA, pB));
                } catch (e) {
                    result.message = e.message;
                    break;
                }
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


//    results.filter((result) => result.winner == "a").forEach(outResult);
//    results.filter((result) => result.winner == "b").forEach(outResult);
    results.filter((result) => !result.winner).forEach(outResult);
};

// スコアを取得
function getTurnHalf(turn, turnUser, p1, p2) {
    let per5 = (v) => v % 5;
    return [turn, turnUser, per5(p1.l), per5(p1.r), per5(p2.l), per5(p2.r)];
};

// 結果出力
function outResult(result) {
    console.log(result.idx, result.winner, result.message, result.scenario);
    result.score.forEach((turnHalf) => console.log(turnHalf));
};

// オートマティック版
function entryPointAutomatic() {
    let pA = rmg.createPlayer("a");
    let pB = rmg.createPlayer("b");

    let strategyIds = rmg.strategyIds();

    let turn = 1;

    // 勝負つくまでループ
    while(!rmg.isNoSide(pA, pB)) {
        // 先攻
        {
            rmg.doStrategyAutomatic(pA, pB, strategyIds[turn % 4]);
            outLog("after turn A", pA, pB);
        }

        // 後攻
        if (!rmg.isLoss(pB)) {
            rmg.doStrategyAutomatic(pB, pA, strategyIds[turn % 4]);
            outLog("after turn B", pA, pB);
        }
        // ターン加算
        turn++;
    }

    if (rmg.isLoss(pB)) {
        console.log(pA.name + " win!");
    } else if (rmg.isLoss(pA)) {
        console.log(pB.name + " win!");
    } else {
        console.log("draw");
    }
};

// ログ出力
function outLog(title, p1, p2) {
    let per5 = (v) => v % 5;
    console.log(title,
        per5(p1.l),
        per5(p1.r),
        per5(p2.l),
        per5(p2.r));
};

// 実行
entryPointScenario();
// entryPointAutomatic();
