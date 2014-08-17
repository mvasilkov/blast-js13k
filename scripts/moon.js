function Moon(x, y, r, team) {
    this.x = x
    this.y = y
    this.r = r
    this.team = team
}

Moon.prototype.outerPath = function () {
    var PI20 = 0.05 * Math.PI, i, a, scatter = 0.1 * this.r

    for (i = 0; i < 40; ++i) {
        a = i * PI20
        R1.lineTo(
            this.x + this.r * Math.cos(a) + rand0(scatter),
            this.y + this.r * Math.sin(a) + rand0(scatter)
        )
    }
}

Moon.prototype.render = function () {
    R1.beginPath()
    this.outerPath()
    this.outerPath()
    this.outerPath()
    R1.closePath()

    R1.fillStyle = '#0b0b0b'
    R1.fill()

    R1.lineWidth = 1
    R1.strokeStyle = '#' + PAINT[this.team]
    R1.stroke()

    R1.moveTo(this.x - 10, this.y)
    R1.lineTo(this.x + 10, this.y)
    R1.moveTo(this.x, this.y - 10)
    R1.lineTo(this.x, this.y + 10)

    // R1.lineWidth = 1
    R1.stroke()
}
