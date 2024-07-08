function init() {
    loadGame()
    HTMLsetup()
    updateTemp()
    setOfflineSeconds()
    gameLoop()
    tab("main")
    mainTab('point-prod-page')
    pointMainTab("producers")
    statsTab("general")
}

var gameLoaded = false
document.onload = init()
document.onbeforeunload = ()=> {player.offlineSecondsLeftover = offlineSeconds; saveGame()}
{
    let x = document.querySelectorAll("#PointClickButton")
    for (let i = 0; i<x.length; i++) {
        x[i].addEventListener("keydown", function(k){
            if(k.keyCode == 13) k.preventDefault();
        })
    }
}
{
    let x = document.querySelectorAll("#YesHardReset")
    for (let i = 0; i<x.length; i++) {
        x[i].addEventListener("keydown", function(k){
            if(k.keyCode == 13) k.preventDefault();
        })
    }
}
/*
document.getElementById("PointClickButton").addEventListener('keydown', function(k){
    if(k.keyCode == 13) k.preventDefault();
});*/
