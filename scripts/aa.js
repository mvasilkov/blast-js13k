function ArcadeAudio() {
    this.sounds = {}
}

ArcadeAudio.prototype.add = function(key, count, settings) {
    var i
    this.sounds[key] = []
    settings.forEach(function(elem, index) {
        this.sounds[key].push({
            tick: 0,
            count: count,
            pool: []
        })
        for (i = 0; i < count; ++i) {
            var audio = new Audio
            audio.src = jsfxr(elem)
            this.sounds[key][index].pool.push(audio)
        }
    }, this)
}

ArcadeAudio.prototype.play = function(key) {
    if (!opt.snd) return
    var sound = this.sounds[key]
    var soundData = sound.length > 1 ? sound[0|Math.random() * sound.length] : sound[0]
    soundData.pool[soundData.tick].play()
    soundData.tick < soundData.count - 1 ? soundData.tick++ : soundData.tick = 0
}

var aa = new ArcadeAudio()

aa.add('pew', 10, [
    [1,,0.1864,0.1993,0.1924,0.6194,0.2,-0.2589,,,,,,0.637,-0.1903,,,,1,,,,,0.5]
])

aa.add('boom', 5, [
    [3,,0.2404,0.3556,0.329,0.3114,,-0.2614,,,,0.4348,0.6507,,,,-0.0156,-0.1146,1,,,,,0.5]
])

aa.add('kill', 5, [
    [0,,0.2692,,0.3768,0.325,,0.2316,,,,,,0.1146,,0.4716,,,1,,,,,0.5]
])

aa.add('beep', 5, [
    [1,,0.1765,,0.0034,0.4107,,,,,,,,,,,,,1,,,0.1,,0.5]
])
