function Moon(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
}

Moon.prototype.render = function () {
    var PI20 = 0.05 * Math.PI, i, a

    R1.beginPath()
    for (i = 0; i < 40; ++i) {
        a = i * PI20
        R1.lineTo(
            this.x + this.r * Math.cos(a) + rand0(4),
            this.y + this.r * Math.sin(a) + rand0(4)
        )
    }
    R1.closePath()

    R1.lineWidth = 2
    R1.strokeStyle = '#beff0e'
    R1.stroke()
}
