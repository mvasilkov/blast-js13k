function draw_sputnik(s, c) {
    R2.beginPath()
    R2.moveTo(-10 * s, 12 * s)
    R2.lineTo(0, -20 * s)
    R2.lineTo(10 * s, 12 * s)
    R2.lineTo(0, 8 * s)
    R2.fillStyle = c
    R2.fill()
}

function Sputnik() {
    this.a = 0

    R1.setLineDash([4])
    R1.strokeStyle = COLOR_BRIGHT[LIGHT]

    R1.beginPath()
    R1.arc(0, 0, 120, 0, 2 * Math.PI, false)
    R1.stroke()
}

Sputnik.prototype.render = function (nap) {
    var av, x, y
    this.a -= (av = 0.001 * nap)
    if (this.a < 0)
        this.a += 2 * Math.PI
    x = 119 * Math.cos(this.a)
    y = 119 * Math.sin(this.a)
    R2.save()
    R2.translate(x, y)
    R2.rotate(this.a)
    draw_sputnik(1, COLOR_BRIGHT[LIGHT])
    draw_sputnik(0.5, COLOR_DARK[LIGHT])
    R2.restore()
}
