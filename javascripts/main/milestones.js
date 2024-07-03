var featureMilestones = {
    superPoints: {
        req: SUPER_POINT_UNLOCK,
        res: player.points,
        reached: () => {
            return player.points.gte(SUPER_POINT_UNLOCK) || player.superPoints.unlocked
        },
        desc: () => "Reach " + format(SUPER_POINT_UNLOCK) + " points to unlock super points.",
        percentage: () => {
            return player.points.max(1).logBase(10).div(SUPER_POINT_UNLOCK.max(1).logBase(10))
            .times(100)
        }
    },
    automation: {
        req: AUTOMATION_UNLOCK,
        res: player.points,
        reached: () => {
            return player.points.gte(AUTOMATION_UNLOCK) || player.automation.unlocked
        },
        desc: () => "Reach " + format(AUTOMATION_UNLOCK) + " points to unlock automation.",
        percentage: () => {
            return player.points.max(1).logBase(10).div(AUTOMATION_UNLOCK.max(1).logBase(10))
            .times(100)
        }
    },
    thrusterPoints: {
        req: [THRUSTER_POINT_UNLOCK.points, THRUSTER_POINT_UNLOCK.rank],
        res: [player.points, player.rank],
        reached: () => {
            return (player.points.gte(THRUSTER_POINT_UNLOCK.points) && player.rank.gte(THRUSTER_POINT_UNLOCK.rank)) || player.thrusterPoints.unlocked
        },
        desc: () => "Reach " + format(THRUSTER_POINT_UNLOCK.points) + " points and Rank " + format(THRUSTER_POINT_UNLOCK.rank) + " to unlock thruster points.",
        percentage: () => {
            return player.points.max(1).logBase(10).div(THRUSTER_POINT_UNLOCK.points.max(1).logBase(10)).min(1)
            .plus(player.rank.div(THRUSTER_POINT_UNLOCK.rank).min(1)).div(2).times(100)
        }
    },
    civilization: {
        req: new OmegaNum("1e150"),
        res: player.points,
        reached: () => {
            return false
        },
        desc: () => "Reach " + format(new OmegaNum("1e175")) + " points and Rank " + format(25) + " to unlock civilization.",
        percentage: () => {
            return player.points.max(1).logBase(10).div(new OmegaNum("1e175").max(1).logBase(10)).min(1)
            .plus(player.rank.div(25).min(1)).div(2).times(100)
        }
    },
}

function getLowestDisplayed() {//Which milestone should be displayed
    let v = 0
    let stop = false
    for (let m of Object.keys(featureMilestones)) {
        //console.log(featureMilestones[m].reached())
        if (featureMilestones[m].reached() && !stop) v++
        else stop = true
    }
    return v
}

function featureMilestoneDisp() {
    let m = Object.keys(featureMilestones)
    if (getLowestDisplayed()==m.length) return "Semua batu mil telah diraih!"
    else return featureMilestones[m[getLowestDisplayed()]].desc() + " (" + format(featureMilestones[m[getLowestDisplayed()]].percentage(), 3, 3) + "%)"
}