function toggleBasicAutomator(type) {
    if (type=="autoclicker") {
        if (player.automation.basic.autoclicker.enabled == false) {
            player.automation.basic.autoclicker.enabled = true
        } else {
            player.automation.basic.autoclicker.enabled = false
        }
    }
    if (type=="autoupgrader") {
        if (player.automation.basic.autoupgrader.enabled == false) {
            player.automation.basic.autoupgrader.enabled = true
        } else {
            player.automation.basic.autoupgrader.enabled = false
        }
    }
    if (type=="autothruster") {
        if (player.automation.basic.autothruster.enabled == false) {
            player.automation.basic.autothruster.enabled = true
        } else {
            player.automation.basic.autothruster.enabled = false
        }
    }
}

function updateAutomationTemp() {
    if (!temp.automation) temp.automation = {}
    if (!temp.automation.basicAutomators) temp.automation.basicAutomators = {}

    if (!temp.automation.basicAutomators.isUnlocked) temp.automation.basicAutomators.isUnlocked = function(type) {
        if (type=="autoclicker") return true
        else if (type=="autoupgrader") return BASIC_AUTOMATOR_UNLOCK.autoupgrader()
        else if (type=="autothruster") return BASIC_AUTOMATOR_UNLOCK.autothruster()
    }

    if (!temp.automation.basicAutomators.getEffect) temp.automation.basicAutomators.getEffect = function(type, level) {
        if (type=="autoclicker") {
            let l = new OmegaNum(level)
            let f = l.times(0.03).plus( OmegaNum.root(l, 2).div(4) )
            let sasq = function(n, a, d) {
                return new OmegaNum(n).div(2).times(
                    new OmegaNum(a).times(2).plus(
                        n.minus(1).times(d)
                    )
                )
            }
            if (l.gte(100)) f = f.plus( sasq(l.minus(100).max(0), 0.001, 0.01*0.001) )
            return f
        } else if (type=="autoupgrader") {
            let l = new OmegaNum(level)
            let f = l.min(5).times(0.4)
            if (l.gte(5)) f = f.plus(l.minus(5).max(0).times(0.2))
            return f
        } else if (type=="autothruster") {
            let l = new OmegaNum(level)
            let f = l.times(5)
            return f
        }
    }

    if (!temp.automation.basicAutomators.getCurrentEffect) temp.automation.basicAutomators.getCurrentEffect = function(type) {
        if (type=="autoclicker") {
            return temp.automation.basicAutomators.getEffect(type, player.automation.basic.autoclicker.level)
        }
        if (type=="autoupgrader") {
            return temp.automation.basicAutomators.getEffect(type, player.automation.basic.autoupgrader.level)
        }
        if (type=="autothruster") {
            return temp.automation.basicAutomators.getEffect(type, player.automation.basic.autothruster.level)
        }
    }

    if (!temp.automation.basicAutomators.getEffectDisplay) temp.automation.basicAutomators.getEffectDisplay = function(type, level) {
        let l = new OmegaNum(level)
        let before = format(temp.automation.basicAutomators.getEffect(type, l), 3, 3) + " Hz"
        let after = format(temp.automation.basicAutomators.getEffect(type, l.plus(1)), 3, 3) + " Hz"
        if (l.eq(0)) before = "Inactive"
        return before + " → " + after
    }

    if (!temp.automation.basicAutomators.getCostData) temp.automation.basicAutomators.getCostData = function(type) {
        if (type=="autoclicker") {
            let x = player.automation.basic.autoclicker.level
            let cost = OmegaNum.pow(
                2,
                x
                .plus(1).pow(1.25).minus( OmegaNum.pow(1, 1.25) )
                .div( OmegaNum.pow(2, 1.25).minus(OmegaNum.pow(1, 1.25)) )
            ).times(1e20)
            if (x.gte(85)) {
                cost = OmegaNum.pow(
                    2,
                    x.div(2).plus(OmegaNum.times(85, OmegaNum.minus(1, 1/2)))
                    .plus(1).pow(1.25).minus( OmegaNum.pow(1, 1.25) )
                    .div( OmegaNum.pow(2, 1.25).minus(OmegaNum.pow(1, 1.25)) )
                ).times(1e20)
            }
            let bulk = player.points.div(1e20).max(1).logBase(2)
                .times( OmegaNum.pow(2, 1.25).minus(OmegaNum.pow(1, 1.25)) )
                .plus( OmegaNum.pow(1, 1.25) )
                .root(1.25)
                .minus(1)
                .plus(1).floor()
            if (bulk.gte(85)) {
                bulk = player.points.div(1e20).max(1).logBase(2)
                .times( OmegaNum.pow(2, 1.25).minus(OmegaNum.pow(1, 1.25)) )
                .plus( OmegaNum.pow(1, 1.25) )
                .root(1.25)
                .minus(1)
                .minus(OmegaNum.times(85, OmegaNum.minus(1, 1/2)))
                .times(2)
                .plus(1).floor()
            }
            return {cost: cost, bulk: bulk}
        }
        else if (type=="autoupgrader") {
            let x = player.automation.basic.autoupgrader.level
            let cost = OmegaNum.pow(
                2,
                x.plus(10).pow(2).minus( OmegaNum.pow(10, 2) )
                .div( OmegaNum.pow(11, 2).minus(OmegaNum.pow(10, 2)) )
            ).times(2.5e10)
            let bulk = player.superPoints.amount.div(2.5e10).max(1).logBase(2)
                .times( OmegaNum.pow(11, 2).minus(OmegaNum.pow(10, 2)) )
                .plus( OmegaNum.pow(10, 2) )
                .root(2)
                .minus(10)
                .plus(1).floor()
            return {cost: cost, bulk: bulk}
        }
        else if (type=="autothruster") {
            let lv = player.automation.basic.autothruster.level
            let sasq = function(n, a, d) {
                n = new OmegaNum(n)
                a = new OmegaNum(a)
                d = new OmegaNum(d)
                return n.div(2).times(
                    a.times(2).plus(
                        n.minus(1).times(d)
                    )
                )
            }
            let invsasq = function(x, a, d) {
                x = new OmegaNum(x)
                a = new OmegaNum(a)
                d = new OmegaNum(d)
                let a1 = d.div(2)
                let b1 = a.times(2).minus(d).div(2)
                let c1 = new OmegaNum(0).minus(x)
                return OmegaNum.times(b1, -1).plus(OmegaNum.sqrt(
                    b1.pow(2)
                    .minus(
                        OmegaNum.times(4, a1).times(c1)
                    )
                )).div(OmegaNum.times(2,a1))
            }
            let cost = sasq(lv, 200, 50).plus(1000)
            let bulk = invsasq(player.thrusterPoints.thrusters.minus(1000), 200, 50).plus(1).floor()
            return {cost: cost, bulk: bulk}
        }
    }

    if (!temp.automation.basicAutomators.switchBuyMode) temp.automation.basicAutomators.switchBuyMode = function() {
        if (player.options.automationBuyMode == "max") {
            player.options.automationBuyMode = "singles"
        } else {
            player.options.automationBuyMode = "max"
        }
    }

    if (!temp.automation.basicAutomators.buy) temp.automation.basicAutomators.buy = function(type, buyMode) {
        if (type=="autoclicker") {
            if (buyMode == "singles") {
                if (player.points.gte(temp.automation.basicAutomators.getCostData("autoclicker").cost)) {
                    player.automation.basic.autoclicker.level = player.automation.basic.autoclicker.level.plus(1)
                }
            } else if (buyMode == "max") {
                if (player.points.gte(temp.automation.basicAutomators.getCostData("autoclicker").cost)) {
                    player.automation.basic.autoclicker.level = player.automation.basic.autoclicker.level.max(temp.automation.basicAutomators.getCostData("autoclicker").bulk)
                }
            }
        }
        else if (type=="autoupgrader") {
            if (buyMode == "singles") {
                if (player.superPoints.amount.gte(temp.automation.basicAutomators.getCostData("autoupgrader").cost)) {
                    player.automation.basic.autoupgrader.level = player.automation.basic.autoupgrader.level.plus(1)
                }
            } else if (buyMode == "max") {
                if (player.superPoints.amount.gte(temp.automation.basicAutomators.getCostData("autoupgrader").cost)) {
                    player.automation.basic.autoupgrader.level = player.automation.basic.autoupgrader.level.max(temp.automation.basicAutomators.getCostData("autoupgrader").bulk)
                }
            }
        }
        else if (type=="autothruster") {
            if (buyMode == "singles") {
                if (player.thrusterPoints.thrusters.gte(temp.automation.basicAutomators.getCostData("autothruster").cost)) {
                    player.automation.basic.autothruster.level = player.automation.basic.autothruster.level.plus(1)
                }
            } else if (buyMode == "max") {
                if (player.thrusterPoints.thrusters.gte(temp.automation.basicAutomators.getCostData("autothruster").cost)) {
                    player.automation.basic.autothruster.level = player.automation.basic.autothruster.level.max(temp.automation.basicAutomators.getCostData("autothruster").bulk)
                }
            }
        }
    }
}

function automationTick(diff) {
    if (temp) {
        if (player.automation.basic.autoclicker.enabled) {
            player.automation.basic.autoclicker.charge = player.automation.basic.autoclicker.charge.plus(temp.automation.basicAutomators.getCurrentEffect("autoclicker").times(diff))
            let n = player.automation.basic.autoclicker.charge
            player.automation.basic.autoclicker.charge = player.automation.basic.autoclicker.charge.minus(n.floor())
            pointClick(n.floor(), true)
        }
        if (player.automation.basic.autoupgrader.enabled) {
            player.automation.basic.autoupgrader.charge = player.automation.basic.autoupgrader.charge.plus(temp.automation.basicAutomators.getCurrentEffect("autoupgrader").times(diff))
            let n = player.automation.basic.autoupgrader.charge
            player.automation.basic.autoupgrader.charge = player.automation.basic.autoupgrader.charge.minus(n.floor())
            for (let i = 0; i < player.pointUpgrades.length; i++) {
                temp.basics.pointUpgrades.buy(
                    i+1,
                    "fixed",
                    {
                        buyAmount: new OmegaNum(n.floor()),
                        resCoefficient: new OmegaNum(1/4)
                    }
                )
            }
        }
        if (player.automation.basic.autothruster.enabled) {
            player.automation.basic.autothruster.charge = player.automation.basic.autothruster.charge.plus(temp.automation.basicAutomators.getCurrentEffect("autothruster").times(diff))
            let n = player.automation.basic.autothruster.charge
            player.automation.basic.autothruster.charge = player.automation.basic.autothruster.charge.minus(n.floor())
            temp.thrusterPoints.thrusters.buy("fixed", {buyAmount: new OmegaNum(n.floor())})
        }
    }
}