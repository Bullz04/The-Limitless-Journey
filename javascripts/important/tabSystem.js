//
function tab(tab) {
    currentTab = tab
}

function updateTab() {
    for (let i = 0; i < document.querySelectorAll("[tab]").length; i++) {
        let x = document.querySelectorAll("[tab]")[i].getAttribute("tab")
        if (currentTab == x) updateAllDisplay("[tab=" + x + "]", "")
        else updateAllDisplay("[tab=" + x + "]", "none")
    }
    //document.querySelector("[tab=" + currentTab + "]").style.display = ""
}

function showTabs() {
    for (let i = 0; i < document.querySelectorAll("[tab]").length; i++) {
        let x = document.querySelectorAll("[tab]")[i].getAttribute("tab")
        if (TAB_BUTTONS_SHOWN[x]() !== undefined) {
            if (TAB_BUTTONS_SHOWN[x]() == true) updateAllDisplay("[id=" + x + "-Tabbtn]", "")
            else updateAllDisplay("[id=" + x + "-Tabbtn]", "none")
        }
    }
}

function statsTab(tab) {
    currentStatsTab = tab
}

function updateStatsTab() {
    for (let i = 0; i < document.querySelectorAll("[statsTab]").length; i++) {
        let x = document.querySelectorAll("[statsTab]")[i].getAttribute("statsTab")
        if (currentStatsTab == x) updateAllDisplay("[statsTab=" + x + "]", "")
        else updateAllDisplay("[statsTab=" + x + "]", "none")
    }
}

function mainTab(tab) {
    currentMainTab = tab
}

function updateMainTab() {
    for (let i = 0; i < document.querySelectorAll("[mainTab]").length; i++) {
        let x = document.querySelectorAll("[mainTab]")[i].getAttribute("mainTab")
        if (currentMainTab == x) updateAllDisplay("[mainTab=" + x + "]", "")
        else updateAllDisplay("[mainTab=" + x + "]", "none")
    }
}

function showMainTabs() {
    for (let i = 0; i < document.querySelectorAll("[mainTab]").length; i++) {
        let t = document.querySelectorAll("[mainTab]")[i].getAttribute("mainTab")
        if (MAINTAB_BUTTONS_SHOWN[t]() !== undefined) {
            //console.log((i+1)+"."+document.querySelectorAll("[id="+t+"-MainTabbtn]")[i])
            if (MAINTAB_BUTTONS_SHOWN[t]() == true) document.querySelectorAll("[id="+t+"-MainTabbtn]")[0].style.display = ""
            else document.querySelectorAll("[id="+t+"-MainTabbtn]")[0].style.display = "none"
        }
    }
}

function pointMainTab(tab) {
    currentPointMainTab = tab
}

function updatePointMainTab() {
    for (let i = 0; i < document.querySelectorAll("[pointMainTab]").length; i++) {
        let x = document.querySelectorAll("[pointMainTab]")[i].getAttribute("pointMainTab")
        if (currentPointMainTab == x) updateAllDisplay("[pointMainTab=" + x + "]", "")
        else updateAllDisplay("[pointMainTab=" + x + "]", "none")
    }
}

function showPointMainTabs() {
    for (let i = 0; i < document.querySelectorAll("[pointMainTab]").length; i++) {
        let t = document.querySelectorAll("[pointMainTab]")[i].getAttribute("pointMainTab")
        if (POINTMAINTAB_BUTTONS_SHOWN[t]() !== undefined) {
            //console.log((i+1)+"."+document.querySelectorAll("[id="+t+"-MainTabbtn]")[i])
            if (POINTMAINTAB_BUTTONS_SHOWN[t]() == true) document.querySelectorAll("[id="+t+"-PointMainTabbtn]")[0].style.display = ""
            else document.querySelectorAll("[id="+t+"-PointMainTabbtn]")[0].style.display = "none"
        }
    }
}

function miscellaneousTab(tab) {
    currentMiscTab = tab
}

function updateMiscellaneousTab() {
    for (let i = 0; i < document.querySelectorAll("[miscTab]").length; i++) {
        let x = document.querySelectorAll("[miscTab]")[i].getAttribute("miscTab")
        if (currentMiscTab == x) updateAllDisplay("[miscTab=" + x + "]", "")
        else updateAllDisplay("[miscTab=" + x + "]", "none")
    }
}
