'use strict';

const rbg = require('../app/src/core');

const _md5 = function() {
    let targetFunc = settingFunc(rbg.mod5);
    let max = 16;
    for (let i = 0; i < max; i++ ) {
       let predicate = (v) =>  v == i % 5;
       console.log(
           "param", i,
           test(targetFunc(i), predicate));
    }
};
const _getRandomInt = function() {
    let targetFunc = settingFunc(rbg.getRandomInt);
    let max = 16;
    for (let i = 0; i < max; i++ ) {
        let predicate = (v) => 0 <= v && v <= i;
        console.log("param", i, test(targetFunc(i), predicate));
    }
};
// TODO 重点的にテストしたいメソッド、 テストコードを検討する
const _getRandomIntWithIgnore =  function() {
    let targetFunc = settingFunc(rbg.getRandomIntWithIgnore, rbg);
    let max = 100;
    let ignores = [];
    for (let i = 0; i < max; i++ ) {
        let predicate = (v) => (0 <= v) && (v <= max) && (v != i);
        console.log("param", i,
            test(targetFunc(max, ignores), predicate));
        ignores.push(i);
    }
};

function settingFunc(func, context) {
    return function() {
        let args = [...arguments];
        return function() {
            if (context) {
                func = func.bind(context);
            }
            return func.apply(null, args);
        };
    };
}

function test(func, predicate){
    return (predicate(func()) ? "OK" : "NG") + " : " + func();
}

// _md5();
// _getRandomInt();
_getRandomIntWithIgnore();
