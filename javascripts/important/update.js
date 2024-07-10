function updateUnlocks() {
    if (player.points.gte(SUPER_POINT_UNLOCK)) player.superPoints.unlocked = true
    if (player.points.gte(AUTOMATION_UNLOCK)) player.automation.unlocked = true
    if (player.points.gte(THRUSTER_POINT_UNLOCK.points) && player.rank.gte(THRUSTER_POINT_UNLOCK.rank)) player.thrusterPoints.unlocked = true
}

function modalIsDisplayed() {
    let disp = false
    if (player.offlineSeconds > 0) disp = true
    if (confirmStatus.import) disp = true
    if (confirmStatus.hardReset) disp = true
    return disp
}

function isMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function updateModal() {
    let disp = modalIsDisplayed()
    document.getElementById("modalBG").style.display = (disp ? "" : "none")
}

function updateAllInnerHTML(selector, innerHTML) {
    let x = document.querySelectorAll(selector)
    for (let i = 0; i<x.length; i++) {
        x[i].innerHTML = innerHTML
    }
}

function updateAllOnclick(selector, action) {
    let x = document.querySelectorAll(selector)
    for (let i = 0; i<x.length; i++) {
        x[i].onclick = () => action()
    }
}

function updateAllDisplay(selector, disp) {
    let x = document.querySelectorAll(selector)
    for (let i = 0; i<x.length; i++) {
        x[i].style.display = disp
    }
}

function setAllAttributes(selector, name, value) {
    let x = document.querySelectorAll(selector)
    for (let i = 0; i<x.length; i++) {
        x[i].setAttribute(name, value)
    }
}

function addAllClassLists(selector, value) {
    let x = document.querySelectorAll(selector)
    for (let i = 0; i<x.length; i++) {
        x[i].classList.add(value)
    }
}

function removeAllClassLists(selector, value) {
    let x = document.querySelectorAll(selector)
    for (let i = 0; i<x.length; i++) {
        x[i].classList.remove(value)
    }
}

function removeAllAttributes(selector, name) {
    let x = document.querySelectorAll(selector)
    for (let i = 0; i<x.length; i++) {
        x[i].removeAttribute(name)
    }
}

function updateAllCheckboxButtons(selector, statement) {
    if (statement) updateAllInnerHTML(selector, "✓")
    else updateAllInnerHTML(selector, "✗")
}
/*
function updateAllAddEventListener(selector, type, listener) {
    let x = document.querySelectorAll(selector)
    for (let i = 0; i<x.length; i++) {
        x[i].addEventListener(type, () => listener())
    }
}
*/
function HTMLsetup() {
    for (let i = 0; i < pointUpgradeAmount; i++) {
        let upgButton = document.createElement("button")
        upgButton.className = "upgrade"
        upgButton.id = "PointUpgrade" + (i+1)

        upgButton.innerHTML = (i+1)+"<br><span id=\"PointUpgDesc" + (i+1) + "\"></span><br>"
        + "<span id=\"PointUpgEffect" + (i+1) + "\"></span><br>"
        + "Level: <span id=\"PointUpgLevel" + (i+1) + "\"></span><br><br>"
        + "<span id=\"PointUpgCost" + (i+1) + "\"></span>"
        
        document.getElementById("PointUpgradeContainer").appendChild(upgButton)
    }
    for (let i = 0; i < spUpgradeAmount; i++) {
        let upgButton = document.createElement("button")
        upgButton.className = "upgrade"
        upgButton.id = "UziUpgrade" + (i+1)

        upgButton.innerHTML = "<span id=\"UziSW" + (i+1) + "\"></span>"
        +(i+1)+"<br><span id=\"UziUpgDesc" + (i+1) + "\"></span><br>"
        + "<span id=\"UziUpgEffect" + (i+1) + "\"></span><br>"
        + "Level: <span id=\"UziUpgLevel" + (i+1) + "\"></span><br><br>"
        + "<span id=\"UziUpgCost" + (i+1) + "\"></span>"
        if (i+1==4) upgButton.style.fontSize = "11px"
        
        document.getElementById("SPUpgradeContainer").appendChild(upgButton)
    }
    for (let i = 0; i < thrusterPointUpgradeAmount; i++) {
        let upgButton = document.createElement("button")
        upgButton.className = "upgrade"
        upgButton.id = "ThrusterPointUpgrade" + (i+1)

        upgButton.innerHTML = (i+1)+"<br><span id=\"ThrusterPointUpgDesc" + (i+1) + "\"></span><br>"
        + "<span id=\"ThrusterPointUpgEffect" + (i+1) + "\"></span><br>"
        + "Level: <span id=\"ThrusterPointUpgLevel" + (i+1) + "\"></span><br><br>"
        + "<span id=\"ThrusterPointUpgCost" + (i+1) + "\"></span>"
        
        document.getElementById("ThrusterPointUpgradeContainer").appendChild(upgButton)
    }

    for (let i = 0; i < 10; i++) {
        let inventoryButton = document.createElement("button")
        let div1 = document.createElement("div")
        div1.style.position = "relative"
        div1.style.height = "100%"
        div1.style.width = "100%"
        inventoryButton.style.height = "100px"
        inventoryButton.style.width = "100px"
        if (i == 0) div1.innerHTML = "<img src=\"./images/fruitNew.png\" width=\"85\" height=\"85\"><div id=\"InventoryQty" + (i+1) + "\" class=\"InventoryQuantity\">1.797e308,000,000</div>"
        inventoryButton.appendChild(div1)
        document.getElementById("Inventory").appendChild(inventoryButton)
    }
    for (let i = 0; i < rankRewards.length; i++) {//Rank Reward Table
        let tr = document.createElement("tr")
        tr.id = "RankReward" + (i+1)
        let td1 = document.createElement("td")
        td1.innerHTML = (i+1)+"."
        tr.appendChild(td1)
        let td2 = document.createElement("td")
        td2.id = "RanksRequired" + (i+1)
        tr.appendChild(td2)
        let td3 = document.createElement("td")
        td3.id = "RankRewardDesc" + (i+1)
        tr.appendChild(td3)
        document.getElementById("RankRewardTable").appendChild(tr)
    }

    for (let i = 0; i < statRows; i++) {//Statistics
        let tr = document.createElement("tr")
        let tdDetails = document.createElement("td")
        tdDetails.id = "GeneralStatDesc" + (i+1)
        tdDetails.style.textAlign = "right"
        tdDetails.style.paddingRight = "10px"
        tr.appendChild(tdDetails)

        let tdValue = document.createElement("td")
        tdValue.id = "GeneralStatValue" + (i+1)
        tdValue.style.textAlign = "left"
        tdValue.style.paddingLeft = "10px"
        tr.appendChild(tdValue)

        document.getElementById("GeneralStatTable").appendChild(tr)
    }

    for (let i of Object.keys(player.achievements.levels)) {//Achievements
        let a = document.createElement("div")
        a.className = "Achievement"
        let span = document.createElement("span")
        span.className = "title"
        //span.style.fontSize = "18px"
        span.innerHTML = ACHIEVEMENT_DETAILS[i].title
        let table = document.createElement("table")
        let tr = document.createElement("tr")
        table.width = "100%"
        let tdImg = document.createElement("td")
        tdImg.width = "30%"
        tdImg.innerHTML = "<img id=\"AchievementImg" + i + "\" src=\"./images/AchTrophy.svg\">"
        let tdDetails = document.createElement("td")
        tdDetails.style.textAlign = "left"
        tdDetails.style.verticalAlign = "top"
        tdDetails.id = i + "Details"
        tdDetails.width = "70%"
        let achOrder = document.createElement("span")
        let achTier = document.createElement("span")
        let achDesc = document.createElement("span")
        let achPointReward = document.createElement("span")
        achOrder.id = i+"AchOrder"
        achTier.id= i+"AchTier"
        achDesc.id= i+"AchDesc"
        achPointReward.id= i+"AchPointReward"
        //tdDetails.appendChild(document.createElement("br"))
        tdDetails.appendChild(achOrder)
        tdDetails.appendChild(document.createElement("br"))
        tdDetails.appendChild(achTier)
        tdDetails.appendChild(document.createElement("br"))
        tdDetails.appendChild(achDesc)
        tdDetails.appendChild(document.createElement("br"))
        tdDetails.appendChild(achPointReward)
        tr.appendChild(tdImg)
        tr.appendChild(tdDetails)
        table.appendChild(tr)
        

        a.appendChild(span)
        a.appendChild(table)
        document.getElementById("AchievementContainer").appendChild(a)
    }

    {//Producers
        let pointProducerRows = Math.min(player.cursorsBought.length, player.factoriesBought.length, player.extraCursors.length, player.extraFactories.length)
        for (let i = 0; i < pointProducerRows; i++) {
            let tr = document.createElement("tr")
            tr.id = "PointProducer" + (i+1)
            let tdFactories = document.createElement("td")
            tdFactories.innerHTML = "<span id=\"Factory" + (i+1) + "Amt\"></span> factories" + ( (i>0) ? "^"+(i+1) : "" ) + " <span id=\"Factory" + (i+1) + "GainRate\"></span><br>"
                +"Bought: <span id=\"Factory" + (i+1) + "Bought\"></span><br><br>"
                +"Base prod.: +<span id=\"Factory" + (i+1) + "BaseProd\"></span>/s<br>"
                +"Prod. power: ×<span id=\"Factory" + (i+1) + "ProdPower\"></span><br><br>"
                +"<span id=\"Factory" + (i+1) + "Cost\"></span><br><button id=\"Factory" + (i+1) + "Buy1Button\">Buy 1</button> <button id=\"Factory" + (i+1) + "BuyMaxButton\">Buy Max</button>"
            let tdCursors = document.createElement("td")
            tdCursors.innerHTML = "<span id=\"Cursor" + (i+1) + "Amt\"></span> cursors" + ( (i>0) ? "^"+(i+1) : "" ) + " <span id=\"Cursor" + (i+1) + "GainRate\"></span><br>"
                +"Bought: <span id=\"Cursor" + (i+1) + "Bought\"></span><br><br>"
                +"Base prod.: +<span id=\"Cursor" + (i+1) + "BaseProd\"></span>/click<br>"
                +"Prod. power: ×<span id=\"Cursor" + (i+1) + "ProdPower\"></span><br><br>"
                +"<span id=\"Cursor" + (i+1) + "Cost\"></span><br><button id=\"Cursor" + (i+1) + "Buy1Button\">Buy 1</button> <button id=\"Cursor" + (i+1) + "BuyMaxButton\">Buy Max</button>"
            tr.appendChild(tdCursors)            
            tr.appendChild(tdFactories)
            document.getElementById("PointProducerTable").appendChild(tr)

        }
    }
}

function updateHTMLElements() {
    document.getElementById("LoadingScreen").style.display = "none"
    document.getElementById("OfflineTime").innerHTML = format(new OmegaNum(player.offlineSeconds), 3, 0)
    document.getElementById("PointsPerSecond").innerHTML = format(getPointsPerSecond(), 3, 2, undefined, 1e9)
    document.getElementById("PointAmt").innerHTML = format(player.points, 3, 2, undefined, 1e9)
    document.getElementById("FeatureMilestone").innerHTML = featureMilestoneDisp()
    updateAllOnclick(
        "#PointClickButton",
        () => pointClick(1, false)
    )
    updateAllInnerHTML("#PointsPerClick", format(getPointsPerClick(), 3, 2, undefined, 1e9))
    document.getElementById("PointAmt").style.fontSize = (isMobile() ? 25/1.75 : 25) + "px"
    if (isMobile()) {
        setAllAttributes("table", "mobile", "")
        setAllAttributes("body", "mobile", "")
        setAllAttributes("button", "mobile", "")
        setAllAttributes("div.tabButtons", "mobile", "")
        setAllAttributes("span#RankNumber", "mobile", "")//button.upgrade
        setAllAttributes("button.upgrade", "mobile", "")
        setAllAttributes("button.disabledUpgrade", "mobile", "")//button#SPGeneratorButton
        setAllAttributes("button#SPGeneratorButton", "mobile", "")//
        setAllAttributes(".title", "mobile", "")
        setAllAttributes(".SuperPointProcessor", "mobile", "")
        setAllAttributes("#saveText", "mobile", "")
        setAllAttributes(".OptionSection", "mobile", "")
        setAllAttributes(".Achievement", "mobile", "")//.automator
        setAllAttributes(".automator", "mobile", "")
        setAllAttributes(".MessageChoice", "mobile", "")
        setAllAttributes("img#socialImage", "mobile", "")
        setAllAttributes("img#TLJlogo", "mobile", "")
    } else {
        removeAllAttributes("table", "mobile")
        removeAllAttributes("body", "mobile")
        removeAllAttributes("button", "mobile")
        removeAllAttributes("div.tabButtons", "mobile")
        removeAllAttributes("span#RankNumber", "mobile")
        removeAllAttributes("button.upgrade", "mobile")
        removeAllAttributes("button.disabledUpgrade", "mobile")
        removeAllAttributes("button#SPGeneratorButton", "mobile")
        removeAllAttributes(".title", "mobile")
        removeAllAttributes(".SuperPointProcessor", "mobile")
        removeAllAttributes("#saveText", "mobile")
        removeAllAttributes(".OptionSection", "mobile")
        removeAllAttributes(".Achievement", "mobile")
        removeAllAttributes(".automator", "mobile")
        removeAllAttributes(".MessageChoice", "mobile")
        removeAllAttributes("img#socialImage", "mobile")
        removeAllAttributes("img#TLJlogo", "mobile")
    }
    if (currentTab == "main") {
        if (currentMainTab == "point-prod-page") {
            let pointProducerRows = Math.min(player.cursorsBought.length, player.factoriesBought.length, player.extraCursors.length, player.extraFactories.length)
            for (let i = 0; i < pointProducerRows; i++) {
                if (temp) {
                    let getResourceTypeRequired = function(n, producer) {
                        let res = ""
                        let pow = ""
                        if (n==0) {
                            res = "points"
                        } else if (n > 0) {
                            if (producer == "factory") {
                                res = "factories"
                            } else if (producer == "cursor") {
                                res = "cursors"
                            }
                        }
                        if (n >= 2) {
                            pow = "^" + n
                        }
                        return res + pow
                    }

                    let getResourcesRequired = function(n, producer) {
                        if (n == 0) return player.points
                        else if (n>0) {
                            if (producer == "factory") {
                                return temp.basics.factories.getSumAmount(n-1)
                            } else if (producer == "cursor") {
                                return temp.basics.cursors.getSumAmount(n-1)
                            }
                        }
                    }
                    document.getElementById("PointProducer" + (i+1)).style.display = ((temp.basics.pointProducers.unlock(i) == true) ? "" : "none")

                    document.getElementById("Cursor" + (i+1) + "Amt").innerHTML = format(temp.basics.cursors.getSumAmount(i), 3, 2, undefined)
                    document.getElementById("Factory" + (i+1) + "Amt").innerHTML = format(temp.basics.factories.getSumAmount(i), 3, 2, undefined)
                    document.getElementById("Cursor" + (i+1) + "Bought").innerHTML = format(player.cursorsBought[i], 3, 2, undefined, 1e12)
                    document.getElementById("Factory" + (i+1) + "Bought").innerHTML = format(player.factoriesBought[i], 3, 2, undefined, 1e12)
                    document.getElementById("Cursor" + (i+1) + "BaseProd").innerHTML = format(temp.basics.cursors.baseProduction(i), 3, 3)
                    document.getElementById("Factory" + (i+1) + "BaseProd").innerHTML = format(temp.basics.factories.baseProduction(i), 3, 3)
                    document.getElementById("Cursor" + (i+1) + "ProdPower").innerHTML = format(temp.basics.cursors.productionPower(i), 3, 3)
                    document.getElementById("Factory" + (i+1) + "ProdPower").innerHTML = format(temp.basics.factories.productionPower(i), 3, 3)
                    document.getElementById("Cursor" + (i+1) + "GainRate").innerHTML = (temp.basics.cursors.gainRate(i).neq(0) ? "(" + format(temp.basics.cursors.gainRate(i), 3, 3) + "/click)" : "")
                    document.getElementById("Factory" + (i+1) + "GainRate").innerHTML = (temp.basics.factories.gainRate(i).neq(0) ? "(" + format(temp.basics.factories.gainRate(i), 3, 3) + "/s)" : "")
                    document.getElementById("Cursor" + (i+1) + "Cost").innerHTML = "Cost: " + format(temp.basics.cursors.getCurrentCost(i), 3, 2, undefined) + " " + getResourceTypeRequired(i, "cursor")
                    document.getElementById("Factory" + (i+1) + "Cost").innerHTML = "Cost: " + format(temp.basics.factories.getCurrentCost(i), 3, 2, undefined) + " " + getResourceTypeRequired(i, "factory")
    
                    document.getElementById("Cursor" + (i+1) +"Buy1Button").onclick = ()=>temp.basics.cursors.buy(i, "singles")
                    document.getElementById("Cursor" + (i+1) +"BuyMaxButton").onclick = ()=>temp.basics.cursors.buy(i, "max")
                    document.getElementById("Factory" + (i+1) +"Buy1Button").onclick = ()=>temp.basics.factories.buy(i, "singles")
                    document.getElementById("Factory" + (i+1) +"BuyMaxButton").onclick = ()=>temp.basics.factories.buy(i, "max")
                    if (getResourcesRequired(i, "factory").gte(temp.basics.factories.getCurrentCost(i))) {
                        document.getElementById("Factory" + (i+1) + "BuyMaxButton").className = ""
                        document.getElementById("Factory" + (i+1) + "Buy1Button").className = ""
                    } else {
                        document.getElementById("Factory" + (i+1) + "BuyMaxButton").className = "disabled"
                        document.getElementById("Factory" + (i+1) + "Buy1Button").className = "disabled"
                    }
        
                    if (getResourcesRequired(i, "cursor").gte(temp.basics.cursors.getCurrentCost(i))) {
                        document.getElementById("Cursor" + (i+1) + "BuyMaxButton").className = ""
                        document.getElementById("Cursor" + (i+1) + "Buy1Button").className = ""
                    } else {
                        document.getElementById("Cursor" + (i+1) + "BuyMaxButton").className = "disabled"
                        document.getElementById("Cursor" + (i+1) + "Buy1Button").className = "disabled"
                    }
                }
            }
        
            document.getElementById("RankNumber").innerHTML = "Rank " + format(player.rank, 3, 0)
            if (temp) if (temp.basics) document.getElementById("RankDesc").innerHTML = temp.basics.rank.desc
            if (temp) if (temp.basics) document.getElementById("RankReq").innerHTML = format(temp.basics.rank.cost, 3, 3)
            if (temp) document.getElementById("RankScalingWeakness").innerHTML = (getRankSW().neq(1) ? "Scaling Weakness: " + format(getRankSW().times(100), 3, 3) + "%<br>" : "")
            document.getElementById("RankButton").onclick = ()=>temp.basics.rank.buy("singles")
            //document.getElementById("PointClickButton").style.visibility = (getPointsPerClick().gt(0) ? "visible" : "hidden")
            
        
            for (let i= 0; i < pointUpgradeAmount; i++) {
                document.getElementById("PointUpgrade" + (i+1)).onclick = ()=>temp.basics.pointUpgrades.buy(i+1, player.options.pointUpgradeBuyMode)
                document.getElementById("PointUpgDesc" + (i+1)).innerHTML = getPointUpgradeDesc(i+1)
                document.getElementById("PointUpgEffect" + (i+1)).innerHTML = getPointUpgradeEffDisp(i+1, player.pointUpgrades[i])
                document.getElementById("PointUpgLevel" + (i+1)).innerHTML = format(player.pointUpgrades[i], 5, 0, undefined, 1e6) + (getPointUpgradeMaxLevel(i+1).gte(Infinity) ? "":"/" + format(getPointUpgradeMaxLevel(i+1), 3, 0, undefined, 1e6))
                if (temp) {
                    if (temp.basics.pointUpgrades.finalCost) {
                        if (player.pointUpgrades[i].gte(getPointUpgradeMaxLevel(i+1))) document.getElementById("PointUpgCost" + (i+1)).innerHTML = "MAXED OUT!"
                        else document.getElementById("PointUpgCost" + (i+1)).innerHTML = (temp.basics.pointUpgrades.upgType(i+1) == "custom" ? "Req: " : "Cost: ") + format(temp.basics.pointUpgrades.finalCost(i+1), 3, 1, undefined, 1e6) + " points"
                    }
                    if (temp.basics.pointUpgrades.isUnlocked) document.getElementById("PointUpgrade" + (i+1)).style.display = (temp.basics.pointUpgrades.isUnlocked(i+1) ? "" : "none")
                }
                //temp.basics.pointUpgrades.finalCost
            }
            if (player.options.pointUpgradeBuyMode == "singles") {
                document.getElementById("PointUpgradeBuyMode").innerHTML = "Singles"
            } else {
                document.getElementById("PointUpgradeBuyMode").innerHTML = "Max"
            }

        }
        if (currentMainTab == "superpoint-prod-page") {
            if (player.superPoints.unlocked) {
                document.getElementById("SuperPointLockedScreen").style.display = "none"
                document.getElementById("SuperPointMainScreen").style.display = ""
            } else {
                document.getElementById("SuperPointLockedScreen").style.display = ""
                document.getElementById("SuperPointMainScreen").style.display = "none"
            }
        
            if (temp) if (player.points.gte(temp.superPoints.generator.req)) {
                document.getElementById("SPGeneratorButton").className = ""
            } else {
                document.getElementById("SPGeneratorButton").className = "disabled"
            }
            document.getElementById("SuperPontGeneratorAmt").innerHTML = format(player.superPoints.generators, 3, 0, undefined, 1e9)
            if (temp) {
                document.getElementById("SuperPontGeneratorReq").innerHTML = format(temp.superPoints.generator.req, 3, 0)
                document.getElementById("SPGeneratorButton").onclick = ()=>temp.superPoints.generator.buy("singles")
                document.getElementById("SPGeneratorBuyMaxButton").onclick = ()=>temp.superPoints.generator.buy("max")
            }
            //temp.superPoints.fakeSPProduction
            document.getElementById("SuperPointAmt").innerHTML = format((player.superPoints.amount.eq(0) ? OmegaNum.abs(player.superPoints.amount) : player.superPoints.amount), 3, 2)
            document.getElementById("SPEffect").innerHTML = format(getSuperPointEffect(), 3, 3)
            document.getElementById("RawSuperPointAmt").innerHTML = format(player.superPoints.raw, 3, 2)
            document.getElementById("RawSuperPointGainBase").innerHTML = format(getRawSPGainBase(), 3, 2)
            if (temp) {
                let sumProd = getRawSPPerSecond().minus(
                    player.superPoints.raw
                    .times(temp.superPoints.processor.conversionRate)
                    .min(temp.superPoints.processor.limit)
                )
                document.getElementById("RawSPPerSecond").innerHTML =  (sumProd.lt(0) ? "-" : "+") + format(OmegaNum.abs(sumProd), 3, 2)
                document.getElementById("SPPerSecond").innerHTML = format(
                    getSPPerSecond().plus(
                        player.superPoints.raw
                        .times(temp.superPoints.processor.conversionRate)
                        .min(temp.superPoints.processor.limit)
                        .times(getSPGainMult())
                    ), 3, 2)
                //console.log(temp.superPoints.fakeRawSPProduction)
            }
            if (player.options.superPointUpgradeBuyMode == "singles") {
                document.getElementById("SPUpgradeBuyMode").innerHTML = "Singles"
            } else {
                document.getElementById("SPUpgradeBuyMode").innerHTML = "Max"
            }

            for (let i = 0; i < spUpgradeAmount; i++) {
                //document.getElementById("UziUpgrade" + (i+1)).onclick = ()=>temp.basics.pointUpgrades.buy(i+1, player.options.pointUpgradeBuyMode)
                //temp.superPoints.upgrades.scalingWeakness()
                if (i+1==4) document.getElementById("UziUpgrade" + (i+1)).style.fontSize = (isMobile() ? 11/1.75 : 11) + "px"
                document.getElementById("UziUpgEffect" + (i+1)).innerHTML = temp.superPoints.upgrades.upgEffect(i+1, player.superPoints.upgrades[i])
                document.getElementById("UziUpgLevel" + (i+1)).innerHTML = format(player.superPoints.upgrades[i], 5, 0, undefined, 1e6)// + (getPointUpgradeMaxLevel(i+1).gte(Infinity) ? "":"/" + format(getPointUpgradeMaxLevel(i+1), 3, 0, undefined, 1e6))
                if (temp) {
                    document.getElementById("UziSW" + (i+1)).innerHTML = ( (temp.superPoints.upgrades.scalingWeakness(i+1).neq(1)) ? "SW: " + format(temp.superPoints.upgrades.scalingWeakness(i+1).times(100), 3, 3) + "%<br>" : "")
                    document.getElementById("UziUpgDesc" + (i+1)).innerHTML = temp.superPoints.upgrades.upgDesc(i+1)
                    document.getElementById("UziUpgEffect" + (i+1)).innerHTML = temp.superPoints.upgrades.upgEffectDisp(i+1, player.superPoints.upgrades[i])
                    document.getElementById("UziUpgCost" + (i+1)).innerHTML = (temp.superPoints.upgrades.upgType(i+1) == "custom" ? "Req" : "Cost") + ": " + format(temp.superPoints.upgrades.finalCost(i+1), 3, 1, undefined, 1e6) + " super points"
                    document.getElementById("UziUpgrade" + (i+1)).style.display = (temp.superPoints.upgrades.isUnlocked(i+1) ? "" : "none")
                    document.getElementById("UziUpgrade" + (i+1)).onclick = ()=>{temp.superPoints.upgrades.buy(i+1, player.options.superPointUpgradeBuyMode)}
                }
            }

            
            if (temp) {
                let percentage = player.superPoints.raw.times(temp.superPoints.processor.conversionRate).div(temp.superPoints.processor.limit).times(100)
                document.getElementById("SPProcessorProcess").style.clipPath = "polygon(0% 0%, 0% 100%, " + percentage.toNumber() + "% 100%, " + percentage.toNumber() + "% 0%)"
                document.getElementById("SPProcessorProcess").style.backgroundColor = "hsl(" + Math.max(120 - percentage.toNumber()*1.2, 0) + ", 100%, 50%)"
                document.getElementById("SPProcessorLimit").innerHTML = format(temp.superPoints.processor.limit, 3, 2)
                updateAllInnerHTML(
                    "#SPProcessorProcessRate",
                    "-" + format(player.superPoints.raw.times(temp.superPoints.processor.conversionRate).min(temp.superPoints.processor.limit), 3, 2) + " raw super points/s"
                )
            }
        }
        if (currentMainTab == "thrusterpoint-prod-page") {
            document.getElementById("ThrusterPointAmt").innerHTML = format(player.thrusterPoints.amount, 3, 2)
            document.getElementById("ClickPointAmt").innerHTML = format(player.thrusterPoints.clickPoints, 3, 2)
            document.getElementById("ClickPointEffect").innerHTML = format(getClickPointEffect(), 3, 2)
            document.getElementById("IdlePointEffect").innerHTML = format(getIdlePointEffect(), 3, 2)
            document.getElementById("IdlePointAmt").innerHTML = format(player.thrusterPoints.idlePoints, 3, 2)
            document.getElementById("ThrusterAmt").innerHTML = format(player.thrusterPoints.thrusters, 3, 2)
            document.getElementById("ThrusterPointIdleGain").innerHTML = format(getThrusterPointGain().idleGain, 3, 3)
            document.getElementById("ThrusterPointAutoGain").innerHTML = format(getThrusterPointGain().autoGain, 3, 3)
            document.getElementById("ThrusterPointManualGain").innerHTML = format(getThrusterPointGain().manualGain, 3, 3)

            document.getElementById("ClickPointAutoGain").innerHTML = format(getClickPointGain().autoGain, 3, 3)
            document.getElementById("ClickPointManualGain").innerHTML = format(getClickPointGain().manualGain, 3, 3)

            document.getElementById("IdlePointGain").innerHTML = format(getIdlePointGain().gain, 3, 3)
            if (player.options.thrusterPointUpgradeBuyMode == "singles") {
                document.getElementById("ThrusterPointUpgradeBuyMode").innerHTML = "Singles"
            } else {
                document.getElementById("ThrusterPointUpgradeBuyMode").innerHTML = "Max"
            }
            if (temp) {
                document.getElementById("ThrusterCost").innerHTML = format(temp.thrusterPoints.thrusters.finalCost(), 3, 2)
                document.getElementById("ThrusterBuySinglesButton").onclick = () => temp.thrusterPoints.thrusters.buy("singles")
                document.getElementById("ThrusterBuyMaxButton").onclick = () => temp.thrusterPoints.thrusters.buy("max")
                document.getElementById("ThrusterBuySinglesButton").className = ((player.thrusterPoints.amount.gte(temp.thrusterPoints.thrusters.finalCost())) ? "" : "disabled")
                document.getElementById("ThrusterBuyMaxButton").className = ((player.thrusterPoints.amount.gte(temp.thrusterPoints.thrusters.finalCost())) ? "" : "disabled")
                for (let i = 0; i < thrusterPointUpgradeAmount; i++) {
                    document.getElementById("ThrusterPointUpgrade" + (i+1)).className = ((player.thrusterPoints.thrusters.gte(temp.thrusterPoints.upgrades.finalCost(i+1))) ? "upgrade" : "disabledUpgrade")
                    document.getElementById("ThrusterPointUpgrade" + (i+1)).onclick = ()=>{temp.thrusterPoints.upgrades.buy(i+1, player.options.thrusterPointUpgradeBuyMode)}
                    document.getElementById("ThrusterPointUpgDesc" + (i+1)).innerHTML = temp.thrusterPoints.upgrades.upgDesc(i+1)
                    document.getElementById("ThrusterPointUpgLevel" + (i+1)).innerHTML = format(player.thrusterPoints.upgrades[i], 3, 0)
                    document.getElementById("ThrusterPointUpgEffect" + (i+1)).innerHTML = temp.thrusterPoints.upgrades.upgEffectDisp(i+1, player.thrusterPoints.upgrades[i])
                    document.getElementById("ThrusterPointUpgCost" + (i+1)).innerHTML = "Cost: "+format(temp.thrusterPoints.upgrades.finalCost(i+1), 3, 3)+" thrusters"
                } 
            }
        }
    }
    if (currentTab == "stats") {
        if (currentStatsTab == "general") {
            for (let i = 0; i < statRows; i++) {
                document.getElementById("GeneralStatDesc" + (i+1)).innerHTML = getGeneralStatDesc(i+1)
                document.getElementById("GeneralStatValue" + (i+1)).innerHTML = getGeneralStatValue(i+1)
            }
        }
        if (currentStatsTab == "rank-rewards") {
            for (let i=0;i<rankRewards.length;i++) {
                document.getElementById("RankReward" + (i+1)).style.display = (i+1<=getRankRewardsReached() ? "" : "none")
                document.getElementById("RanksRequired" + (i+1)).innerHTML = format(rankRewardReq[i], 3, 0)
                document.getElementById("RankRewardDesc" + (i+1)).innerHTML = (typeof rankRewardDesc[i] == "function" ? rankRewardDesc[i]() : rankRewardDesc[i])
                    + (temp.basics.rank.effDisp(i+1) !== "" ? "<br>" : "") + temp.basics.rank.effDisp(i+1)
            }
        }
    }
    if (currentTab == "achievements") {
        document.getElementById("AchievementPointAmt").innerHTML = format(getAchievementPoints(), 3, 2, undefined, 1e15)
        document.getElementById("AchievementPointEffect").innerHTML = "×" + format(getAchievementPointEffect(), 3, 3, undefined, 1e6)
        for (let i of Object.keys(player.achievements.levels)) {
            let ach = ACHIEVEMENT_DETAILS
            let achOrder = Object.keys(player.achievements.levels).indexOf(i)+1
            document.getElementById(i + "AchOrder").innerHTML = "#" + achOrder
            document.getElementById(i + "AchTier").innerHTML = "Tier: <span class=\"AchTierNumber\"" + (isMobile()?" mobile":"") + ">" + format(player.achievements.levels[i], 3, 0, undefined, 1e12) + "</span>"
            document.getElementById(i + "AchDesc").innerHTML = (typeof ach[i].desc == "function" ? ach[i].desc() : ach[i].desc)
            document.getElementById(i + "AchPointReward").innerHTML = "+<span class=\"AchTierNumber\"" + (isMobile()?" mobile":"") + ">" + format(getAchievementPointFormula(i, player.achievements.levels[i]), 3, 0, undefined, 1e12) + "</span> AP"
            document.getElementById("AchievementImg" + i).style.width = (isMobile() ? 85/1.75:85) + "px"
            document.getElementById("AchievementImg" + i).style.height = (isMobile() ? 85/1.75:85) + "px"
        }
    }
    if (currentTab == "automation") {
        updateAllCheckboxButtons("#AutoclickerActivation", player.automation.basic.autoclicker.enabled)
        updateAllCheckboxButtons("#AutoupgraderActivation", player.automation.basic.autoupgrader.enabled)
        updateAllCheckboxButtons("#AutothrusterActivation", player.automation.basic.autothruster.enabled)
        if (player.options.automationBuyMode == "singles") {
            document.getElementById("AutomationBuyMode").innerHTML = "Singles"
        } else {
            document.getElementById("AutomationBuyMode").innerHTML = "Max"
        }
        if (temp) {
            {//Autoclicker
                document.getElementById("Autoclicker").style.display = (temp.automation.basicAutomators.isUnlocked("autoclicker")  ? "" : "none")
                document.getElementById("AutoclickerBuyButton").className = (player.points.gte(temp.automation.basicAutomators.getCostData("autoclicker").cost) ? "" : "disabled")
                document.getElementById("AutoclickerBuyCost").innerHTML = format(temp.automation.basicAutomators.getCostData("autoclicker").cost) + " points"
                document.getElementById("AutoclickerBuyButton").onclick = ()=>{temp.automation.basicAutomators.buy("autoclicker", player.options.automationBuyMode)}
                document.getElementById("AutoclickerEffect").innerHTML = temp.automation.basicAutomators.getEffectDisplay("autoclicker", player.automation.basic.autoclicker.level)
                document.getElementById("AutoclickerLevel").innerHTML = format(player.automation.basic.autoclicker.level, 3, 2, undefined, 1e9)
    
                let autoclickerPercentage = player.automation.basic.autoclicker.charge.min(1).times(100)
                document.getElementById("AutoclickerProgress").style.clipPath = "polygon(0% 0%, 0% 100%, " + autoclickerPercentage.toNumber() + "% 100%, " + autoclickerPercentage.toNumber() + "% 0%)"
                document.getElementById("AutoclickerProgress").style.backgroundColor = (player.automation.basic.autoclicker.enabled ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)")
            }
            {//Autoupgrader
                document.getElementById("Autoupgrader").style.display = (temp.automation.basicAutomators.isUnlocked("autoupgrader")  ? "" : "none")
                document.getElementById("AutoupgraderBuyButton").className = (player.superPoints.amount.gte(temp.automation.basicAutomators.getCostData("autoupgrader").cost) ? "" : "disabled")
                document.getElementById("AutoupgraderBuyCost").innerHTML = format(temp.automation.basicAutomators.getCostData("autoupgrader").cost) + " super points"
                document.getElementById("AutoupgraderBuyButton").onclick = ()=>{temp.automation.basicAutomators.buy("autoupgrader", player.options.automationBuyMode)}
                document.getElementById("AutoupgraderEffect").innerHTML = temp.automation.basicAutomators.getEffectDisplay("autoupgrader", player.automation.basic.autoupgrader.level)
                document.getElementById("AutoupgraderLevel").innerHTML = format(player.automation.basic.autoupgrader.level, 3, 2, undefined, 1e9)
    
                let autoupgraderPercentage = player.automation.basic.autoupgrader.charge.min(1).times(100)
                document.getElementById("AutoupgraderProgress").style.clipPath = "polygon(0% 0%, 0% 100%, " + autoupgraderPercentage.toNumber() + "% 100%, " + autoupgraderPercentage.toNumber() + "% 0%)"
                document.getElementById("AutoupgraderProgress").style.backgroundColor = (player.automation.basic.autoupgrader.enabled ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)")
            }
            {//Autothruster
                document.getElementById("Autothruster").style.display = (temp.automation.basicAutomators.isUnlocked("autothruster")  ? "" : "none")
                document.getElementById("AutothrusterBuyButton").className = (player.thrusterPoints.thrusters.gte(temp.automation.basicAutomators.getCostData("autothruster").cost) ? "" : "disabled")
                document.getElementById("AutothrusterBuyCost").innerHTML = format(temp.automation.basicAutomators.getCostData("autothruster").cost) + " thrusters"
                document.getElementById("AutothrusterBuyButton").onclick = ()=>{temp.automation.basicAutomators.buy("autothruster", player.options.automationBuyMode)}
                document.getElementById("AutothrusterEffect").innerHTML = temp.automation.basicAutomators.getEffectDisplay("autothruster", player.automation.basic.autothruster.level)
                document.getElementById("AutothrusterLevel").innerHTML = format(player.automation.basic.autothruster.level, 3, 2, undefined, 1e9)
    
                let autothrusterPercentage = player.automation.basic.autothruster.charge.min(1).times(100)
                document.getElementById("AutothrusterProgress").style.clipPath = "polygon(0% 0%, 0% 100%, " + autothrusterPercentage.toNumber() + "% 100%, " + autothrusterPercentage.toNumber() + "% 0%)"
                document.getElementById("AutothrusterProgress").style.backgroundColor = (player.automation.basic.autothruster.enabled ? "rgb(0, 255, 0)" : "rgb(255, 0, 0)")
            }
        }
    }
    if (modalIsDisplayed()) {
        document.getElementById("OfflineCalculation").style.display = (player.offlineSeconds > 0 ? "" : "none")
        document.getElementById("ImportConfirmation").style.display = (confirmStatus.import ? "" : "none")
        document.getElementById("HardResetConfirmation").style.display = (confirmStatus.hardReset ? "" : "none")

        document.getElementById("YesHardReset").innerHTML = "Yes (" + yesHardResetClicksLeft + ")"
    }
}
//onclick="temp.basics.rank.buy('singles')" 
function updateStyles() {
    if (temp) if (player.points.gte(temp.basics.rank.cost)) {
        document.getElementById("RankButton").className = ""
    } else {
        document.getElementById("RankButton").className = "disabled"
    }

    for (let i= 0; i < pointUpgradeAmount; i++) {
        if (temp) {
            if (temp.basics.pointUpgrades.finalCost) document.getElementById("PointUpgrade" + (i+1)).className = (player.points.gte(temp.basics.pointUpgrades.finalCost(i+1)) || player.pointUpgrades[i].gte(getPointUpgradeMaxLevel(i+1)) ? "upgrade" : "disabledUpgrade")
        }
    }

    for (let i= 0; i < spUpgradeAmount; i++) {
        if (temp) {
            if (temp.superPoints.upgrades.finalCost && temp.superPoints.upgrades.maxLevel) {
                document.getElementById("UziUpgrade" + (i+1)).className = (player.superPoints.amount.gte(temp.superPoints.upgrades.finalCost(i+1)) || player.superPoints.upgrades[i].gte(temp.superPoints.upgrades.maxLevel(i+1)) ? "upgrade" : "disabledUpgrade")
            }
        }
    }

}