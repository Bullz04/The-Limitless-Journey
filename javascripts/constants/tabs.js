const TAB_BUTTONS_SHOWN = {
    main: function () {
        return true
    },
    miscellaneous: function () {
        return true
    },
    stats: function () {
        return true
    },
    automation: function () {
        return player.automation.unlocked
    },
    about: function () {
        return true
    },
    achievements: function () {
        return true
    }
}

const MAINTAB_BUTTONS_SHOWN = {
    "point-prod-page": function () {
        return true
    },
    "superpoint-prod-page": function () {
        return player.superPoints.unlocked
    },
    "thrusterpoint-prod-page": function () {
        return player.thrusterPoints.unlocked
    },
    "civilization-prod-page": function () {
        return player.civilization.unlocked
    }
}

const POINTMAINTAB_BUTTONS_SHOWN = {
    "producers": function () {
        return true
    },
    "upgrades": function () {
        return true
    }
}