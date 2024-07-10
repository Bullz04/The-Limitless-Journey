var shortPrefixes1_1 = ['', 'U', 'D', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'O', 'N']
var shortPrefixes1_2 = ['', 'Dc', 'Vg', 'Tg', 'Qd', 'Qi', 'Se', 'St', 'Og', 'Nn']
var shortPrefixes1_3 = ['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']

var longPrefixes1_1 = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion']
var longPrefixes1_2 = ['', 'un', 'duo', 'tre', 'quattuor', 'quin', 'sex', 'septen', 'octo', 'novem']
var longPrefixes2_1 = ['', 'decillion', 'vigintillion', 'trigintillion', 'quadragintillion', 'quinquagintillion', 'sexagintillion', 'septuagintillion', 'octogintillion', 'nonagintillion']
var longPrefixes2_2 = ['', 'deci', 'viginta', 'triginta', 'quadraginta', 'quinquaginta', 'sexaginta', 'septuaginta', 'octoginta', 'nonaginta']






function format(amount, places = 3, placesUnderLimit = 1, notation = player.options.notation, limit = 1e3) {
    limit = new OmegaNum(limit)
    amount = new OmegaNum(amount)
    let minFracDigits = 0
    let minFracDigitsUnderLimit = 0
    if (player.options.numberBehavior == 0) {
        minFracDigits = places
    }
    if (player.options.numberBehavior == 0 && amount.neq(amount.round())) {
        minFracDigitsUnderLimit = placesUnderLimit
    }
    let power = amount.log10().floor()
    let powerAntime = amount.log10().div(3).floor()
    let mantissa = OmegaNum.div(amount, OmegaNum.pow(10, power))
        //.times(OmegaNum.pow(10, places))
        //.floor()
        //.div(OmegaNum.pow(10, places))
    let mantissaAntime = OmegaNum.div(amount, OmegaNum.pow(1000, powerAntime))
        //.times(OmegaNum.pow(10, places))
        //.floor()
        //.div(OmegaNum.pow(10, places))
    let lol = mantissa.toNumber()
    let lolAntime = mantissaAntime.toNumber()
    //Ignore the "antime" stuff you cannot understand it


    /*
    if (amount instanceof OmegaNum) {
	   var power = amount.e
	   var matissa = amount.mantissa
	} else {
		var matissa = value / Math.pow(10, Math.floor(Math.log10(value)));
		var power = Math.floor(Math.log10(value));
	}
    
    
    */

    if (amount.lt(0)) return "-" + format(amount.times(-1), places, placesUnderLimit, notation)

    if (amount.lt(limit)) return amount.toNumber().toLocaleString("en-US", {minimumFractionDigits:minFracDigitsUnderLimit,maximumFractionDigits:placesUnderLimit})

    if (notation === "scientific") {
        if (power.gte("1e15")) return "e" + format(OmegaNum.log10(amount), 5, placesUnderLimit, "scientific")
        if (power.gte("1e9")) return lol.toLocaleString("en-US", {minimumFractionDigits:minFracDigits,maximumFractionDigits:places}) + "e" + format(OmegaNum.log10(amount), 5, placesUnderLimit, "scientific")
        return lol.toLocaleString("en-US", {minimumFractionDigits:minFracDigits,maximumFractionDigits:places}) + "e" + power.toNumber().toLocaleString("en-US")
    }

    if (notation === "engineering") {
        if (power.gte("1e15")) return "e" + format(OmegaNum.log10(amount), 5, placesUnderLimit, "engineering")
        if (power.gte("1e9")) return lolAntime.toLocaleString("en-US", {minimumFractionDigits:minFracDigits,maximumFractionDigits:places}) + "e" + format(OmegaNum.log10(amount), 5, placesUnderLimit, "engineering")
        return lolAntime.toLocaleString("en-US", {minimumFractionDigits:minFracDigits,maximumFractionDigits:places}) + "e" + (powerAntime.times(3)).toNumber().toLocaleString("en-US")
    }

    if (notation === "true-scientific") {
        if (power.gte("1e15")) return "10<sup>" + format(OmegaNum.log10(amount), 5, placesUnderLimit, "true-scientific") + "</sup>"
        if (power.gte("1e9")) return lol.toLocaleString("en-US", {minimumFractionDigits:minFracDigits,maximumFractionDigits:places})  + "&times;10<sup>" + format(OmegaNum.log10(amount), 5, placesUnderLimit, "true-scientific") + "</sup>"
        return lol.toLocaleString("en-US", {minimumFractionDigits:minFracDigits,maximumFractionDigits:places}) + "&times;10<sup>" + power.toNumber().toLocaleString("en-US") + "</sup>"
    }

    if (notation === "true-engineering") {
        if (power.gte("1e15")) return "10<sup>" + format(OmegaNum.log10(amount), 5, placesUnderLimit, "true-engineering") + "</sup>"
        if (power.gte("1e9")) return lolAntime.toLocaleString("en-US", {minimumFractionDigits:minFracDigits,maximumFractionDigits:places}) + "&times;10<sup>" + format(OmegaNum.log10(amount), 5, placesUnderLimit, "true-engineering") + "</sup>"
        return lolAntime.toLocaleString("en-US", {minimumFractionDigits:minFracDigits,maximumFractionDigits:places}) + "&times;10<sup>" + powerAntime.times(3).toNumber().toLocaleString("en-US") + "</sup>"
    }

    if (notation === "standard") {
        let AAA = Math.floor(power.toNumber() - 3)
        let tempShortSuffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc']
        let result = shortPrefixes1_1[Math.floor((Math.max(AAA, 0) / 3)) % 10] + shortPrefixes1_2[Math.floor((Math.max(AAA, 0) / 30)) % 10] + shortPrefixes1_3[Math.floor((Math.max(AAA, 0) / 300)) % 10]
        let result2 = ((Math.floor((Math.max(AAA, 0))) % 3000000) >= 6000) ? shortPrefixes1_1[Math.floor((Math.max(AAA, 0) / 3000)) % 10] + shortPrefixes1_2[Math.floor((Math.max(AAA, 0) / 30000)) % 10] + shortPrefixes1_3[Math.floor((Math.max(AAA, 0) / 300000)) % 10] + "MI" : (((Math.floor((Math.max(AAA, 0))) % 3000000) >= 3000) ? "MI" : "")
        let result3 = ((Math.floor((Math.max(AAA, 0))) % 3000000000) >= 6000000) ? shortPrefixes1_1[Math.floor((Math.max(AAA, 0) / 3000000)) % 10] + shortPrefixes1_2[Math.floor((Math.max(AAA, 0) / 30000000)) % 10] + shortPrefixes1_3[Math.floor((Math.max(AAA, 0) / 300000000)) % 10] + "MC" : (((Math.floor((Math.max(AAA, 0))) % 3000000000) >= 3000000) ? "MC" : "")
        if (power.gte(1e15)) return "e" + format(OmegaNum.log10(amount), 5, placesUnderLimit, "standard")
        if (power.gte(3000000003)) return lol.toLocaleString("en-US", {minimumFractionDigits:minFracDigits,maximumFractionDigits:places}) + "e" + format(OmegaNum.log10(amount), 5, placesUnderLimit, "standard")
        if (power.lt(33)) return lolAntime.toLocaleString("en-US", {minimumFractionDigits:minFracDigits,maximumFractionDigits:places}) + " " + tempShortSuffixes[Math.floor((power.toNumber()) / 3) % 13];
        return lolAntime.toLocaleString("en-US", {minimumFractionDigits:minFracDigits,maximumFractionDigits:places}) + " " + result3 + ( power.gte(3000003) ? (result+result2 == "" ? "" : "-") : "") + result2 + ( power.gte(3003) ? (result == "" ? "" : "-") : "") + result
    }

    if (amount.gte(new OmegaNum(NaN))) return "NaN"
}