//const keyName = "PointClickerSave"

function saveGame() {
    let saveCode = JSON.parse(JSON.stringify(player))
    localStorage.setItem("The-Limitless-Journey-Save", JSON.stringify(saveCode))
}

function loadValue(x, alt) {
    return x !== undefined ? x : alt
}
//importSave(document.getElementById('saveText').value)
function confirmImportSave() {
    confirmStatus.import = true
}

function confirmHardReset() {
    confirmStatus.hardReset = true
}

function yesClickHardReset() {
    yesHardResetClicksLeft--
    if (yesHardResetClicksLeft <= 0) hardReset()
}

function importSave(x) {
    loadGame(x)
}

function loadGame(importedSave) {
    let loadedSave
    if (importedSave !== undefined) {
        loadedSave = JSON.parse(atob(importedSave))
    } else {
        try {
            loadedSave = localStorage.getItem("The-Limitless-Journey-Save")
        } catch (error) {
            console.warn("lol")
        }
    }

    if (loadedSave !== null) {
        try {
            loadedSave = JSON.parse(loadedSave)
        } catch (error) {
            console.log(error)
        }
        ls = loadedSave
        player.offlineSecondsLeftover = loadValue(ls.offlineSecondsLeftover, 0)
        player.version = loadValue(ls.version, currentVersion)
        if (ls.options !== undefined) {
            if (ls.options.offlineProgression) {
                if (ls.options.offlineProgression == "off") player.lastUpdate = loadValue(Date.now(), Date.now())
                else player.lastUpdate = loadValue(ls.lastUpdate, Date.now())
            }
        }
        player.version = loadValue(ls.version, currentVersion)
        player.points = loadValue(new OmegaNum(ls.points), new OmegaNum(10))
        player.autoClicks = loadValue(new OmegaNum(ls.autoClicks), new OmegaNum(0))
        player.manualClicks = loadValue(new OmegaNum(ls.manualClicks), new OmegaNum(0))
        player.trueClicks = loadValue(new OmegaNum(ls.trueClicks), new OmegaNum(0))
        player.lifetimeGainedPoints = loadValue(new OmegaNum(ls.lifetimeGainedPoints), new OmegaNum(10))
        player.bestEverPoints = loadValue(new OmegaNum(ls.bestEverPoints), new OmegaNum(10))
        player.cursorsBought[0] = loadValue(new OmegaNum(ls.cursorsBought[0]), new OmegaNum(0))
        player.factoriesBought[0] = loadValue(new OmegaNum(ls.factoriesBought[0]), new OmegaNum(0))
        for (let i = 0; i < Math.min(ls.cursorsBought.length,ls.factoriesBought.length); i++) {
            player.cursorsBought[i] = loadValue(new OmegaNum(ls.cursorsBought[i]), new OmegaNum(0))
            player.factoriesBought[i] = loadValue(new OmegaNum(ls.factoriesBought[i]), new OmegaNum(0))
            player.extraCursors[i] = loadValue(new OmegaNum(ls.extraCursors[i]), new OmegaNum(0))
            player.extraFactories[i] = loadValue(new OmegaNum(ls.extraFactories[i]), new OmegaNum(0))
        }
        if (ls.achievements !== undefined) {
            if (ls.achievements.levels !== undefined) {
                for (let m of Object.keys(player.achievements.levels)) {
                    if (ls.achievements.levels[m] !== undefined) player.achievements.levels[m] = loadValue(new OmegaNum(ls.achievements.levels[m]), new OmegaNum(0))
                }
            }
        }
        player.rank = loadValue(new OmegaNum(ls.rank), new OmegaNum(0))
        if (ls.options !== undefined) {
            player.options.notation = loadValue(ls.options.notation, "standard")
            player.options.pointUpgradeBuyMode = loadValue(ls.options.pointUpgradeBuyMode, "singles")
            player.options.superPointUpgradeBuyMode = loadValue(ls.options.superPointUpgradeBuyMode, "singles")
            player.options.thrusterPointUpgradeBuyMode = loadValue(ls.options.thrusterPointUpgradeBuyMode, "singles")
            player.options.automationBuyMode = loadValue(ls.options.automationBuyMode, "singles")
            player.options.offlineProgression = loadValue(ls.options.offlineProgression, "on")
            player.options.offlineProgressionRate = loadValue(ls.options.offlineProgressionRate, 0.1)
        }
        if (ls.pointUpgrades !== undefined) {
            /*for (let k of Object.keys(player.pointUpgrades)) {
                player.pointUpgrades[k] = loadValue(ls.pointUpgrades[k], new OmegaNum(0))
            }*/
            for (let i = 0; i < player.pointUpgrades.length; i++) {
                player.pointUpgrades[i] = loadValue(new OmegaNum(ls.pointUpgrades[i]), new OmegaNum(0))
            }
        }
        if (ls.superPoints !== undefined) {
            player.superPoints.unlocked = loadValue(ls.superPoints.unlocked, false)
            player.superPoints.generators = loadValue(new OmegaNum(ls.superPoints.generators), new OmegaNum(0))
            player.superPoints.amount = loadValue(new OmegaNum(ls.superPoints.amount), new OmegaNum(0))
            player.superPoints.raw = loadValue(new OmegaNum(ls.superPoints.raw), new OmegaNum(0))
            for (let i = 0; i < player.superPoints.upgrades.length; i++) {
                player.superPoints.upgrades[i] = loadValue(new OmegaNum(ls.superPoints.upgrades[i]), new OmegaNum(0))
            }
        }
        if (ls.automation !== undefined) {
            player.automation.unlocked = loadValue(ls.automation.unlocked, false)
            if (ls.automation.basic.autoclicker !== undefined) {
                player.automation.basic.autoclicker.level = loadValue(new OmegaNum(ls.automation.basic.autoclicker.level), new OmegaNum(0))
                player.automation.basic.autoclicker.charge = loadValue(new OmegaNum(ls.automation.basic.autoclicker.charge), new OmegaNum(0))
                player.automation.basic.autoclicker.enabled = loadValue(ls.automation.basic.autoclicker.enabled, false)
            }
            if (ls.automation.basic.autoupgrader !== undefined) {
                player.automation.basic.autoupgrader.level = loadValue(new OmegaNum(ls.automation.basic.autoupgrader.level), new OmegaNum(0))
                player.automation.basic.autoupgrader.charge = loadValue(new OmegaNum(ls.automation.basic.autoupgrader.charge), new OmegaNum(0))
                player.automation.basic.autoupgrader.enabled = loadValue(ls.automation.basic.autoupgrader.enabled, false)
            }
            if (ls.automation.basic.autothruster !== undefined) {
                player.automation.basic.autothruster.level = loadValue(new OmegaNum(ls.automation.basic.autothruster.level), new OmegaNum(0))
                player.automation.basic.autothruster.charge = loadValue(new OmegaNum(ls.automation.basic.autothruster.charge), new OmegaNum(0))
                player.automation.basic.autothruster.enabled = loadValue(ls.automation.basic.autothruster.enabled, false)
            }
        }
        if (ls.thrusterPoints !== undefined) {
            player.thrusterPoints.unlocked = loadValue(ls.thrusterPoints.unlocked, false)
            player.thrusterPoints.amount = loadValue(new OmegaNum(ls.thrusterPoints.amount), new OmegaNum(0))
            player.thrusterPoints.clickPoints = loadValue(new OmegaNum(ls.thrusterPoints.clickPoints), new OmegaNum(0))
            player.thrusterPoints.idlePoints = loadValue(new OmegaNum(ls.thrusterPoints.idlePoints), new OmegaNum(0))
            player.thrusterPoints.thrusters = loadValue(new OmegaNum(ls.thrusterPoints.thrusters), new OmegaNum(0))
            for (let i = 0; i < player.thrusterPoints.upgrades.length; i++) {
                player.thrusterPoints.upgrades[i] = loadValue(new OmegaNum(ls.thrusterPoints.upgrades[i]), new OmegaNum(0))
            }
        }
        gameLoaded = true
    }
}

function getExportedSave() {
    return btoa(JSON.stringify(player))
}


function hardReset() {
    player = new Player()
    saveGame()
    loadGame()
    location.reload()
}
