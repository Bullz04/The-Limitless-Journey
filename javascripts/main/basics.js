function getPointMult() {
    let m = new OmegaNum(1)
    if (temp) {
        if (temp.basics.pointUpgrades.isUnlocked(1)) m = m.times(getPointUpgradeEffect(1, player.pointUpgrades[1-1]))
        if (temp.basics.pointUpgrades.isUnlocked(2)) m = m.times(getPointUpgradeEffect(2, player.pointUpgrades[2-1]))
        if (temp.basics.pointUpgrades.isUnlocked(3)) m = m.times(getPointUpgradeEffect(3, player.pointUpgrades[3-1]))
        if (temp.basics.pointUpgrades.isUnlocked(4)) m = m.times(getPointUpgradeEffect(4, player.pointUpgrades[4-1]))
        if (temp.basics.pointUpgrades.isUnlocked(8)) m = m.times(getPointUpgradeEffect(8, player.pointUpgrades[8-1]))
    }
    m = m.times(getAchievementPointEffect())
    if (player.rank.gte(rankRewardReq[2-1])) m = m.times(getRankEffect("2"))
    if (player.rank.gte(rankRewardReq[10-1])) m = m.times(getRankEffect("10"))
    if (player.rank.gte(rankRewardReq[15-1])) m = m.times(getRankEffect("15"))
    if (player.superPoints.unlocked) m = m.times(getSuperPointEffect())
    if (temp) {
        if (temp.thrusterPoints.upgrades.isUnlocked(2)) m = m.times(temp.thrusterPoints.upgrades.upgEffect(2, player.thrusterPoints.upgrades[2-1]))
    }
    return m
}

function getPointsPerClick() {
    let baseGain = new OmegaNum(0)
    if (temp) {
        baseGain = temp.basics.cursors.getSumAmount(0)
        .times(temp.basics.cursors.baseProduction(0))
        .times(temp.basics.cursors.productionPower(0))
    }
    
    return OmegaNum.times(
        baseGain,
        getPointMult()
    )
}

function getPointsPerSecond() {
    let baseGain = new OmegaNum(0)
    if (temp) {
        baseGain = temp.basics.factories.getSumAmount(0)
        .times(temp.basics.factories.baseProduction(0))
        .times(temp.basics.factories.productionPower(0))
    }
    
    return OmegaNum.times(
        baseGain,
        getPointMult()
    )
}

function pointClick(n, automated) {
    player.points = player.points.plus(getPointsPerClick().times(n))

    player.lifetimeGainedPoints = player.lifetimeGainedPoints.plus(
        getPointsPerClick().times(n)
    )
    player.bestEverPoints = player.bestEverPoints.max(player.points)

    let pointProducerRows = Math.min(player.cursorsBought.length, player.factoriesBought.length, player.extraCursors.length, player.extraFactories.length)
    for (let i = 0;i < pointProducerRows; i++) {
        if (temp) if (i != pointProducerRows-1) {
            player.extraCursors[i] = player.extraCursors[i].plus(
                temp.basics.cursors.getSumAmount(i+1).times(temp.basics.cursors.baseProduction(i+1)).times(temp.basics.cursors.productionPower(i+1))
                .times(n)
            )
        }
    }
    if (automated) {
        player.autoClicks = player.autoClicks.plus(n)
    } else {
        player.manualClicks = player.manualClicks.plus(n)
        player.trueClicks = player.trueClicks.plus(1)
    }
    if (player.thrusterPoints.unlocked) {
        if (automated == true) {
            player.thrusterPoints.clickPoints = player.thrusterPoints.clickPoints.plus(
                getClickPointGain().autoGain.times(n)
            )
            player.thrusterPoints.amount = player.thrusterPoints.amount.plus(
                getThrusterPointGain().autoGain.times(n)
            )
        } else {
            player.thrusterPoints.clickPoints = player.thrusterPoints.clickPoints.plus(
                getClickPointGain().manualGain.times(n)
        )
            player.thrusterPoints.amount = player.thrusterPoints.amount.plus(
                getThrusterPointGain().manualGain.times(n)
            )
        }
    }
}

function getRankSW() {
    let sw = new OmegaNum(1)
    if (temp) {
        if (temp.superPoints) if (temp.superPoints.upgrades.isUnlocked("3")) sw = sw.plus(temp.superPoints.upgrades.upgEffect(3, player.superPoints.upgrades[3-1]))
    }
    return sw
}

function getRankDiscounts() {
    let disc = new OmegaNum(1)
    /*
    if (temp) {
        if (temp.thrusterPoints) if (temp.thrusterPoints.upgrades.isUnlocked(4)) disc = disc.times(temp.thrusterPoints.upgrades.upgEffect(4, player.thrusterPoints.upgrades[4-1]))
    }*/
    return disc
}
var rankRewards = [
    [1, "Unlock 1 point upgrade"],
    [2, () => "Multiply point gain by " + format(getRankEffBase("2")) + " for every rank (after rank 1)"],
    [3, "Unlock 1 another point upgrade"],
    [4, "Unlock 1 another point upgrade"],
    [5, "Unlock 1 another point upgrade"],//5
    [7, "Unlock 1 another point upgrade"],//6
    [9, "Unlock Autoupgrader"],//7
    [10, "Unlock producer^2 (cursor^2 and factory^2)"],//8
    [12, "Unlock 3 another point upgrade"],//9
    [13, "Cursors and factories boost point gain"],//10
    [17, () => "Add scaling weakness to super point upgrade 3 by +" + format(getRankEffect("11").times(100), 3, 3) + "%"],//11
    [18, "Bought producers^2 multiply their respective production power"],//12
    [19, "Idle points and click points boost thruster point gain"],//13
    [20, "Unlock 1 point upgrade and 1 super point upgrade"],//14
    [21, () => "Multiply idle point and click point gain by " + format(getRankEffBase("15")) + " for every rank (after rank 20) and unlock Autothruster"],//15
    [22, "Unlock producer^3 dan 2 point upgrades"],//16
    [23, () => "Add " + format(getRankEffect("17").floor(), 3, 0, undefined, 1e12) + " max level for point upgrade 3 and 4"],//17
    [24, () => "Every rank additively boosts thruster point gain by " + format(getRankEffBase("18").times(100), 3, 2) + "% (based on points)(after rank 23)"]//18
]
var rankRewardDesc = []
var rankRewardReq = []
for (let i = 0; i < rankRewards.length; i++) {
    rankRewardDesc.push(rankRewards[i][1])
    rankRewardReq.push(new OmegaNum(rankRewards[i][0]))
}

function getRankRewardsReached() {
    let r = 0
    for (let i = 0; i<rankRewardReq.length; i++) {
        if (player.rank.gte(rankRewardReq[i])) r++
    }
    return r
}

function getPointUpgradeDesc(n) {
    switch (n+"") {
        case "1":
            return "Get more points"
        case "2":
            return "Get more points"
        case "3":
            return "Get more points based on cursor amount"
        case "4":
            return "Get more points based on factory amount"
        case "5":
            return "Get more super points and raw super points based on points"
        case "6":
            return "Higher production power of cursor^2"
        case "7":
            return "Higher production power of factory^2"
        case "8":
            return "Get more points"
        case "9":
            return "Get more idle points and click points"
        case "10":
            return "Higher production power of cursor^3"
        case "11":
            return "Higher production power of factory^3"
        default:
            return "[Point upgrade WIP]" 
    }
}

function getPointUpgradeMaxLevel(n) {
    switch (n+"") {//if (player.rank.gte(rankRewardReq[15-1])) m = m.times(getRankEffect("15"))
        case "3": {
            let m = new OmegaNum(7)
            if (player.rank.gte(rankRewardReq[17-1])) m = m.plus(getRankEffect("17"))
            return m
        }
        case "4": {
            let m = new OmegaNum(7)
            if (player.rank.gte(rankRewardReq[17-1])) m = m.plus(getRankEffect("17"))
            return m
        }
        default:
            return new OmegaNum(Infinity)
    }
}

function getPointUpgradeEffect(n, upgradeLevel) {
    switch (n+"") {
        case "1": {
            let x = upgradeLevel
            let eff = new OmegaNum(x).times(0.10).plus(1)
            if (x.gte(15)) eff = eff.times(new OmegaNum(x).minus(15).max(0).times(0.05).plus(1))
            if (x.gte(40)) eff = eff.times(new OmegaNum(x).minus(40).max(0).times(0.05).plus(1))
            if (x.gte(120)) eff = eff.times(new OmegaNum(x).minus(120).max(0).times(0.07).plus(1))
            if (x.gte(420)) eff = eff.times(new OmegaNum(x).minus(420).max(0).times(0.03).plus(1).pow(2))
            if (x.gte(750)) eff = eff.times(new OmegaNum(x).minus(750).max(0).times(0.01).plus(1))
            if (x.gte(1000)) eff = eff.times(new OmegaNum(x).minus(1000).max(0).times(0.05).plus(1))
            if (x.gte(1500)) eff = eff.times(new OmegaNum(x).minus(1500).max(0).times(0.002).plus(1))
            if (x.gte(2000)) eff = eff.times(new OmegaNum(x).minus(2000).max(0).times(0.001).plus(1))
            if (x.gte(2500)) eff = eff.times(new OmegaNum(x).minus(2500).max(0).times(0.001).plus(1).pow(2))
            if (x.gte(2900)) eff = eff.times(new OmegaNum(x).minus(2900).max(0).times(0.009).plus(1))
            if (x.gte(3000)) {
                let y = new OmegaNum(x).minus(3000).max(0)
                eff = eff.times(
                    y.times(0.02).plus(1).pow(
                        y.times(3).div(125).plus(1).pow(0.5)
                    )
                )
            }
            if (x.gte(3000)) {
                eff = eff.times(new OmegaNum(x).minus(3000).max(0).times(0.02).plus(1))
                eff = eff.times(new OmegaNum(x).minus(3000).max(0).times(0.04).plus(1))
            }
            return eff
        }
        case "2": {
            let x = upgradeLevel
            let eff = new OmegaNum(x).times(0.05).plus(1)
            //if (eff.gte(20)) eff = eff.times(4).minus(OmegaNum.times(20,3))
            return eff
        }
        case "3": {
            let x = upgradeLevel
            let c = player.cursorsBought[0]
            let eff = new OmegaNum(c).times(x).times(0.004).plus(1)
                .pow(
                    new OmegaNum(x).times(0.3).plus(1).pow(0.75)
                )
            return eff
        }
        case "4": {
            let x = upgradeLevel
            let f = player.factoriesBought[0]
            let eff = new OmegaNum(f).times(OmegaNum.pow(x, 1.2)).times(0.002).plus(1)
                .pow(
                    new OmegaNum(x).times(0.5).plus(1).pow(0.75)
                )
            return eff
        }
        case "5": {
            let x = new OmegaNum(upgradeLevel)
            let a = player.points
            let eff = OmegaNum.logBase(a.plus(1), 10).div(400).plus(1).times(x.times(0.2).plus(1))
            if (x.gte(10)) eff = eff.times(
                x.minus(10).max(0).times(0.05)
                .times( OmegaNum.logBase(a.plus(1), 10).times(0.03).plus(1) )
                .plus(1)
            )
            if (x.gte(20)) eff = eff.times(
                x.minus(20).max(0).times(0.05)
                .times( OmegaNum.logBase(a.div("1e30").minus(1).max(0).plus(1), 10).times(0.04).plus(1) )
                .plus(1)
            )
            eff = eff.pow(OmegaNum.logBase(x.plus(1), 3).times(0.2).plus(1).pow(1.2).minus(1))
                .pow(2)
            return eff
        }
        case "6": {
            let x = upgradeLevel
            let eff = x.times(0.3).plus(1)
            if (x.gte(5)) eff = eff.times(x.minus(5).max(0).times(0.05).plus(1))
            if (x.gte(25)) eff = eff.times(x.minus(25).max(0).pow(2).times(0.01).plus(1))
            if (x.gte(50)) {
                let x1 = new OmegaNum(x).minus(50).max(0)
                let exponent = x1.div(100).times(3).plus(1).root(2)
                eff = eff.times(x1.times(0.01).plus(1).pow(exponent))//hopefully this will be a significant factor after level >1000
            }
            return eff
        }
        case "7": {
            let x = upgradeLevel
            let eff = x.times(0.3).plus(1)
            if (x.gte(5)) eff = eff.times(x.minus(5).max(0).times(0.05).plus(1))
            if (x.gte(25)) eff = eff.times(x.minus(25).max(0).pow(2).times(0.01).plus(1))
            if (x.gte(50)) {
                let x1 = new OmegaNum(x).minus(50).max(0)
                let exponent = x1.div(100).times(3).plus(1).root(2)
                eff = eff.times(x1.times(0.01).plus(1).pow(exponent))
            }
            return eff
        }
        case "8": {
            let x = upgradeLevel
            let multi = new OmegaNum(1)
            if (x.gte(5)) multi = multi.times(x.minus(5).max(0).times(0.2).plus(1))
            if (x.gte(25)) multi = multi.times(x.minus(25).max(0).pow(2).times(0.01).plus(1))

            let multi2 = new OmegaNum(1)
            if (x.gte(20)) multi2 = multi2.times(x.minus(20).max(0).times(0.1).plus(1))
            if (x.gte(200)) multi2 = multi2.times(x.minus(200).max(0).times(0.2).plus(1).pow(2))
            if (x.gte(400)) multi2 = multi2.times(x.minus(400).max(0).times(0.4).plus(1).pow(2))
            let eff = x.plus(1).times(multi.floor()).times(multi2)
            return eff
        }
        case "9": {
            let x = new OmegaNum(upgradeLevel)
            let eff = x.times(0.1).plus(1)
            if (x.gte(10)) eff = eff.times(x.minus(10).max(0).times(0.02).plus(1))
            if (x.gte(20)) eff = eff.times(x.minus(20).max(0).times(0.02).plus(1).pow(1.25))
            if (x.gte(30)) eff = eff.times(x.minus(30).max(0).times(0.02).plus(1).pow(1.5))
            if (x.gte(40)) eff = eff.times(x.minus(40).max(0).times(0.02).plus(1).pow(1.75))
            if (x.gte(50)) eff = eff.times(x.minus(50).max(0).times(0.02).plus(1).pow(2))
            return eff
        }
        case "10": {
            let x = upgradeLevel
            let eff = x.times(0.3).plus(1).times(x.times(0.06).plus(1))
            return eff
        }
        case "11": {
            let x = upgradeLevel
            let eff = x.times(0.3).plus(1).times(x.times(0.06).plus(1))
            return eff
        }
        default:
            return new OmegaNum(1)
    }
}

function getPointUpgradeEffDisp(n, upgradeLevel) {
    n = n+""
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].includes(n)) {
        let before = "×" + format(getPointUpgradeEffect(n, upgradeLevel), 3, 3, undefined, 1e3)
        let after = "×" + format(getPointUpgradeEffect(n, upgradeLevel.plus(1)), 3, 3, undefined, 1e3)
        if (upgradeLevel.gte(getPointUpgradeMaxLevel(n))) after = ""
        return before + (upgradeLevel.gte(getPointUpgradeMaxLevel(n)) ? "" : " → ") + after
    } else {
        return ""
    }
}

function updatePointUpgradesTemp() {
    if (!temp.basics.pointUpgrades) temp.basics.pointUpgrades = {}
    if (!temp.basics.pointUpgrades.isUnlocked) temp.basics.pointUpgrades.isUnlocked = function(n) {
        n=n+""
        if (["1"].includes(n)) {
            return player.rank.gte(rankRewardReq[1-1])
        } else if (["2"].includes(n)) {
            return player.rank.gte(rankRewardReq[3-1])
        } else if (["3"].includes(n)) {
            return player.rank.gte(rankRewardReq[4-1])
        } else if (["4"].includes(n)) {
            return player.rank.gte(rankRewardReq[5-1])
        } else if (["5"].includes(n)) {
            return player.rank.gte(rankRewardReq[6-1])
        } else if (["6", "7", "8"].includes(n)) {
            return player.rank.gte(rankRewardReq[9-1])
        } else if (["9"].includes(n)) {
            return player.rank.gte(rankRewardReq[14-1])
        } else if (["10", "11"].includes(n)) {
            return player.rank.gte(rankRewardReq[16-1])
        } else return false
    }
    if (!temp.basics.pointUpgrades.upgType) temp.basics.pointUpgrades.upgType = function(n) {
        n=n+""
        if (["5", "9"].includes(n)) {
            return "custom"
        } else return "geometric"
    }
    if (!temp.basics.pointUpgrades.baseCost) temp.basics.pointUpgrades.baseCost = function(n) {
        switch (n+"") {
            case "1": return new OmegaNum(1000)
            case "2": return new OmegaNum(3e6)
            case "3": return new OmegaNum(1e7)
            case "4": return new OmegaNum(1e15)
            case "5": return new OmegaNum(1e20)
            case "6": return new OmegaNum(1e40)
            case "7": return new OmegaNum(1e40)
            case "8": return new OmegaNum(1e42)
            case "9": return new OmegaNum(1e95)
            case "10": return new OmegaNum(1e120)
            case "11": return new OmegaNum(1e120)
            default: return new OmegaNum("eee999")
        }
    }
    if (!temp.basics.pointUpgrades.discounts) temp.basics.pointUpgrades.discounts = function (n) {
        n=n+""
        let d = new OmegaNum(1)
        if (["1", "2", "3", "4", "5", "6", "7", "8"].includes(n)) {
            if (temp.thrusterPoints.upgrades.isUnlocked(4)) d = d.times(temp.thrusterPoints.upgrades.upgEffect(4, player.thrusterPoints.upgrades[4-1]))
        }
        return d
    }
    if (!temp.basics.pointUpgrades.costScale) temp.basics.pointUpgrades.costScale = function(n) {
        switch (n+"") {
            case "1": return new OmegaNum(1.1)
            case "2": return new OmegaNum(1.5).root(20)
            case "3": return new OmegaNum(1e3)
            case "4": return new OmegaNum(250)
            case "6": return new OmegaNum(2)
            case "7": return new OmegaNum(2)
            case "8": return new OmegaNum(2)
            case "10": return new OmegaNum(3)
            case "11": return new OmegaNum(3)
            default: return new OmegaNum("eee999")
        }
    }
    if (!temp.basics.pointUpgrades.scalingWeakness) temp.basics.pointUpgrades.scalingWeakness = function(n) {
        switch (n+"") {
            default:
                return new OmegaNum(1)
        }
    }
    if (!temp.basics.pointUpgrades.costData) temp.basics.pointUpgrades.costData = function(n, resCoef) {
        if (n == 5) {
            let bc = temp.basics.pointUpgrades.baseCost(n)
            let sw = new OmegaNum(1.5)
            let lvl = player.pointUpgrades[n-1]
            let r = new OmegaNum(resCoef)
            let d = temp.basics.pointUpgrades.discounts(n)
            let cost = OmegaNum.pow(
                6,
                lvl.div(sw).plus(12).pow(2).minus(OmegaNum.pow(12, 2))
                .div( OmegaNum.pow(13, 2).minus(OmegaNum.pow(12, 2)) )
            ).times(bc).div(d)
            if (lvl.gte(15)) {
                cost = OmegaNum.pow(
                    6,
                    lvl.div(1.5).plus(OmegaNum.minus(1.5, 1).div(1.5).times(15))
                    .div(sw).plus(12).pow(2).minus(OmegaNum.pow(12, 2))
                    .div( OmegaNum.pow(13, 2).minus(OmegaNum.pow(12, 2)) )
                ).times(bc).div(d)
            }
            let bulk = player.points.times(r).times(d).div(bc).max(1).logBase(6)
                .times( OmegaNum.pow(13, 2).minus(OmegaNum.pow(12, 2)) )
                .plus(OmegaNum.pow(12, 2))
                .root(2)
                .minus(12)
                .times(sw)
                .plus(1).floor()
            if (bulk.gte(15)) {
                bulk = player.points.times(r).times(d).div(bc).max(1).logBase(6)
                .times( OmegaNum.pow(13, 2).minus(OmegaNum.pow(12, 2)) )
                .plus(OmegaNum.pow(12, 2))
                .root(2)
                .minus(12)
                .times(sw)
                .minus(OmegaNum.minus(1.5, 1).div(1.5).times(15))
                .times(1.5)
                .plus(1).floor()
            }
            return {cost:cost, bulk:bulk}
        }
        if (n == 9) {
            let bc = temp.basics.pointUpgrades.baseCost(n)
            let sw = temp.basics.pointUpgrades.scalingWeakness(n)
            let lvl = player.pointUpgrades[n-1]
            let r = new OmegaNum(resCoef)
            let cost = OmegaNum.pow(
                8,
                lvl.div(sw).plus(10).root(Math.sqrt(2)).minus(OmegaNum.root(10, Math.sqrt(2)))
                .div( OmegaNum.root(11, Math.sqrt(2)).minus(OmegaNum.root(10, Math.sqrt(2))) )
            ).times(bc)

            let bulk = player.points.times(r).div(bc).max(1).logBase(8)
                .times( OmegaNum.root(11, Math.sqrt(2)).minus(OmegaNum.root(10, Math.sqrt(2))) )
                .plus(OmegaNum.root(10, Math.sqrt(2)))
                .pow(Math.sqrt(2))
                .minus(10)
                .times(sw)
                .plus(1).floor()
            return {cost:cost, bulk:bulk}
        }
    }
    if (!temp.basics.pointUpgrades.finalCost) temp.basics.pointUpgrades.finalCost = function(i) {
        if (temp.basics.pointUpgrades.upgType(i) == "geometric") {
            let d = temp.basics.pointUpgrades.discounts(i)
            let a = temp.basics.pointUpgrades.baseCost(i)
            let r = temp.basics.pointUpgrades.costScale(i)
            return a.times(r.pow(player.pointUpgrades[i-1])).div(d)
        } else if (temp.basics.pointUpgrades.upgType(i) == "custom") {
            let d = temp.basics.pointUpgrades.discounts(i)
            return temp.basics.pointUpgrades.costData(i).cost
        }
        
    }
    
    if (!temp.basics.pointUpgrades.switchBuyMode) temp.basics.pointUpgrades.switchBuyMode = function() {
        if (player.options.pointUpgradeBuyMode == "max") {
            player.options.pointUpgradeBuyMode = "singles"
        } else {
            player.options.pointUpgradeBuyMode = "max"
        }
    }

    if (!temp.basics.pointUpgrades.buy) temp.basics.pointUpgrades.buy = function(i, buyMode=player.options.pointUpgradeBuyMode, config) {
        //temp.basics.pointUpgrades.isUnlocked(i)
        let amountToBuy = config && config.buyAmount ? new OmegaNum(config.buyAmount) : new OmegaNum(1)
        let resCoef = config && config.resCoefficient ? new OmegaNum(config.resCoefficient) : new OmegaNum(1)
        let prePurchaseCondition = temp.basics.cursors.getSumAmount(0).gt(0) || temp.basics.factories.getSumAmount(0).gt(0)
        if (temp.basics.pointUpgrades.isUnlocked(i) && prePurchaseCondition) {
            if (temp.basics.pointUpgrades.upgType(i) == "geometric") {
                let d = temp.basics.pointUpgrades.discounts(i)
                let a = temp.basics.pointUpgrades.baseCost(i)
                let r = temp.basics.pointUpgrades.costScale(i)
                let c = a.times(r.pow(player.pointUpgrades[i-1])).div(d)
                if (buyMode == "singles") {
                    if ( player.points.times(resCoef).gte(c) && player.pointUpgrades[i-1].lt(getPointUpgradeMaxLevel(i)) ) {
                        player.points = player.points.minus(c)
                        player.pointUpgrades[i-1] = player.pointUpgrades[i-1].plus(1)
                    }
                } else if (buyMode == "max") {
                    let amount = OmegaNum.affordGeometricSeries(player.points.times(resCoef), a.div(d), r, player.pointUpgrades[i-1]).min(getPointUpgradeMaxLevel(i).minus(player.pointUpgrades[i-1]))
                    let sumCost = OmegaNum.sumGeometricSeries(amount, a.div(d), r, player.pointUpgrades[i-1])
                    player.points = player.points.minus(sumCost)
                    player.pointUpgrades[i-1] = player.pointUpgrades[i-1].plus(amount)
                } else if (buyMode == "fixed") {
                    let amount = OmegaNum.affordGeometricSeries(player.points.times(resCoef), a.div(d), r, player.pointUpgrades[i-1]).min(getPointUpgradeMaxLevel(i).minus(player.pointUpgrades[i-1])).min(amountToBuy)
                    let sumCost = OmegaNum.sumGeometricSeries(amount, a.div(d), r, player.pointUpgrades[i-1])
                    player.points = player.points.minus(sumCost)
                    player.pointUpgrades[i-1] = player.pointUpgrades[i-1].plus(amount)
                }
            } else if (temp.basics.pointUpgrades.upgType(i) == "custom") {
                if (buyMode == "singles") {
                    if (player.points.times(resCoef).gte(temp.basics.pointUpgrades.costData(i).cost)) {
                        player.pointUpgrades[i-1] = player.pointUpgrades[i-1].plus(1).min(getPointUpgradeMaxLevel(i))
                    }
                } else if (buyMode == "max") {
                    if (player.points.times(resCoef).gte(temp.basics.pointUpgrades.costData(i).cost)) {
                        player.pointUpgrades[i-1] = temp.basics.pointUpgrades.costData(i, resCoef).bulk.min(getPointUpgradeMaxLevel(i))
                    }
                } else if (buyMode == "fixed") {
                    if (player.points.times(resCoef).gte(temp.basics.pointUpgrades.costData(i).cost)) {
                        player.pointUpgrades[i-1] = temp.basics.pointUpgrades.costData(i, resCoef).bulk.min(getPointUpgradeMaxLevel(i))
                            .min(player.pointUpgrades[i-1].plus(amountToBuy))
                    }
                }
            }
        }
    }
}

function getRankEffect(n) {
    switch (n+"") {
        case "2": {
            let l = player.rank.minus(1).max(0)
            let b = getRankEffBase("2")
            let eff = OmegaNum.pow(b, l)
            return eff
        }
        case "10": {
            let x = temp.basics.cursors.getSumAmount(0)
            let y = temp.basics.factories.getSumAmount(0)
            let eff = x.div(1e6).plus(1)
                .times(y.div(1e6).plus(1))
                .root(2)
            return eff
        }
        case "11": {
            //let eff = new OmegaNum(16/14-1)
            let eff = new OmegaNum(0.07)
            return eff
        }
        case "12": {
            let x1 = player.cursorsBought[2-1]
            let x2 = player.factoriesBought[2-1]
            let eff = {
                cursor2: x1.times(0.01).plus(1),
                factory2: x2.times(0.01).plus(1)
            }
            return eff
        }
        case "13": {
            let eff = OmegaNum.logBase(player.thrusterPoints.clickPoints.max(0).plus(1), 10).times(0.02).plus(1)
            eff = eff.times(OmegaNum.logBase(player.thrusterPoints.idlePoints.max(0).plus(1), 10).times(0.02).plus(1))
            return eff.pow(1)
        }
        case "15": {
            let x = player.rank.minus(20).max(0)
            let base = getRankEffBase("15")
            let eff = OmegaNum.pow(base, x)
            return eff
        }
        case "17": {
            let eff = new OmegaNum(1)
            return eff
        }
        case "18": {
            let x = player.rank.minus(23).max(0)
            let base = getRankEffBase("18")
            let eff = x.times(base).plus(1)
            return eff
        }
        default:
            return new Decimal(1)
    }
}

function getRankEffBase(n) {
    switch (n+"") {
        case "2":
            return new OmegaNum(3)
        case "15":
            return new OmegaNum(3)
        case "18": {
            let b = OmegaNum.logBase(player.points.plus(1),10).times(0.003)
            return b
        }
        default:
            return new OmegaNum(1)
    }
}

function updateRankTemp() {
    if (!temp.basics.rank) temp.basics.rank = {}
    let bc = new OmegaNum(1e3)
    let cost = OmegaNum.pow(
        OmegaNum.pow(1000, 3/2),
        player.rank.div(getRankSW()).plus(1).div(3.15).pow(2)
        .minus(OmegaNum.plus(0, 1).div(3.15).pow(2))
    ).times(bc).div(getRankDiscounts())

    if (player.rank.gte(14)) {
        cost = OmegaNum.pow(
            OmegaNum.pow(1000, 3/2),
            player.rank.times(1.5).minus(OmegaNum.times(14,OmegaNum.minus(1.5, 1)))
            .div(getRankSW()).plus(1).div(3.15).pow(2)
            .minus(OmegaNum.plus(0, 1).div(3.15).pow(2))
        ).times(bc).div(getRankDiscounts())
    }
    if (player.rank.gte(24)) {
        cost = OmegaNum.pow(
            OmegaNum.pow(1000, 3/2),
            player.rank.times(2.5).minus(OmegaNum.times(24, OmegaNum.minus(2.5, 1)))
            .times(1.5).minus(OmegaNum.times(14,OmegaNum.minus(1.5, 1)))
            .div(getRankSW()).plus(1).div(3.15).pow(2)
            .minus(OmegaNum.plus(0, 1).div(3.15).pow(2))
        ).times(bc).div(getRankDiscounts())
    }

    let bulk = player.points.times(getRankDiscounts()).div(bc).max(1)
        .logBase(OmegaNum.pow(1000, 3/2))
        .plus(OmegaNum.plus(0, 1).div(3.15).pow(2))
        .root(2)
        .times(3.15)
        .minus(1)
        .times(getRankSW())
        
        .plus(1).floor()

    if (bulk.gte(14)) {
        player.points.times(getRankDiscounts()).div(bc).max(1)
        .logBase(OmegaNum.pow(1000, 3/2))
        .plus(OmegaNum.plus(0, 1).div(3.15).pow(2))
        .root(2)
        .times(3.15)
        .minus(1)
        .times(getRankSW())
        .plus(OmegaNum.times(14,OmegaNum.minus(1.5, 1)))
        .div(1.5)
        .plus(1).floor()
    }
    if (bulk.gte(24)) {
        player.points.times(getRankDiscounts()).div(bc).max(1)
        .logBase(OmegaNum.pow(1000, 3/2))
        .plus(OmegaNum.plus(0, 1).div(3.15).pow(2))
        .root(2)
        .times(3.15)
        .minus(1)
        .times(getRankSW())
        .plus(OmegaNum.times(14,OmegaNum.minus(1.5, 1)))
        .div(1.5)
        .plus(OmegaNum.times(24, OmegaNum.minus(2.5, 1)))
        .div(2.5)
        .plus(1).floor()
    }
    
    temp.basics.rank.cost = cost
    temp.basics.rank.bulk = bulk
    temp.basics.rank.desc=""
    if (getRankRewardsReached() < rankRewards.length) {
        let d = rankRewardDesc[getRankRewardsReached()]
        temp.basics.rank.desc = "At Rank " + format(rankRewardReq[getRankRewardsReached()]) + ", " + (typeof d == "function" ? d() : d)
    } else {
        temp.basics.rank.desc = ""
    }
    
    if (!temp.basics.rank.buy) temp.basics.rank.buy = function (buyMode) {
        let pointProducerRows = Math.min(player.cursorsBought.length, player.factoriesBought.length, player.extraCursors.length, player.extraFactories.length)
        if (buyMode == "singles") {
            if (player.points.gte(temp.basics.rank.cost)) {
                player.rank = player.rank.plus(1)
                player.points = new OmegaNum(10)
                for (let i = 0; i < pointProducerRows; i++) {
                    player.cursorsBought[i] = new OmegaNum(0)
                    player.factoriesBought[i] = new OmegaNum(0)
                    player.extraCursors[i] = new OmegaNum(0)
                    player.extraFactories[i] = new OmegaNum(0)
                }
                player.pointUpgrades = new Player().pointUpgrades
                player.superPoints.amount = new Player().superPoints.amount
                player.superPoints.raw = new Player().superPoints.raw
                player.thrusterPoints.amount = new Player().thrusterPoints.amount
                player.thrusterPoints.clickPoints = new Player().thrusterPoints.clickPoints
                player.thrusterPoints.idlePoints = new Player().thrusterPoints.idlePoints
            }
        } else if (buyMode == "max") {
            if (player.points.gte(temp.basics.rank.cost)) {
                player.rank = player.rank.max(temp.basics.rank.bulk)
                player.points = new OmegaNum(10)
                for (let i = 0; i < pointProducerRows; i++) {
                    player.cursorsBought[i] = new OmegaNum(0)
                    player.factoriesBought[i] = new OmegaNum(0)
                    player.extraCursors[i] = new OmegaNum(0)
                    player.extraFactories[i] = new OmegaNum(0)
                }
                player.pointUpgrades = new Player().pointUpgrades
                player.superPoints.amount = new Player().superPoints.amount
                player.superPoints.raw = new Player().superPoints.raw
                player.thrusterPoints.amount = new Player().thrusterPoints.amount
                player.thrusterPoints.clickPoints = new Player().thrusterPoints.clickPoints
                player.thrusterPoints.idlePoints = new Player().thrusterPoints.idlePoints
            }
        }
    }

    if (!temp.basics.rank.effDisp) temp.basics.rank.effDisp = function (n) {
        n = n+""
        if (["2", "15"].includes(n)) return "Currently: ×" + format(getRankEffect(n), 3, 2)
        else if (["10", "18", "13"].includes(n)) return "Currently: ×" + format(getRankEffect(n), 3, 4)
        else if (["12"].includes(n)) {
            return "Cursor^2 prod. power: ×" + format(getRankEffect(n).cursor2, 3, 3) + "<br>"
            + "Factory^2 prod. power: ×" + format(getRankEffect(n).factory2, 3, 3)
        }
        else if ([].includes(n)) return "Currently: ^" + format(getRankEffect(n), 3, 4)
        else return ""
    }
}

function updateBasicsTemp() {
    if (!temp.basics) temp.basics = {}
    if (!temp.basics.cursors) temp.basics.cursors = {}
    if (!temp.basics.factories) temp.basics.factories = {}
    if (!temp.basics.pointProducers) temp.basics.pointProducers = {}
    temp.basics.cursors.baseCosts = [new OmegaNum(10), new OmegaNum(500), new OmegaNum(2000)]
    temp.basics.cursors.costScales = [new OmegaNum(1.1), new OmegaNum(1.005), new OmegaNum(1.01)]
    if (!temp.basics.pointProducers.unlock) temp.basics.pointProducers.unlock = function(i) {
        if (i == 0) {
            return true
        } else if (i == 1 && player.rank.gte(rankRewardReq[8-1])) {
            return true
        } else if (i == 2 && player.rank.gte(rankRewardReq[16-1])) {
            return true
        } else {
            return false
        }
    }
    if (!temp.basics.cursors.getCurrentCost) temp.basics.cursors.getCurrentCost = function(i) {
        let a = temp.basics.cursors.baseCosts[i]
        let r = temp.basics.cursors.costScales[i]
        return a.times(r.pow(player.cursorsBought[i]))
    }
    if (!temp.basics.cursors.getSumAmount) temp.basics.cursors.getSumAmount = function(i) {
        return player.cursorsBought[i].plus(player.extraCursors[i])
    }

    if (!temp.basics.cursors.baseProduction) temp.basics.cursors.baseProduction = function(i) {
        if (i == 3-1) {
            return new OmegaNum(4)
        } else {
            return new OmegaNum(1)
        }
    }

    if (!temp.basics.cursors.productionPower) temp.basics.cursors.productionPower = function(i) {
        if (i==3-1) {
            let p = new OmegaNum(1)
            if (temp.basics.pointUpgrades.isUnlocked(10)) p = p.times(getPointUpgradeEffect(10, player.pointUpgrades[10-1]))
            return p
        } else if (i==2-1) {
            let p = new OmegaNum(1)
            if (temp.basics.pointUpgrades.isUnlocked(6)) p = p.times(getPointUpgradeEffect(6, player.pointUpgrades[6-1]))
            if (player.rank.gte(rankRewardReq[12-1])) p = p.times(getRankEffect("12").cursor2)
            return p
        } else if (i==1-1) {
            let p = new OmegaNum(1)
            if (player.thrusterPoints.unlocked) p = p.times(getClickPointEffect())
            return p
        } else {
            return new OmegaNum(1)
        }
    }

    if (!temp.basics.cursors.gainRate) temp.basics.cursors.gainRate = function(i) {
        let pointProducerRows = Math.min(player.cursorsBought.length, player.factoriesBought.length, player.extraCursors.length, player.extraFactories.length)
        if (i >= pointProducerRows-1) {
            return new OmegaNum(0)
        } else {
            return temp.basics.cursors.getSumAmount(i+1).times(temp.basics.cursors.baseProduction(i+1)).times(temp.basics.cursors.productionPower(i+1))
        }
    }

    if (!temp.basics.cursors.buy) temp.basics.cursors.buy = function(i, buyMode) {
        let a = temp.basics.cursors.baseCosts[i]
        let r = temp.basics.cursors.costScales[i]
        let c = temp.basics.cursors.getCurrentCost(i)
        let unl = temp.basics.pointProducers.unlock(i)
        if (i==0 && unl) {
            if (buyMode == "singles") {
                if ( player.points.gte(c) ) {
                    player.points = player.points.minus(c)
                    player.cursorsBought[0] = player.cursorsBought[0].plus(1)
                }
            } else if (buyMode == "max") {
                let amount = OmegaNum.affordGeometricSeries(player.points, a, r, player.cursorsBought[0])
                let sumCost = OmegaNum.sumGeometricSeries(amount, a, r, player.cursorsBought[0])
                player.points = player.points.minus(sumCost)
                player.cursorsBought[0] = player.cursorsBought[0].plus(amount)
            }
        } else if (i > 0 && unl) {
            let sumAmt = temp.basics.cursors.getSumAmount(i-1)
            if (buyMode == "singles") {
                if ( sumAmt.gte(c) ) {
                    player.extraCursors[i-1] = player.extraCursors[i-1].minus(c)
                    player.cursorsBought[i] = player.cursorsBought[i].plus(1)
                }
            } else if (buyMode == "max") {
                let amount = OmegaNum.affordGeometricSeries(sumAmt, a, r, player.cursorsBought[i])
                let sumCost = OmegaNum.sumGeometricSeries(amount, a, r, player.cursorsBought[i])
                player.extraCursors[i-1] = player.extraCursors[i-1].minus(sumCost)
                player.cursorsBought[i] = player.cursorsBought[i].plus(amount)
            }
        }
    }

    temp.basics.factories.baseCosts = [new OmegaNum(20), new OmegaNum(2000), new OmegaNum(2000)]
    temp.basics.factories.costScales = [new OmegaNum(1.03), new OmegaNum(1.005), new OmegaNum(1.005)]
    if (!temp.basics.factories.getCurrentCost) temp.basics.factories.getCurrentCost = function(i) {
        let a = temp.basics.factories.baseCosts[i]
        let r = temp.basics.factories.costScales[i]
        return a.times(r.pow(player.factoriesBought[i]))
    }
    if (!temp.basics.factories.getSumAmount) temp.basics.factories.getSumAmount = function(i) {
        return player.factoriesBought[i].plus(player.extraFactories[i])
    }

    if (!temp.basics.factories.baseProduction) temp.basics.factories.baseProduction = function(i) {
        if (i == 3-1) {
            return new OmegaNum(40)
        } else if (i == 2-1) {
            return new OmegaNum(20)
        } else {
            return new OmegaNum(1)
        }
    }

    if (!temp.basics.factories.productionPower) temp.basics.factories.productionPower = function(i) {
        if (i==3-1) {
            let p = new OmegaNum(1)
            if (temp.basics.pointUpgrades.isUnlocked(11)) p = p.times(getPointUpgradeEffect(11, player.pointUpgrades[11-1]))
            return p
        } else if (i==2-1) {
            let p = new OmegaNum(1)
            if (temp.basics.pointUpgrades.isUnlocked(7)) p = p.times(getPointUpgradeEffect(7, player.pointUpgrades[7-1]))
            if (player.rank.gte(rankRewardReq[12-1])) p = p.times(getRankEffect("12").factory2)
            return p
        } else if (i==1-1) {
            let p = new OmegaNum(1)
            if (player.thrusterPoints.unlocked) p = p.times(getIdlePointEffect())
            return p
        } else {
            return new OmegaNum(1)
        }
    }

    if (!temp.basics.factories.gainRate) temp.basics.factories.gainRate = function(i) {
        let pointProducerRows = Math.min(player.cursorsBought.length, player.factoriesBought.length, player.extraCursors.length, player.extraFactories.length)
        if (i >= pointProducerRows-1) {
            return new OmegaNum(0)
        } else {
            return temp.basics.factories.getSumAmount(i+1).times(temp.basics.factories.baseProduction(i+1)).times(temp.basics.factories.productionPower(i+1))
        }
    }

    if (!temp.basics.factories.buy) temp.basics.factories.buy = function(i, buyMode) {
        let a = temp.basics.factories.baseCosts[i]
        let r = temp.basics.factories.costScales[i]
        let c = temp.basics.factories.getCurrentCost(i)
        let unl = temp.basics.pointProducers.unlock(i)
        if (i==0 && unl) {
            if (buyMode == "singles") {
                if ( player.points.gte(c) ) {
                    player.points = player.points.minus(c)
                    player.factoriesBought[0] = player.factoriesBought[0].plus(1)
                }
            } else if (buyMode == "max") {
                let amount = OmegaNum.affordGeometricSeries(player.points, a, r, player.factoriesBought[0])
                let sumCost = OmegaNum.sumGeometricSeries(amount, a, r, player.factoriesBought[0])
                player.points = player.points.minus(sumCost)
                player.factoriesBought[0] = player.factoriesBought[0].plus(amount)
            }
        } else if (i > 0 && unl) {
            let sumAmt = temp.basics.factories.getSumAmount(i-1)
            if (buyMode == "singles") {
                if ( sumAmt.gte(c) ) {
                    player.extraFactories[i-1] = player.extraFactories[i-1].minus(c)
                    player.factoriesBought[i] = player.factoriesBought[i].plus(1)
                }
            } else if (buyMode == "max") {
                let amount = OmegaNum.affordGeometricSeries(sumAmt, a, r, player.factoriesBought[i])
                let sumCost = OmegaNum.sumGeometricSeries(amount, a, r, player.factoriesBought[i])
                player.extraFactories[i-1] = player.extraFactories[i-1].minus(sumCost)
                player.factoriesBought[i] = player.factoriesBought[i].plus(amount)
            }
        }
    }
    updateRankTemp()
    updatePointUpgradesTemp()
}

function pointTick(diff) {
    player.points = player.points.plus(
        getPointsPerSecond().times(diff)
    )
    let pointProducerRows = Math.min(player.cursorsBought.length, player.factoriesBought.length, player.extraCursors.length, player.extraFactories.length)
    for (let i = 0;i < pointProducerRows; i++) {
        if (temp) if (i != pointProducerRows-1) {
            player.extraFactories[i] = player.extraFactories[i].plus(
                temp.basics.factories.getSumAmount(i+1).times(temp.basics.factories.baseProduction(i+1)).times(temp.basics.factories.productionPower(i+1))
                .times(diff)
            )
        }
    }
    player.lifetimeGainedPoints = player.lifetimeGainedPoints.plus(
        getPointsPerSecond().times(diff)
    )
    player.bestEverPoints = player.bestEverPoints.max(player.points)
}