'use strict';

const _player = {
    l : 1,
    r : 1
};
const l = "l", r = "r", ll = "ll", lr = "lr", rl = "rl", rr = "rr";
const _strategyIds = [ ll, lr, rl, rr ];
module.exports = {
    strategyIds () {
        // TODO コピーのキャッシュを持ちたい
        return Array.from(_strategyIds);
    },
    createPlayer (name) {
        return Object.assign({name : name}, _player);
    },
    isLoss (p) {
        return this.isBreak(this.getL)(p)
            && this.isBreak(this.getR)(p);
    },
    isNoSide (p1, p2) {
      return this.isLoss(p1) || this.isLoss(p2);
    },
    getL (p) {
        return p.l;
    },
    getR (p) {
        return p.r;
    },
    getLRById (id) {
        switch(id) {
            case l:
                return this.getL;
            case r:
                return this.getR;
            default:
                throw new Error("Illegal Parameter id : " + id)
                process.exit(1);
        }
    },
    applyToL (f) {
        // f関数の戻り値をpToの左手に適用
        return function (pFrom, pTo) {
            pTo.l += f(pFrom);
        };
    },
    applyToR (f) {
        // f関数の戻り値をpToの右手に適用
        return function (pFrom, pTo) {
            pTo.r += f(pFrom);
        };
    },
    getStrategy (id) {
        // 攻撃手関数を取得
        switch (id) {
            case ll:
                return this.applyToL(this.getL);
            case lr:
                return this.applyToR(this.getL);
            case rl:
                return this.applyToL(this.getR);
            case rr:
                return this.applyToR(this.getR);
            default:
                throw new Error("Illegal Parameter id : " + id)
                process.exit(1);
        }
    },
    unUsableStrategy (pFrom, pTo, strategyId) {
        // 攻め手の利用不可のケース判定
        //   自身の攻め手が使用不可
        // 　または
        //   攻撃対象の相手方の手が使用不可
        let from = strategyId.charAt(0);
        let to = strategyId.charAt(1);
        return this.isBreak(this.getLRById(from))(pFrom)
            || this.isBreak(this.getLRById(to))(pTo);
    },
    isBreak (f) {
        // 対象手がブレイクされているか否かを判定
        return function(p) {
            return f(p) % 5 == 0;
        };
    },
    doStrategy(pFrom, pTo, nextStrategyId) {
        // 攻め手実行
        if (nextStrategyId == null) {
            throw new Error("over scenario length.");
        }
        if (this.unUsableStrategy(pFrom, pTo, nextStrategyId)) {
            throw new Error("illegal pattern :" + nextStrategyId + ".");
        }
        this.getStrategy(nextStrategyId)(pFrom, pTo);
    },
    doStrategyAutomatic(pFrom, pTo, nextStrategyId) {
        // 攻め手のオート実行
        // 利用不可の攻め手の場合、任意の攻め手を選択する
        let paramStrategyIdx = _strategyIds.lastIndexOf(nextStrategyId);
        // 攻め手が決まるまでループ
        // 攻め手の決定
        // 係数
        let idx = 0;
        while(this.unUsableStrategy(pFrom, pTo, nextStrategyId)) {
            // 攻め手が見つからない場合、例外を発生させる
            if (idx == _strategyIds.length) {
                throw new Error("strategy not found.")
            }
            //  攻め手利用不可の場合、攻め手の変更
            if (idx == paramStrategyIdx) {
                idx++;
            }
            nextStrategyId = _strategyIds[idx];
            idx++;
        }
        // 攻め手を実行
        this.getStrategy(nextStrategyId)(pFrom, pTo);
    }
};
