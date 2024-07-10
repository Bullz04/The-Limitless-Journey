function productionLoop(diff) {
    thrusterPointsTick(diff)
    superPointsTick(diff)
    pointTick(diff)
    automationTick(diff)
}

function offlineLoop(diff) {
    offlineSecondsMax = Math.max(120, player.offlineSeconds, offlineSecondsMax)
    if (player.offlineSeconds <= 0) offlineSecondsMax = 120
    let secondsUsed = Math.min(offlineSecondsMax * 0.1 * diff, player.offlineSeconds)
    player.offlineSeconds -= Math.max(secondsUsed, 0)
    productionLoop(secondsUsed)
}

function setOfflineSeconds() {
    let now = Date.now();
    if (player.options.offlineProgression == "on") {
        player.offlineSeconds += ((now - player.lastUpdate) / 1000)
    } else player.offlineSeconds += 0
}

function gameLoop() {
    let now = Date.now();
    let diff = new OmegaNum((now - player.lastUpdate) / 1000)//.times(getTimeSpeed());
    if (!offlineLoaded) diff = new OmegaNum(0)
    if (diff.lt(0)) diff = new OmegaNum(0)
    offlineLoaded = true

    updateTemp()
    updateHTMLElements()
    
    updateTab()
    updateStatsTab()
    updateMainTab()
    updatePointMainTab()
    updateMiscellaneousTab()

    updateModal()
    updateStyles()
    updateOptions()
    updateUnlocks()
    updateAchievementLevels()

    updateTabButtons()
    updateMainTabButtons()
    updateStatsTabButtons()
    updatePointMainTabButtons()
    updateMiscellaneousTabButtons()

    if (player.options.offlineProgression == "on" && diff.gte(60)) {
        setOfflineSeconds()
        diff = new OmegaNum(0)
    } else if (player.options.offlineProgression == "off" && diff.gte(6)) {
        diff = new OmegaNum(0)
    }
    offlineLoop(diff)
    if (player.offlineSeconds <= 0) productionLoop(diff) 
    if (saveTimer >= 15) {
        saveTimer = 0
        saveGame()
    } else {
        saveTimer += diff.min(1000).toNumber()
    }
    

    player.lastUpdate = now
    requestAnimationFrame(gameLoop)
};

