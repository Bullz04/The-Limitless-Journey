function getSPGainMult() {
    let m = new OmegaNum(1)
    if (temp)  {
        if (temp.superPoints.upgrades.isUnlocked("1")) m = m.times(temp.superPoints.upgrades.upgEffect(1, player.superPoints.upgrades[1-1]))
        if (temp.superPoints.upgrades.isUnlocked("4")) m = m.times(temp.superPoints.upgrades.upgEffect(4, player.superPoints.upgrades[4-1]).effSPGain)
        if (temp.basics.pointUpgrades.isUnlocked(5)) m = m.times(getPointUpgradeEffect(5, player.pointUpgrades[5-1]))
    }
    return m
}

function getRawSPGainMult() {
    let m = new OmegaNum(1)
    if (temp) {
        if (temp.superPoints.upgrades.isUnlocked("1")) m = m.times(temp.superPoints.upgrades.upgEffect(1, player.superPoints.upgrades[1-1]))
        if (temp.basics.pointUpgrades.isUnlocked(5)) m = m.times(getPointUpgradeEffect(5, player.pointUpgrades[5-1]))
    }
    /*
    if (temp) {
        if (temp.thrusterPoints.upgrades.isUnlocked(2)) m = m.times(temp.thrusterPoints.upgrades.upgEffect(2, player.thrusterPoints.upgrades[2-1]))
    }*/
    //temp.superPoints.upgrades.upgEffect
    return m
}

function getSPPerSecond() {
    return OmegaNum.times(0, getSPGainMult())
}

function getRawSPGainBase() {
    let x = player.superPoints.generators
    let base = x.pow(1.2)
    if (x.gte(100)) {
        let before = new OmegaNum(100).pow(1.2)
        base = base.pow(1.4).div(
            before.pow(OmegaNum.minus(1.4, 1))
        )
    }
    if (x.gte(300)) {
        let before = new OmegaNum(300).pow(1.2).pow(1.4).div(
            new OmegaNum(100).pow(1.2).pow(OmegaNum.minus(1.4, 1))
        )
        base = base.pow(1.6).div( before.pow(OmegaNum.minus(1.6, 1)) )
    }
    return base
}

function getRawSPPerSecond() {
    return OmegaNum.times(getRawSPGainBase(), getRawSPGainMult())
}


function getSPGeneratorDiscount() {
    let disc = new OmegaNum(1)
    return disc
}

function getSuperPointEffect() {
    return player.superPoints.amount.max(0).plus(1).root(Math.E)
}

function updateSPProcessorTemp() {
    if (!temp.superPoints.processor) temp.superPoints.processor = {}
    temp.superPoints.processor.limit = new OmegaNum(15)
    {
        let m = new OmegaNum(1)
        if (temp.superPoints.upgrades.isUnlocked("2")) m = m.times(temp.superPoints.upgrades.upgEffect(2, player.superPoints.upgrades[2-1]))

        temp.superPoints.processor.limit = temp.superPoints.processor.limit.times(m)
    }

    temp.superPoints.processor.conversionRate = new OmegaNum(0.01)
}

function updateSPUpgradesTemp() {
    if (!temp.superPoints.upgrades) temp.superPoints.upgrades = {}


    if (!temp.superPoints.upgrades.isUnlocked) temp.superPoints.upgrades.isUnlocked = function(n) {
        n=n+""
        if (["1", "2", "3"].includes(n)) {
            return true
        } else if (["4"].includes(n)) {
            return player.rank.gte(rankRewardReq[14-1])
        } else return false
    }
    if (!temp.superPoints.upgrades.upgDesc) temp.superPoints.upgrades.upgDesc = function(n) {
        switch (n+"") {
            case "1":
                return "Get more super points and raw super points"
            case "2":
                return "Increase processor processing limit"
            case "3":
                return "Increase scaling weakness of rank"
            case "4":
                return "Get more super points and thruster points"
            default:
                return "???"
        }
    }
    if (!temp.superPoints.upgrades.upgEffect) temp.superPoints.upgrades.upgEffect = function(n, upgradeLevel) {
        let lUpg = upgradeLevel
        switch (n+"") {
            case "1": {
                let eff = lUpg.div(5).plus(1)
                if (lUpg.gte(20)) eff = eff.times(lUpg.minus(20).max(0).times(0.05).plus(1))
                if (lUpg.gte(30)) eff = eff.times(lUpg.minus(30).max(0).times(0.075).plus(1))
                if (lUpg.gte(40)) eff = eff.times(lUpg.minus(40).max(0).times(0.1).plus(1))
                if (lUpg.gte(100)) eff = eff.times(lUpg.minus(100).max(0).times(0.075).plus(1).pow(1.1))
                if (lUpg.gte(140)) eff = eff.times(lUpg.minus(140).max(0).times(0.01).plus(1).pow(7.34))
                
                /*
                if (lUpg.gte(10)) eff = eff.times(lUpg.minus(10).max(0).times(0.05).plus(1).pow(2))
                if (lUpg.gte(20)) eff = eff.times(lUpg.minus(20).max(0).times(0.02).plus(1))
                if (lUpg.gte(25)) eff = eff.times(lUpg.minus(25).max(0).times(0.03).plus(1))
                if (lUpg.gte(50)) eff = eff.times(lUpg.minus(50).max(0).times(0.04).plus(1))
                if (lUpg.gte(90)) eff = eff.times(lUpg.minus(90).max(0).times(0.01).plus(1).pow(2))
                if (lUpg.gte(100)) eff = eff.times(lUpg.minus(100).max(0).times(0.01).plus(1).pow(3))
                if (lUpg.gte(110)) eff = eff.times(lUpg.minus(110).max(0).times(0.05).plus(1).pow(2))
                if (lUpg.gte(200)) eff = eff.times(lUpg.minus(200).max(0).times(0.01).plus(1))
                if (lUpg.gte(300)) eff = eff.times(lUpg.minus(300).max(0).times(0.007).plus(1).pow(4))
                */

                if (lUpg.gte(325)) eff = eff.times(
                    lUpg.minus(325).max(0).times(0.02).plus(1).pow(2)
                    .pow(
                        OmegaNum.root(lUpg.minus(325).div(200).times(8).plus(1).max(0), 2)
                    )
                )
                return eff
            }
            case "2": {
                let eff = OmegaNum.pow(1.3, lUpg.min(50))
                    .times( OmegaNum.pow(lUpg.times(0.2).plus(1), 2) )
                if (lUpg.gte(20)) eff = eff.times(lUpg.minus(20).max(0).times(0.1).plus(1))
                if (lUpg.gte(40)) eff = eff.times(lUpg.minus(40).max(0).times(0.05).plus(1).pow(2))
                if (lUpg.gte(50)) eff = eff.times(OmegaNum.pow(1.4, lUpg.min(100).minus(50).max(0)))
                if (lUpg.gte(100)) eff = eff.times(OmegaNum.pow(1.4, lUpg.min(150).minus(100).max(0)))
                if (lUpg.gte(150)) eff = eff.times(OmegaNum.pow(1.16, lUpg.min(200).minus(150).max(0)))
                if (lUpg.gte(150)) eff = eff.times(lUpg.minus(150).max(0).times(0.03).plus(1).pow(2))
                if (lUpg.gte(175)) eff = eff.times(lUpg.minus(175).max(0).times(0.03).plus(1).pow(2))
                if (lUpg.gte(200)) eff = eff.times(OmegaNum.pow(1.4, lUpg.minus(200).max(0)))
                return eff
            }
            case "3":
                return lUpg.times(0.03)
            case "4": {
                let effSPGain = lUpg.times(0.1).plus(1).pow(Math.LN10)
                if (lUpg.gte(30)) effSPGain = effSPGain.times(
                    lUpg.minus(30).max(0).times(0.1).plus(1).pow(Math.sqrt(2)+1)
                )
                let effThrusterPointGain = lUpg.times(0.05).plus(1)
                return {effSPGain: effSPGain, effThrusterPointGain: effThrusterPointGain}
            }
            default:
                return new OmegaNum(1)
        }
    }
    if (!temp.superPoints.upgrades.upgEffectDisp) temp.superPoints.upgrades.upgEffectDisp = function(n, upgradeLevel) {
        switch (n+"") {
            case "1": case "2":
                return "×" + format(temp.superPoints.upgrades.upgEffect(n, upgradeLevel), 3, 3)
                + " → ×"
                + format(temp.superPoints.upgrades.upgEffect(n, upgradeLevel.plus(1)), 3, 3)
            case "3":
                return "+" + format(temp.superPoints.upgrades.upgEffect(n, upgradeLevel).times(100), 3, 3)
                + "% → +"
                + format(temp.superPoints.upgrades.upgEffect(n, upgradeLevel.plus(1)).times(100), 3, 3) + "%"
            case "4":
                return "Super points: ×" + format(temp.superPoints.upgrades.upgEffect(n, upgradeLevel).effSPGain, 3, 3)
                + " → ×"
                + format(temp.superPoints.upgrades.upgEffect(n, upgradeLevel.plus(1)).effSPGain, 3, 3) + "<br>"
                + "Thruster points: ×" + format(temp.superPoints.upgrades.upgEffect(n, upgradeLevel).effThrusterPointGain, 3, 3)
                + " → ×"
                + format(temp.superPoints.upgrades.upgEffect(n, upgradeLevel.plus(1)).effThrusterPointGain, 3, 3)
            default:
                return ""
        }
    }
    if (!temp.superPoints.upgrades.baseCost) temp.superPoints.upgrades.baseCost = function(n) {
        switch (n+"") {
            case "1":
                return new OmegaNum(100)
            case "2":
                return new OmegaNum(700)
            case "3":
                return new OmegaNum(3000)
            case "4":
                return new OmegaNum(1e45)
            default:
                return new OmegaNum("eeeee99999")
        }
    }
    if (!temp.superPoints.upgrades.costScale) temp.superPoints.upgrades.costScale = function(n) {
        switch (n+"") {
            case "1":
                return new OmegaNum(1.3)
            case "2":
                return new OmegaNum(Math.PI).minus(1)
            case "4":
                return new OmegaNum(2)
            default:
                return new OmegaNum("eeeee99999")
        }
    }
    if (!temp.superPoints.upgrades.scalingWeakness) temp.superPoints.upgrades.scalingWeakness = function(n) {
        switch (n+"") {
            case "3":
                let sw = new OmegaNum(1)
                if (player.rank.gte(rankRewardReq[11-1])) sw = sw.plus(getRankEffect("11"))
                return sw
            default:
                return new OmegaNum(1)
        }
    }
    if (!temp.superPoints.upgrades.upgType) temp.superPoints.upgrades.upgType = function(n) {
        switch (n+"") {
            case "1": case "2": case "4":
                return "geometric"
            case "3":
                return "custom"
            default:
                return "geometric"
        }
    }
    if (!temp.superPoints.upgrades.costData) temp.superPoints.upgrades.costData = function(x) {//only for custom cost
        if (x == 3) {
            let bc = temp.superPoints.upgrades.baseCost(x)
            let lvl = player.superPoints.upgrades[x-1]
            let sw = temp.superPoints.upgrades.scalingWeakness(x)
            let cost = OmegaNum.pow(
                7,
                lvl.div(sw).plus(3).pow(2).minus(OmegaNum.pow(3, 2))
                .div(6)
            ).times(bc)
            if (lvl.gte(6)) {
                cost = OmegaNum.pow(
                7,
                lvl.div(1.15).plus(OmegaNum.minus(1.15, 1).div(1.15).times(6))
                .div(sw).plus(3).pow(2).minus(OmegaNum.pow(3, 2))
                .div(6)
            ).times(bc)
            }
            let bulk = player.superPoints.amount.div(bc).max(1).logBase(7)
                .times(6)
                .plus(OmegaNum.pow(3, 2))
                .root(2)
                .minus(3)
                .times(sw)
                .plus(1).floor()
            if (bulk.gte(6)) {
                bulk = player.superPoints.amount.div(bc).max(1).logBase(7)
                .times(6)
                .plus(OmegaNum.pow(3, 2))
                .root(2)
                .minus(3)
                .times(sw)
                .minus(OmegaNum.minus(1.15, 1).div(1.15).times(6))
                .times(1.15)
                .plus(1).floor()
            }
            return {cost:cost, bulk:bulk}
        }
    }

    if (!temp.superPoints.upgrades.finalCost) temp.superPoints.upgrades.finalCost = function(i) {
        if (temp.superPoints.upgrades.upgType(i) == "geometric") {
            let a = temp.superPoints.upgrades.baseCost(i)
            let r = temp.superPoints.upgrades.costScale(i)
            return a.times(r.pow(player.superPoints.upgrades[i-1]))
        } else if (temp.superPoints.upgrades.upgType(i) == "custom") {
            return temp.superPoints.upgrades.costData(i).cost
        }
        
    }

    if (!temp.superPoints.upgrades.maxLevel) temp.superPoints.upgrades.maxLevel = function(n) {
        switch (n+"") {
            default:
                return new OmegaNum(Infinity)
        }
    }
    
    if (!temp.superPoints.upgrades.switchBuyMode) temp.superPoints.upgrades.switchBuyMode = function() {
        if (player.options.superPointUpgradeBuyMode == "max") {
            player.options.superPointUpgradeBuyMode = "singles"
        } else {
            player.options.superPointUpgradeBuyMode = "max"
        }
    }

    if (!temp.superPoints.upgrades.buy) temp.superPoints.upgrades.buy = function(i, buyMode=player.options.superPointUpgradeBuyMode) {
        if (temp.superPoints.upgrades.upgType(i) == "geometric") {
            let a = temp.superPoints.upgrades.baseCost(i)
            let r = temp.superPoints.upgrades.costScale(i)
            let c = a.times(r.pow(player.superPoints.upgrades[i-1]))
            if (buyMode == "singles") {
                if ( player.superPoints.amount.gte(c) && player.superPoints.upgrades[i-1].lt(temp.superPoints.upgrades.maxLevel(i)) ) {
                    player.superPoints.amount = player.superPoints.amount.minus(c)
                    player.superPoints.upgrades[i-1] = player.superPoints.upgrades[i-1].plus(1)
                }
            } else if (buyMode == "max") {
                let amount = OmegaNum.affordGeometricSeries(player.superPoints.amount, a, r, player.superPoints.upgrades[i-1]).min(temp.superPoints.upgrades.maxLevel(i).minus(player.superPoints.upgrades[i-1]))
                let sumCost = OmegaNum.sumGeometricSeries(amount, a, r, player.superPoints.upgrades[i-1])
                player.superPoints.amount = player.superPoints.amount.minus(sumCost)
                player.superPoints.upgrades[i-1] = player.superPoints.upgrades[i-1].plus(amount)
            }    
        } else if (temp.superPoints.upgrades.upgType(i) == "custom") {
            if (buyMode == "singles") {
                if (player.superPoints.amount.gte(temp.superPoints.upgrades.costData(i).cost)) {
                    player.superPoints.upgrades[i-1] = player.superPoints.upgrades[i-1].plus(1)
                }
            } else if (buyMode == "max") {
                if (player.superPoints.amount.gte(temp.superPoints.upgrades.costData(i).cost)) {
                    player.superPoints.upgrades[i-1] = temp.superPoints.upgrades.costData(i).bulk.min(temp.superPoints.upgrades.maxLevel(i))
                }
            }
        }
    }
}

function updateSuperPointsTemp() {
    if (!temp.superPoints) temp.superPoints = {}
    if (!temp.superPoints.generator) temp.superPoints.generator = {}
    temp.superPoints.generator.baseCost = new OmegaNum(1e13)
    let sw = new OmegaNum(1)
    let genReq = temp.superPoints.generator.baseCost.div(getSPGeneratorDiscount())
        .times(
            OmegaNum.pow(
                10,
                player.superPoints.generators.div(sw).div(6).plus(6).pow(1.5).minus(OmegaNum.pow(6, 1.5))
                .div( OmegaNum.pow(7, 1.5).minus(OmegaNum.pow(6, 1.5)) )
                .times(2)
            )
        )
    if (player.superPoints.generators.gte(100)) {
        genReq = temp.superPoints.generator.baseCost.div(getSPGeneratorDiscount())
        .times(
            OmegaNum.pow(
                10,
                player.superPoints.generators.div(3).plus(OmegaNum.minus(1, OmegaNum.div(1, 3)).times(100))
                .div(sw).div(6).plus(6).pow(1.5).minus(OmegaNum.pow(6, 1.5))
                .div( OmegaNum.pow(7, 1.5).minus(OmegaNum.pow(6, 1.5)) )
                .times(2)
            )
        )
    }
    if (player.superPoints.generators.gte(300)) {
        genReq = temp.superPoints.generator.baseCost.div(getSPGeneratorDiscount())
        .times(
            OmegaNum.pow(
                10,
                player.superPoints.generators.div(2).plus(OmegaNum.minus(2, 1).div(2).times(300))
                .root(1.2).times(OmegaNum.pow(300, OmegaNum.minus(1.2, 1).div(1.2)))
                .div(3).plus(OmegaNum.minus(1, OmegaNum.div(1, 3)).times(100))
                .div(sw).div(6).plus(6).pow(1.5).minus(OmegaNum.pow(6, 1.5))
                .div( OmegaNum.pow(7, 1.5).minus(OmegaNum.pow(6, 1.5)) )
                .times(2)
            )
        )
    }
    let genBulk = player.points.div(temp.superPoints.generator.baseCost)
        .times(getSPGeneratorDiscount()).max(1)
        .logBase(10)
        .div(2)
        .times( OmegaNum.pow(7, 1.5).minus(OmegaNum.pow(6, 1.5)) )
        .plus(OmegaNum.pow(6, 1.5))
        .root(1.5)
        .minus(6)
        .times(6)
        .times(sw)
        .plus(1).floor()
    if (genBulk.gte(100)) {
        genBulk = player.points.div(temp.superPoints.generator.baseCost)
        .times(getSPGeneratorDiscount()).max(1)
        .logBase(10)
        .div(2)
        .times( OmegaNum.pow(7, 1.5).minus(OmegaNum.pow(6, 1.5)) )
        .plus(OmegaNum.pow(6, 1.5))
        .root(1.5)
        .minus(6)
        .times(6)
        .times(sw)
        .minus(OmegaNum.minus(1, OmegaNum.div(1, 3)).times(100)).times(3)
        .plus(1).floor()
    }
    if (genBulk.gte(300)) {
        genBulk = player.points.div(temp.superPoints.generator.baseCost)
        .times(getSPGeneratorDiscount()).max(1)
        .logBase(10)
        .div(2)
        .times( OmegaNum.pow(7, 1.5).minus(OmegaNum.pow(6, 1.5)) )
        .plus(OmegaNum.pow(6, 1.5))
        .root(1.5)
        .minus(6)
        .times(6)
        .times(sw)
        .minus(OmegaNum.minus(1, OmegaNum.div(1, 3)).times(100)).times(3)
        .div(OmegaNum.pow(300, OmegaNum.minus(1.2, 1).div(1.2))).pow(1.2)
        .minus(OmegaNum.minus(2, 1).div(2).times(300)).times(2)
        .plus(1).floor()
    }
    temp.superPoints.generator.req = genReq
    temp.superPoints.generator.bulk = genBulk
    if (!temp.superPoints.generator.buy) temp.superPoints.generator.buy = function (buyMode) {
        if (buyMode == "singles") {
            if (player.points.gte(temp.superPoints.generator.req)) {
                player.superPoints.generators = player.superPoints.generators.plus(1)
            }
        } else if (buyMode == "max") {
            if (player.points.gte(temp.superPoints.generator.req)) {
                player.superPoints.generators = player.superPoints.generators.max(temp.superPoints.generator.bulk)
            }
        }
    }
    if (!temp.superPoints.fakeSPProduction) temp.superPoints.fakeSPProduction = new OmegaNum(0)
    if (!temp.superPoints.fakeRawSPProduction) temp.superPoints.fakeRawSPProduction = new OmegaNum(0)
    
    updateSPUpgradesTemp()
    updateSPProcessorTemp()
}

function superPointsTick(diff) {
    if (player.superPoints.unlocked) {
        player.superPoints.amount = player.superPoints.amount.plus(
            getSPPerSecond().times(diff)
        )
        player.superPoints.raw = player.superPoints.raw.plus(
            getRawSPPerSecond().times(diff)
        )
    }
    if (temp) {
        let r = temp.superPoints.processor.conversionRate
        let l = temp.superPoints.processor.limit
        let x_1 = player.superPoints.raw
        let x_2 = player.superPoints.raw.times(OmegaNum.minus(1, r).pow(diff))
        let loss = x_2.minus(x_1).times(-1).min(l.times(diff))

        temp.superPoints.fakeRawSPProduction = loss.div(diff)
        //console.log(loss.div(diff))
        temp.superPoints.fakeSPProduction = loss.div(diff).times(getRawSPGainMult())
        
        if (player.superPoints.unlocked) {
            player.superPoints.raw = player.superPoints.raw.minus(loss)
            player.superPoints.amount = player.superPoints.amount.plus(loss.times(getSPGainMult()))
        }
    }
}