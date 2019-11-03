'use strict';

// TODO 定義方法についてES2015を意識した見直し、例えばisLoss(p) {}のような定義方法はあり？
module.exports = {
    player : {
        l : 1,
        r : 1
    },
    strategyIds : [ "ll", "lr", "rl", "rr"],
    isLoss : function(p) {
        return this.isBreak(this.getL)(p)
            && this.isBreak(this.getR)(p);
    },
    isNoSide : function(p1, p2) {
      return this.isLoss(p1) || this.isLoss(p2);
    },
    getL : function(p) {
        return p.l;
    },
    getR : function(p) {
        return p.r;
    },
    getLRById : function(id) {
        switch(id) {
            case "l":
                return this.getL;
            case "r":
                return this.getR;
            default:
                throw new Error("Illegal Parameter id : " + id)
                process.exit(1);
        }
    },
    applyToL : function (f) {
        // f関数の戻り値をpToの左手に適用
        return function (pFrom, pTo) {
            pTo.l += f(pFrom);
        };
    },
    applyToR : function (f) {
        // f関数の戻り値をpToの右手に適用
        return function (pFrom, pTo) {
            pTo.r += f(pFrom);
        };
    },
    getStrategy : function(id) {
        // 攻撃手関数を取得
        switch (id) {
            case "ll":
                return this.applyToL(this.getL);
            case "lr":
                return this.applyToR(this.getL);
            case "rl":
                return this.applyToL(this.getR);
            case "rr":
                return this.applyToR(this.getR);
            default:
                throw new Error("Illegal Parameter id : " + id)
                process.exit(1);
        }
    },
    unUsableStrategy : function (pFrom, pTo, strategyId) {
        // 攻め手の利用不可のケース判定
        //   自身の攻め手が使用不可
        // 　または
        //   攻撃対象の相手方の手が使用不可
        let from = strategyId.charAt(0);
        let to = strategyId.charAt(1);
        return this.isBreak(this.getLRById(from))(pFrom)
            || this.isBreak(this.getLRById(to))(pTo);
    },
    isBreak : function (f) {
        // 対象手がブレイクされているか否かを判定
        return  function(p) {
            return f(p) % 5 == 0;
        };
    }
};
