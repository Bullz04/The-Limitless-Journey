function switchNotation(notation) {
    player.options.notation = notation
}

function switchOfflineProg(mode) {
    player.options.offlineProgression = mode
}

function switchNumberBehavior(mode) {
    player.options.numberBehavior = mode
}

function updateOptions() {
    let d = document.querySelectorAll("[id$=Notation]")
    for (let i = 0; i < d.length; i++) {
        if (d[i].id==(player.options.notation+"Notation")) document.querySelectorAll("[id$=Notation]")[i].className = "yellow"
        else document.querySelectorAll("[id$=Notation]")[i].className = ""
    }
    d = document.querySelectorAll("[id^=OfflineProgression]")
    let OffProgState = player.options.offlineProgression[0].toUpperCase() + player.options.offlineProgression.slice(1)
    for (let i = 0; i < d.length; i++) {
        if (d[i].id==("OfflineProgression"+OffProgState)) document.querySelectorAll("[id^=OfflineProgression]")[i].className = "yellow"
        else document.querySelectorAll("[id^=OfflineProgression]")[i].className = ""
    }
    d = document.querySelectorAll("[id^=NumberBehavior]")
    for (let i = 0; i < d.length; i++) {
        if (d[i].id==("NumberBehavior"+player.options.numberBehavior)) document.querySelectorAll("[id^=NumberBehavior]")[i].className = "yellow"
        else document.querySelectorAll("[id^=NumberBehavior]")[i].className = ""
    }
}

