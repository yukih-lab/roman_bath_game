'use strict';

const rbg = require('../app/src/core');
// シナリオ実行
function entryPointScenario() {
    let scenarios = [];
    for (let s1 of rbg.strategyIds()) {
        for (let s2 of rbg.strategyIds()) {
            for (let s3 of rbg.strategyIds()) {
                for (let s4 of rbg.strategyIds()) {
                    for (let s5 of rbg.strategyIds()) {
                        scenarios.push([s1, s2, s3, s4, s5])
                    }
                }
            }
        }
    }

    // TODO over scenario lengthのシナリオのみ、再度パターン実行して検証できるようにする。
    // シナリオ実行
    let results = scenarios.reduce((acc, scenario, idx) => {
        let pA = rbg.createPlayer("a");
        let pB = rbg.createPlayer("b");

        let turn = 1;
        let result = {idx : idx, scenario : scenario, winner : null, message : null, score : []};

        // 勝負がつくまでループ
        while(!rbg.isNoSide(pA, pB)) {
            // 先攻
            {
                try {
                    rbg.doStrategy(pA, pB, scenario[turn * 2 - 2]);
                    result.score.push(getTurnHalf(turn, pA.name, pA, pB));
                } catch (e) {
                    result.message = e.message;
                    break;
                }
            }

            // 後攻
            if (!rbg.isLoss(pB)) {
                try {
                    rbg.doStrategy(pB, pA, scenario[turn * 2 - 1]);
                    result.score.push(getTurnHalf(turn, pB.name, pA, pB));
                } catch (e) {
                    result.message = e.message;
                    break;
                }
            }
            // ターン加算
            turn++;
        }

        if (rbg.isLoss(pB)) {
            result.winner = pA.name;
        } else if (rbg.isLoss(pA)) {
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
    let pA = rbg.createPlayer("a");
    let pB = rbg.createPlayer("b");

    let strategyIds = rbg.strategyIds();

    let turn = 1;

    // 勝負つくまでループ
    while(!rbg.isNoSide(pA, pB)) {
        // 先攻
        {
            rbg.doStrategyAutomatic(pA, pB, strategyIds[turn % 4]);
            outLog("after turn A", pA, pB);
        }

        // 後攻
        if (!rbg.isLoss(pB)) {
            rbg.doStrategyAutomatic(pB, pA, strategyIds[turn % 4]);
            outLog("after turn B", pA, pB);
        }
        // ターン加算
        turn++;
    }

    if (rbg.isLoss(pB)) {
        console.log(pA.name + " win!");
    } else if (rbg.isLoss(pA)) {
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
entryPointAutomatic();
