const ACHIEVEMENT_DETAILS = {
    "a1": {
        title: "Point Elite",
        desc: () => "Reach " + format(getAchievementNextTier("a1", player.achievements.levels["a1"]), 3, 2) + " points."
    },
    "a2": {
        title: "The TLJ General",
        desc: () => "Reach Rank " + format(getAchievementNextTier("a2", player.achievements.levels["a2"]), 3, 2, undefined, 1e12) + "."
    },
    "a3": {
        title: "The talented fingers",
        desc: () => "Reach total click count of " + format(getAchievementNextTier("a3", player.achievements.levels["a3"]), 3, 2, undefined, 1e12) + "."
    },
    "a4": {
        title: "Supa powah!",
        desc: "Unlock Super Points."
    },
    "a5": {
        title: "Cheats Enabled",
        desc: "Unlock Autoclicker."
    },
    "a6": {
        title: "Producer that produces another producer",
        desc: "Unlock Producers^2."
    },
    "a7" : {
        title: "A dedication!",
        desc: () => "Reach Rank " + format(15) + "."
    },
    "a8": {
        title: "Boost Lust",
        desc: "Unlock Thruster Points."
    },
    "a9": {
        title: "So strong, yet so slow",
        desc: () => "Reach " + format(getAchievementNextTier("a9", player.achievements.levels["a9"]), 3, 2) + " thruster points."
    },
    "a10": {
        title: "Balans is brok",
        desc: "Unlock Producers^3."
    }
}