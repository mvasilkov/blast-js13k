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
    var sound = this.sounds[key]
    var soundData = sound.length > 1 ? sound[0|Math.random() * sound.length] : sound[0]
    soundData.pool[soundData.tick].play()
    soundData.tick < soundData.count - 1 ? soundData.tick++ : soundData.tick = 0
}

var aa = new ArcadeAudio()

aa.add('pew', 10, [
    [0, , 0.01, , 0.4384, 0.2, , 0.12, 0.28, 1, 0.65, , , 0.0419, , , , , 1, , , , , 0.3]
])
