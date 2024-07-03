function getGeneralStatDesc(i) {
    if (i==1) {
        return "Lifetime points"
    } else if (i==2) {
        return "Best-ever points"
    } else if (i==3) {
        return "Total click count"
    } else if (i==4) {
        return "Automatic click count"
    } else if (i==5) {
        return "Manual click count"
    } else if (i==6) {
        return "True click count"
    } else {
        return "Will be added"
    }
}

function getGeneralStatValue(i) {
    if (i==1) {
        return format(player.lifetimeGainedPoints, 3, 2)
    } else if (i==2) {
        return format(player.bestEverPoints, 3, 2)
    } else if (i==3) {
        return format(player.autoClicks.plus(player.manualClicks), 3, 2, undefined, 1e15)
    } else if (i==4) {
        return format(player.autoClicks, 3, 2, undefined, 1e15)
    } else if (i==5) {
        return format(player.manualClicks, 3, 2, undefined, 1e15)
    } else if (i==6) {
        return format(player.trueClicks, 3, 2, undefined, 1e15)
    } else {
        return ":)"
    }
}