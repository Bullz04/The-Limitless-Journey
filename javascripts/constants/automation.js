const AUTOMATION_UNLOCK = new OmegaNum(1e20)
const BASIC_AUTOMATOR_UNLOCK = {
    autoclicker: function() {
        return true
    },
    autoupgrader: function() {
        return player.rank.gte(rankRewardReq[7-1])
    },
    autothruster: function() {
        return player.rank.gte(rankRewardReq[15-1])
    }
}