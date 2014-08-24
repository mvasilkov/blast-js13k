function RocketSystem() {
    this.rockets = []
}

RocketSystem.prototype.add = function () {
    var rocket = new Rocket()
    this.rockets.push(rocket)
}

RocketSystem.prototype.render = function (nap) {
    var i, len = this.rockets.length
    var av = nap / 2000
    for (i = 0; i < len; ++i)
        if (this.rockets[i].render(av)) {
            this.rockets.splice(i, 1)
            --i
            --len
        }
}
