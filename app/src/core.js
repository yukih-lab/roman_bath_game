'use strict';

const _player = { hands : [] }
const _hand = { score : 1, history : []};

module.exports = {
    /**
     * 引数.nameよりPlayer生成
     * @param name
     * @returns {any}
     */
    createPlayer (name) {
        let p = Object.assign({name : name}, JSON.parse(JSON.stringify(_player)));
        p.hands.push(this.createHand("left"));
        p.hands.push(this.createHand("right"));
        return p;
    },
    /**
     * 引数.typeよりHandを生成
     * @param type
     * @returns {any}
     */
    createHand (type) {
        return Object.assign(
            {type : type},
            JSON.parse(JSON.stringify(_hand)));
    },
    /**
     * 5で割ったあまりを返却
     * @param v
     * @returns {number}
     */
    mod5: (v) => v % 5,
    /**
     * 0<= x <= maxの乱数を返却
     * @param max
     * @returns {number}
     */
    getRandomInt: max => Math.floor(Math.random() * Math.floor(max + 1)),
    /**
     * 0<= x <= maxの乱数のうちignoresに存在しない値を選択
     * @param max
     * @param max
     * @param ignores
     * @returns {*|number}
     */
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
    /**
     * ignorePを除く、任意のPlayerを取得
     * @param players
     * @param ignoreP
     * @returns {*}
     */
    getPlayerWithIgnore(players, ignoreP) {
        return players[
            this.getRandomIntWithIgnore(players.length - 1, this.getPlayerIdx(players, ignoreP.name))
            ];
    },
    /**
     * Playerの生存している手を選択する.
     * @param player
     * @returns {*}
     */
    getAvailableHandType(player){
        if (this.isBreak(player)) {
            throw Error("illegalArgumentsException.");
        }
        let max = player.hands.length - 1;
        let ignores = [];
        let retIdx;
        while (true) {
            try {
                let toScoreIdx = this.getRandomIntWithIgnore(max, ignores);
                if (player.hands[toScoreIdx].score > 0) {
                    retIdx = toScoreIdx;
                    break;
                }
                ignores.push(toScoreIdx);
            } catch (e) { /* NOP */ }
        }
        return player.hands[retIdx].type;
    },
    /**
     * 引数.nameに紐づくplayerを取得.
     * @param players
     * @param name
     * @returns {*|number}
     */
    getPlayerIdx(players, name){
        return players.findIndex(p => p.name == name);// TODO IE 非対応
    },
    /**
     * playerをplayersに適用
     * @param players
     * @param player
     */
    applyPlayers(players, player) {
        players[this.getPlayerIdx(players, player.name)]  = player;
    },
    /**
     * @param players
     * @param turnIdx
     * @returns {*}
     */
    getTurnPlayer(players, turnIdx) {
        return players[turnIdx % players.length];
    },
    /**
     * @param players
     * @param name
     * @returns {*}
     */
    getPlayer(players, name){
        return players[players.findIndex(p => p.name == name)];// TODO IE 非対応
    },
    /**
     * 引数.typeの現在のスコアを取得
     * @param player
     * @param type
     * @returns {*}
     */
    getHandScore(player, type) {
        return this.getHandProp(this.getHand(player, type), "score")
    },
    /**
     * @param player
     * @param type
     * @returns {*}
     */
    getHand(player, type){
        return player.hands[player.hands.findIndex(h => h.type == type)];// TODO IE 非対応
    },
    /**
     * @param hands
     * @param type
     * @param attackScore
     * @returns {*}
     */
    getTurnAfterHands(hands, type, attackScore){
        return hands.map(h => {
            h.history.unshift({score: h.score});
            if (type == h.type) {
                h.score = this.mod5(h.score + attackScore);
            }
            return h;
        });
    },
    /**
     * @param hand
     * @param propName
     * @returns {*}
     */
    getHandProp(hand, propName){
        return hand[propName];
    },
    /**
     * @param player
     * @returns {boolean}
     */
    isBreak(player){
        let breakHands = player.hands.filter(h => h.score % 5 == 0);
        return breakHands.length == player.hands.length;
    }
};
