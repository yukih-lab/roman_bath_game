'use strict';
// TODO useStateでどのようにデータを管理できるか見極めてからcore2の実装を進める。
// state は props に似ていますが、コンポーネントによって完全に管理されるプライベートなものです。
//

const _player = {
    name : null,
    scores : [
        [/* 0:left */],
        [/* 1:right */]
    ]
}
const t = (f)=> { return f;}
const f = (f)=> { return !f;}
module.exports = {
    isBreak (score) {
        return score % 5 == 0;
    },
    isLoser (player) {
        return allTrue(player.scores, isBreak);
    },
    enablePlayer (player) {
        return hasFalse(player.scores, isBreak);
    },
    hasTrue(arr, checker) {
        return hasInner(arr, checker, t);
    },
    hasFalse(arr, checker) {
        return hasInner(arr, checker, f);
    },
    hasInner(arr, checker, validCond) {
        return arr.reduce((acc, crr) => {
            if (validCond(checker)(crr)) {
                return true;
            }
            return acc;
        }, false);
    },
    allTrue(arr, checker) {
        return allInner(arr, checker, f);
    },
    allFalse(arr, checker) {
        return allInner(arr, checker, t);
    },
    allInner(arr, checker, inValidCond) {
        return arr.reduce((acc, crr) => {
            if (inValidCond(checker)(crr)) {
                return false;
            }
            return acc;
        }, true);
    },
    whoIsWinner(players) {
        let winner = whoIs(players, enablePlayer);
        if (winner.length > 1) {
            return null;
        }
        return winner;
    },
    whoIsLoser(players) {
      return whoIs(players, isLoser);
    },
    isNoSide(players) {
        return whoIsLoser(players).length > 0;
    },
    whoIs(players, checker) {
        return players.filter((player) => {return checker(player);});
    }
};
