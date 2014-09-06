function makeBGM() {
    var s = '', t
    for (t = 0; t < 8<<16; ++t)
        s += String.fromCharCode(
            // ((t*('36364689'[t>>13&7]&15))/12&128)+(((((t>>12)^(t>>12)-2)%11*t)/4|t>>13)&127))
            // https://twitter.com/rygorous/status/508028618392764416
            t*"36364689"[(y=t>>12)&7]/12&128|((y^y-2)%11*t/4|y/2)&127)
    return 'RIFF_oO_WAVEfmt' + atob('IBAAAAABAAEARKwAAAAAAAABAAgAZGF0YU') + s + s
}

var bgm = new Audio('data:audio/wav;base64,' + btoa(makeBGM()))
bgm.loop = true
bgm.volume = 0.33
bgm.play()

$id('mus').addEventListener('change',
    function (event) {
        var on = event.target.checked
        bgm[on? 'play': 'pause']()
        if (!on) bgm.currentTime = 0
    }, false)
