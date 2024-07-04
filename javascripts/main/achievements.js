function getAchievementPoints() {
    let sum = new OmegaNum(0)
    for (let i of Object.keys(player.achievements.levels)) {
        sum = sum.plus(getAchievementPointFormula(i, player.achievements.levels[i]))
    }
    return sum
}

function getAchievementPointEffect() {
    let a = getAchievementPoints()
    return a.times(0.001).plus(1)
}

function getAchievementTierFormula(id) {
    if (id == "a1") {//Point Crazy Rich
        return player.points.div(1e6).logBase(1e3)
        .plus(1).max(0).floor()
        //OmegaNum.pow(10, x).times(1e6) = y
    }
    if (id == "a2") {//The TLJ General
        return player.rank.minus(4).div(2)
        .plus(1).max(0).floor()
        //OmegaNum.times(x, 2).plus(4)
    }
    if (id == "a3") {//The Talented Finger
        let x = player.autoClicks.plus(player.manualClicks)
        let form = x.minus(5000).div(2500).root(1.2927339).plus(1).max(0).floor()
        if (form.gte(30)) {
            form = x.minus(5000).div(2500).root(1.2927339).div(30).logBase(31/30).plus(30).plus(1).max(0).floor()
        /*
        OmegaNum.times(
                new OmegaNum(30).times(OmegaNum.pow(31/30, tier.minus(30)))
                .pow(1.2927339),
                2500
            ).plus(5000)
        
        */
        }
        return form
        //OmegaNum.times(x.power(1.2927339), 2500).plus(5000)
    }
    if (id == "a4") {//Supa powah!
        return (player.superPoints.unlocked ? new Decimal(1) : new Decimal(0))
        //OmegaNum.times(x.power(1.2927339), 2500).plus(5000)
    }
    if (id == "a5") {//Cheats enabled
        return (player.automation.unlocked ? new Decimal(1) : new Decimal(0))
        //OmegaNum.times(x.power(1.2927339), 2500).plus(5000)
    }
    if (id == "a6") {//Producer that produces another producer
        return (player.rank.gte(rankRewardReq[8-1]) ? new Decimal(1) : new Decimal(0))
        //OmegaNum.times(x.power(1.2927339), 2500).plus(5000)
    }
    if (id == "a7") {//A dedication
        return (player.rank.gte(15) ? new Decimal(1) : new Decimal(0))
        //OmegaNum.times(x.power(1.2927339), 2500).plus(5000)
    }
    if (id == "a8") {//Boost Lust
        return (player.rank.gte(15) ? new Decimal(1) : new Decimal(0))
        //OmegaNum.times(x.power(1.2927339), 2500).plus(5000)
    }
    if (id == "a9") {//So strong, yet so slow
        return player.thrusterPoints.amount.div(1e3).logBase(5)
        .plus(1).max(0).floor()
        //OmegaNum.pow(5, x).times(1e3)
    }
}

function getAchievementNextTier(id, tier) {
    if (id == "a1") {//Point Crazy Rich
        return OmegaNum.pow(1e3, tier).times(1e6)
        //OmegaNum.pow(1e3, x).times(1e6) = y
    }
    if (id == "a2") {//The TLJ General
        return OmegaNum.times(tier, 2).plus(4)
        //OmegaNum.times(x, 2).plus(4)
    }
    if (id == "a3") {//The Talented Finger
        let form = OmegaNum.times(tier.pow(1.2927339), 2500).plus(5000).ceil()
        if (tier.gte(30)) {
            form = OmegaNum.times(
                new OmegaNum(30).times(OmegaNum.pow(31/30, tier.minus(30)))
                .pow(1.2927339),
                2500
            ).plus(5000).ceil()
        }
        return form
        //OmegaNum.times(x.power(1.2927339), 2500).plus(5000)
    }
    if (id == "a9") {//So strong, yet so slow
        return OmegaNum.pow(5, tier).times(1e3)
        //OmegaNum.pow(5, x).times(1e3)
    }
}

function getAchievementPointFormula(id, tier) {
    if (id == "a1") {//Point Crazy Rich
        return tier.times( OmegaNum.logBase(tier.plus(1), 10).plus(1) ).times(2)
        .floor()
        //OmegaNum.pow(1e3, x).times(1e6) = y
    }
    if (id == "a2") {//The TLJ General
        return tier.times( OmegaNum.logBase(tier.plus(1), 3).plus(1).pow(2) )
        .floor()
        //OmegaNum.times(x, 2).plus(4)
    }
    if (id == "a3") {//The Talented Finger
        return tier.times(3).plus( OmegaNum.ln(tier.plus(1)).times(5) )
        .floor()
        //OmegaNum.times(x.power(1.2927339), 2500).plus(5000)
    }
    if (id == "a4") {
        return tier.times(20)
    }
    if (id == "a5") {
        return tier.times(35)
    }
    if (id == "a6") {
        return tier.times(40)
    }
    if (id == "a7") {
        return tier.times(30)
    }
    if (id == "a8") {
        return tier.times(50)
    }
    if (id == "a9") {//So strong, yet so slow
        return tier.times( OmegaNum.logBase(tier.plus(1), 2).plus(1) ).times(4)
        .floor()
        //OmegaNum.pow(5, x).times(1e3)
    }
}

function updateAchievementLevels() {
    for (let i of Object.keys(player.achievements.levels)) {
        player.achievements.levels[i] = player.achievements.levels[i].max(getAchievementTierFormula(i))
    }
}