function getThrusterPointGain() {
    let x = {
        gainMult: new OmegaNum(1),
        baseGain: new OmegaNum(0),
        idleGain: new OmegaNum(0),
        autoGain: new OmegaNum(0),
        manualGain: new OmegaNum(0)
    }
    //Base gain
    x.baseGain = OmegaNum.ln(player.thrusterPoints.clickPoints.div(1000).plus(1))
        .plus(OmegaNum.ln(player.thrusterPoints.idlePoints.div(1000).plus(1)))
        .pow(2.25).times(2)
    if (temp) {
        if (temp.thrusterPoints.upgrades.isUnlocked(1)) x.gainMult = x.gainMult.times(temp.thrusterPoints.upgrades.upgEffect(1, player.thrusterPoints.upgrades[1-1]))
        if (temp.superPoints.upgrades.isUnlocked("4")) x.gainMult = x.gainMult.times(temp.superPoints.upgrades.upgEffect(4, player.superPoints.upgrades[4-1]).effThrusterPointGain)
        //if (temp.basics.pointUpgrades.isUnlocked(9)) x.gainMult = x.gainMult.times(getPointUpgradeEffect(9, player.pointUpgrades[9-1]))
        if (player.rank.gte(rankRewardReq[13-1])) x.gainMult = x.gainMult.times(getRankEffect("13"))
        if (player.rank.gte(rankRewardReq[18-1])) x.gainMult = x.gainMult.times(getRankEffect("18"))
    }
    //Setting up all gain sources
    x.baseGain = x.baseGain.times(x.gainMult)
    x.idleGain = x.baseGain.div(10)
    x.autoGain = x.baseGain.div(10).div(9)
    x.manualGain = x.baseGain.div(10).div(3)
    
    return x
}

function getClickPointGain() {
    let x = {
        gainMult: new OmegaNum(1),
        autoBaseGain: new OmegaNum(0),
        manualBaseGain: new OmegaNum(0),
        autoGain: new OmegaNum(0),
        manualGain: new OmegaNum(0)
    }
    //Base gain
    if (temp) {
        x.autoBaseGain = x.autoBaseGain.plus(temp.basics.cursors.getSumAmount(0).plus(1).root(3).minus(1).div(2))
        x.manualBaseGain = x.manualBaseGain.plus(temp.basics.cursors.getSumAmount(0).plus(1).root(3).minus(1).div(2))
    }
    //Multiplier
    if (temp) {
        if (temp.thrusterPoints.upgrades.isUnlocked(2)) x.gainMult = x.gainMult.times(temp.thrusterPoints.upgrades.upgEffect(2, player.thrusterPoints.upgrades[2-1]))
        if (temp.basics.pointUpgrades.isUnlocked(9)) x.gainMult = x.gainMult.times(getPointUpgradeEffect(9, player.pointUpgrades[9-1]))
        if (player.rank.gte(rankRewardReq[15-1])) x.gainMult = x.gainMult.times(getRankEffect("15"))
    }
    x.autoGain = x.autoBaseGain.times(x.gainMult).div(5)
    x.manualGain = x.manualBaseGain.times(x.gainMult)
    return x
}

function getClickPointEffect() {
    let a = player.thrusterPoints.clickPoints
    let p = OmegaNum.logBase(a.plus(1), 2).div(100).plus(1)
    .div(2)
    if (p.gte(2)) p = p.logBase(2).times(2)
    return a.plus(1).pow(p)
}

function getIdlePointGain() {
    let x = {
        gainMult: new OmegaNum(1),
        baseGain: new OmegaNum(0),
        gain: new OmegaNum(0)
    }//Base gain
    if (temp) {
        x.baseGain = x.baseGain.plus(temp.basics.factories.getSumAmount(0).plus(1).root(3).minus(1)).div(1.25)
    }
    //Multiplier
    if (temp) {
        if (temp.thrusterPoints.upgrades.isUnlocked(2)) x.gainMult = x.gainMult.times(temp.thrusterPoints.upgrades.upgEffect(2, player.thrusterPoints.upgrades[2-1]))
        if (temp.basics.pointUpgrades.isUnlocked(9)) x.gainMult = x.gainMult.times(getPointUpgradeEffect(9, player.pointUpgrades[9-1]))
        if (player.rank.gte(rankRewardReq[15-1])) x.gainMult = x.gainMult.times(getRankEffect("15"))
    }
    //Setting up gain source
    x.gain = x.baseGain.times(x.gainMult)
    return x
}

function getIdlePointEffect() {
    let a = player.thrusterPoints.idlePoints
    let p = OmegaNum.logBase(a.plus(1), 2).div(100).plus(1)
    .div(2)
    if (p.gte(2)) p = p.logBase(2).times(2)
    return a.plus(1).pow(p)
}

function updateThrusterPointUpgradesTemp() {
    if (!temp.thrusterPoints.upgrades.isUnlocked) temp.thrusterPoints.upgrades.isUnlocked = function(n) {
        n=n+""
        if (["1", "2", "3", "4"].includes(n)) {
            return true
        } else return false
    }
    if (!temp.thrusterPoints.upgrades.baseCost) temp.thrusterPoints.upgrades.baseCost = function(n) {
        n=n+""
        if (n=="1") {
            return new OmegaNum(10)
        } else if (n=="2") {
            return new OmegaNum(20)
        } else if (n=="3") {
            return new OmegaNum(100)
        } else if (n=="4") {
            return new OmegaNum(1000)
        }
    }
    if (!temp.thrusterPoints.upgrades.costScale) temp.thrusterPoints.upgrades.costScale = function(n) {
        n=n+""
        if (n=="1") {
            return new OmegaNum(1)//add
        } else if (n=="2") {
            return new OmegaNum(2)//add
        } else if (n=="3") {
            return new OmegaNum(10)//add
        } else if (n=="4") {
            return new OmegaNum(50)//add
        }
    }
    if (!temp.thrusterPoints.upgrades.finalCost) temp.thrusterPoints.upgrades.finalCost = function(c) {
        let a = temp.thrusterPoints.upgrades.baseCost(c)
        let b = temp.thrusterPoints.upgrades.costScale(c)
        if (temp.thrusterPoints.upgrades.upgType(c) == "geometric") {
            return a.times(b.pow(player.thrusterPoints.upgrades[c-1]))
        } else if (temp.thrusterPoints.upgrades.upgType(c) == "arithmetic") {
            return a.plus(b.times(player.thrusterPoints.upgrades[c-1]))
        }
    }
    if (!temp.thrusterPoints.upgrades.upgType) temp.thrusterPoints.upgrades.upgType = function(n) {
        n=n+""
        if (["1", "2", "3", "4"].includes(n)) {
            return "arithmetic"
        } else if (["5"].includes(n)) {
            return "geometric"
        }
    }
    if (!temp.thrusterPoints.upgrades.upgDesc) temp.thrusterPoints.upgrades.upgDesc = function(n) {
        switch (n+"") {
            case "1":
                return "Get more thruster points"
            case "2":
                return "Get more points, click points and idle points"
            case "3":
                return "Reduce thruster cost"
            case "4":
                return "Divide point upgrade 1-8 costs"
            default:
                return "???"
        }
    }
    if (!temp.thrusterPoints.upgrades.upgEffect) temp.thrusterPoints.upgrades.upgEffect = function(n, upgradeLevel) {
        n=n+""
        let lUpg = upgradeLevel
        switch (n) {
            case "1": {
                let eff = lUpg.times(0.5).plus(1)
                return eff
            }
            case "2": {
                let eff = lUpg.plus(1).pow(3)
                return eff
            }
            case "3": {
                let eff = lUpg.times(100)
                /*if (lUpg.gte(100)) {
                    let d = OmegaNum.minus(
                        OmegaNum.times(101, 100),
                        OmegaNum.times(100, 100)
                    ).div(OmegaNum.times(100, 100)).plus(1).pow(2).minus(1)
                    eff = eff.times(lUpg.minus(100).max(0).times(d).plus(1).root(2))
                }*/
                return eff
            }
            case "4": {
                let eff = lUpg.plus(1).pow(6)
                return eff
            }
            default:
                return new OmegaNum(1)
        }
    }
    if (!temp.thrusterPoints.upgrades.upgEffectDisp) temp.thrusterPoints.upgrades.upgEffectDisp = function(n, upgradeLevel) {
        switch (n+"") {//times: ×
            case "1": case "2":
                return "×" + format(temp.thrusterPoints.upgrades.upgEffect(n, upgradeLevel), 3, 3, undefined, 1e6)
                + " → ×"
                + format(temp.thrusterPoints.upgrades.upgEffect(n, upgradeLevel.plus(1)), 3, 3, undefined, 1e6)
            case "3":
                return "-" + format(temp.thrusterPoints.upgrades.upgEffect(n, upgradeLevel), 3, 3)
                + " → -"
                + format(temp.thrusterPoints.upgrades.upgEffect(n, upgradeLevel.plus(1)), 3, 3)
            case "4":
                return "/" + format(temp.thrusterPoints.upgrades.upgEffect(n, upgradeLevel), 3, 3)
                + " → /"
                + format(temp.thrusterPoints.upgrades.upgEffect(n, upgradeLevel.plus(1)), 3, 3)
            default:
                return ""
        }
    }
    if (!temp.thrusterPoints.upgrades.buy) temp.thrusterPoints.upgrades.buy = function(i, buyMode=player.options.thrusterPointUpgradeBuyMode) {
        if (temp.thrusterPoints.upgrades.upgType(i) == "geometric") {
            let a = temp.thrusterPoints.upgrades.baseCost(i)
            let r = temp.thrusterPoints.upgrades.costScale(i)
            let c = a.times(r.pow(player.thrusterPoints.upgrades[i-1]))
            if (buyMode == "singles") {
                if ( player.thrusterPoints.thrusters.gte(c) ) {
                    player.thrusterPoints.thrusters = player.thrusterPoints.thrusters.minus(c)
                    player.thrusterPoints.upgrades[i-1] = player.thrusterPoints.upgrades[i-1].plus(1)
                }
            } else if (buyMode == "max") {
                let amount = OmegaNum.affordGeometricSeries(player.thrusterPoints.thrusters, a, r, player.thrusterPoints.upgrades[i-1])
                let sumCost = OmegaNum.sumGeometricSeries(amount, a, r, player.thrusterPoints.upgrades[i-1])
                player.thrusterPoints.thrusters = player.thrusterPoints.thrusters.minus(sumCost)
                player.thrusterPoints.upgrades[i-1] = player.thrusterPoints.upgrades[i-1].plus(amount)
            }    
        } else if (temp.thrusterPoints.upgrades.upgType(i) == "arithmetic") {
            let a = temp.thrusterPoints.upgrades.baseCost(i)
            let r = temp.thrusterPoints.upgrades.costScale(i)
            let c = a.plus(r.times(player.thrusterPoints.upgrades[i-1]))
            if (buyMode == "singles") {
                if ( player.thrusterPoints.thrusters.gte(c) ) {
                    player.thrusterPoints.thrusters = player.thrusterPoints.thrusters.minus(c)
                    player.thrusterPoints.upgrades[i-1] = player.thrusterPoints.upgrades[i-1].plus(1)
                }
            } else if (buyMode == "max") {
                let amount = OmegaNum.affordArithmeticSeries(player.thrusterPoints.thrusters, a, r, player.thrusterPoints.upgrades[i-1])
                let sumCost = OmegaNum.sumArithmeticSeries(amount, a, r, player.thrusterPoints.upgrades[i-1])
                player.thrusterPoints.thrusters = player.thrusterPoints.thrusters.minus(sumCost)
                player.thrusterPoints.upgrades[i-1] = player.thrusterPoints.upgrades[i-1].plus(amount)
            }
        }
    }
    if (!temp.thrusterPoints.upgrades.switchBuyMode) temp.thrusterPoints.upgrades.switchBuyMode = function() {
        if (player.options.thrusterPointUpgradeBuyMode == "max") {
            player.options.thrusterPointUpgradeBuyMode = "singles"
        } else {
            player.options.thrusterPointUpgradeBuyMode = "max"
        }
    }
}

function updateThrusterPointsTemp() {
    if (!temp.thrusterPoints) temp.thrusterPoints = {}
    if (!temp.thrusterPoints.thrusters) temp.thrusterPoints.thrusters = {}
    if (!temp.thrusterPoints.upgrades) temp.thrusterPoints.upgrades = {}
    temp.thrusterPoints.thrusters.baseCost = new OmegaNum(1000)
    /*
    if (temp) {
        if (temp.thrusterPoints.upgrades.isUnlocked(1)) x.gainMult = x.gainMult.times(temp.thrusterPoints.upgrades.upgEffect(1, player.thrusterPoints.upgrades[1-1]))
    }
    */
    temp.thrusterPoints.thrusters.costIncrease = new OmegaNum(100)

    if (!temp.thrusterPoints.thrusters.costSubtraction) temp.thrusterPoints.thrusters.costSubtraction = function() {
        let m = new OmegaNum(0)
        if (temp) {
            if (temp.thrusterPoints.upgrades.isUnlocked(3)) m = m.plus(temp.thrusterPoints.upgrades.upgEffect(3, player.thrusterPoints.upgrades[3-1]))
        }
        return m
    }

    if (!temp.thrusterPoints.thrusters.finalCost) temp.thrusterPoints.thrusters.finalCost = function() {
        let a = temp.thrusterPoints.thrusters.baseCost
        let b = temp.thrusterPoints.thrusters.costIncrease
        let c = temp.thrusterPoints.thrusters.costSubtraction()
        let x = player.thrusterPoints.thrusters
        return a.plus(b.times(x)).minus(c)
    }

    if (!temp.thrusterPoints.thrusters.buy) temp.thrusterPoints.thrusters.buy = function(buyMode, config) {
        let a = temp.thrusterPoints.thrusters.baseCost
        let b = temp.thrusterPoints.thrusters.costIncrease
        let c = temp.thrusterPoints.thrusters.costSubtraction()
        let x = player.thrusterPoints.thrusters
        let y = a.plus(b.times(x)).minus(c)
        let amountToBuy = config && config.buyAmount ? new OmegaNum(config.buyAmount) : new OmegaNum(1)
        if (buyMode == "singles") {
            if ( player.thrusterPoints.amount.gte(y) ) {
                player.thrusterPoints.amount = player.thrusterPoints.amount.minus(y)
                player.thrusterPoints.thrusters = player.thrusterPoints.thrusters.plus(1)
            }
        } else if (buyMode == "max") {
            let amount = OmegaNum.affordArithmeticSeries(player.thrusterPoints.amount, a.minus(c), b, player.thrusterPoints.thrusters)
            let sumCost = OmegaNum.sumArithmeticSeries(amount, a.minus(c), b, player.thrusterPoints.thrusters)
            player.thrusterPoints.amount = player.thrusterPoints.amount.minus(sumCost)
            player.thrusterPoints.thrusters = player.thrusterPoints.thrusters.plus(amount)
        } else if (buyMode == "fixed") {
            let amount = OmegaNum.affordArithmeticSeries(player.thrusterPoints.amount, a.minus(c), b, player.thrusterPoints.thrusters).min(amountToBuy)
            let sumCost = OmegaNum.sumArithmeticSeries(amount, a.minus(c), b, player.thrusterPoints.thrusters)
            player.thrusterPoints.amount = player.thrusterPoints.amount.minus(sumCost)
            player.thrusterPoints.thrusters = player.thrusterPoints.thrusters.plus(amount)
        }
    }
    updateThrusterPointUpgradesTemp()
}

function thrusterPointsTick(diff) {
    if (player.thrusterPoints.unlocked) {
        player.thrusterPoints.amount = player.thrusterPoints.amount.plus(
            getThrusterPointGain().idleGain.times(diff)
        )

        player.thrusterPoints.idlePoints = player.thrusterPoints.idlePoints.plus(
            getIdlePointGain().gain.times(diff)
        )
    }
}