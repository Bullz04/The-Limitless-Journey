var currentVersion = "v1.0.0"
class Player {
    constructor() {
        this.version = currentVersion
        this.offlineSecondsLeftover = 0
        this.lastUpdate = Date.now()
        this.points = new OmegaNum(10)
        this.lifetimeGainedPoints = new OmegaNum(0)
        this.bestEverPoints = new OmegaNum(0)
        this.autoClicks = new OmegaNum(0)
        this.manualClicks = new OmegaNum(0)
        this.trueClicks = new OmegaNum(0)
        this.cursorsBought = [
            new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)
        ]
        this.factoriesBought = [
            new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)
        ]
        this.extraCursors = [
            new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)
        ]
        this.extraFactories = [
            new OmegaNum(0), new OmegaNum(0), new OmegaNum(0)
        ]
        this.achievements = {
            levels: {
                "a1": new OmegaNum(0),
                "a2": new OmegaNum(0),
                "a3": new OmegaNum(0),
                "a4": new OmegaNum(0),
                "a5": new OmegaNum(0),
                "a6": new OmegaNum(0),
                "a7": new OmegaNum(0),
                "a8": new OmegaNum(0),
                "a9": new OmegaNum(0)
            }
        }
        this.rank = new OmegaNum(0)
        this.options = {
            notation: "standard",
            pointUpgradeBuyMode: "singles",
            superPointUpgradeBuyMode: "singles",
            thrusterPointUpgradeBuyMode: "singles",
            automationBuyMode: "singles",
            offlineProgression: "on",
            offlineProgressionRate: 0.1
        }
        this.pointUpgrades = [
            new OmegaNum(0),new OmegaNum(0),
            new OmegaNum(0),new OmegaNum(0),
            new OmegaNum(0),new OmegaNum(0),
            new OmegaNum(0),new OmegaNum(0),
            new OmegaNum(0),new OmegaNum(0),
            new OmegaNum(0)
        ]
        this.superPoints = {
            unlocked: false,
            generators: new OmegaNum(0),
            raw: new OmegaNum(0),
            amount: new OmegaNum(0),
            upgrades: [
                new OmegaNum(0),
                new OmegaNum(0),
                new OmegaNum(0),
                new OmegaNum(0)
            ]
        }
        this.automation = {
            unlocked: false,
            basic: {
                autoclicker: {
                    level: new OmegaNum(0),
                    charge: new OmegaNum(0),
                    enabled: false
                },
                autoupgrader: {
                    level: new OmegaNum(0),
                    charge: new OmegaNum(0),
                    enabled: false
                },
                autothruster: {
                    level: new OmegaNum(0),
                    charge: new OmegaNum(0),
                    enabled: false
                }
            }
        }
        this.thrusterPoints = {
            unlocked: false,
            amount: new OmegaNum(0),
            clickPoints: new OmegaNum(0),
            idlePoints: new OmegaNum(0),
            thrusters: new OmegaNum(0),
            upgrades: [
                new OmegaNum(0),
                new OmegaNum(0),
                new OmegaNum(0),
                new OmegaNum(0)
            ]
        }
        this.civilization = {
            unlocked: false
        }
    }
}

/*var images = {
    fruit:
}*/
var player = new Player()
player.version = currentVersion
var confirmStatus = {
    import: false,
    hardReset: false
}
var saveTimer = 0
var offlineLoaded = false
var offlineSeconds = 0
var offlineSecondsMax = 0
var pointUpgradeAmount = 11
var spUpgradeAmount = 4
var thrusterPointUpgradeAmount = 4
var currentTab = "main"
var currentMainTab = "point-prod-page"
var currentPointMainTab = "producers"
var currentStatsTab = "rank-rewards"
var currentMiscTab = "options"
var statRows = 6
var yesHardResetClicksLeft = 50

//function useOfflineTicks() {}
