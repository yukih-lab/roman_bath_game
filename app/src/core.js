'use strict';

const _player = { hands : [] }
const _hand = { score : 1, history : []};

module.exports = {
    // TODO リファクタリング、コード見直しが必要
    // TODO objectプロパティとしてのメソッド定義と、オブジェクトのビルドインメソッド定義とでどのような違いがあるのか？
    //             this 参照が必要な場合、ビルドインメソッドとして定義すべきのようだ
    createPlayer (name) {
        let p = Object.assign({name : name}, JSON.parse(JSON.stringify(_player)));
        p.hands.push(this.createHand("left"));
        p.hands.push(this.createHand("right"));
        return p;
    },

    createHand (type) {
        return Object.assign(
            {type : type},
            JSON.parse(JSON.stringify(_hand)));
    },

    mod5: (v) => v % 5,
    // max値未満の値しか返却しなくなるためmax + 1をる
    getRandomInt: max => Math.floor(Math.random() * Math.floor(max + 1)),

    getRandomIntWithIgnore (max, ignores) {
        if (Array.isArray(ignores) == false) {
            ignores = [ignores];
        }
        if (max < ignores.length) {
            throw Error("illegalArgumentsException.");
        }
        let retInt;
        while (true) {
            let randomInt = this.getRandomInt(max);
            if (ignores.findIndex((idx) => idx == randomInt) < 0) {
                retInt = randomInt;
                break;
            }
        }
        return retInt;
    },

    getPlayerWithIgnore(players, ignoreP) {
        // 被攻撃相手(TODO 生存している人に絞る）
        console.log("getPlayerWithIgnore");
        return players[
            this.getRandomIntWithIgnore(players.length, this.getPlayerIdx(players, ignoreP.name))
            ];
    },

    getAvailableHandType(player){
        let loopLimit = player.hands.length;
        let ignores = [];
        let retIdx;
        while (loopLimit >= 0) {
            try {
                console.log("getAvailableHandType");
                let toScoreIdx = this.getRandomIntWithIgnore(loopLimit, ignores);
                if (player.hands[toScoreIdx].score > 0) {
                    retIdx = toScoreIdx;
                    break;
                }
                ignores.push(toScoreIdx);
            } catch (e) { /* NOP */
            }
            loopLimit--;
        }
        return player.hands[retIdx].type;
    },
    getPlayerIdx(players, name){
        return players.findIndex(p => p.name == name);// TODO IE 非対応
    },
    getHandScore(player, type) {
        return this.getHandProp(this.getHand(player, type), "score")
    },
    getPlayer(players, name){
        return players[players.findIndex(p => p.name == name)];// TODO IE 非対応
    },
    getTurnPlayer(players, turnIdx) {
        return players[turnIdx % players.length];
    },
    getHand(player, type){
        return player.hands[player.hands.findIndex(h => h.type == type)];// TODO IE 非対応
    },
    getHandProp(hand, propName){
        return hand[propName];
    },
    applyPlayers(players, player) {
        players[this.getPlayerIdx(players, player.name)]  = player;
    },
    isBreak(player){
        let breakHands = player.hands.filter(h => h.score % 5 == 0);
        return breakHands.length == player.hands.length;
    },
    getTurnAfterHands(hands, type, attackScore){
        return hands.map(h => {
            h.history.unshift({score: h.score});
            if (type == h.type) {
                h.score = this.mod5(h.score + attackScore);
            }
            return h;
        });
    }
};
