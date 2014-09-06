function draw_sputnik(canvas, size, color) {
    canvas.beginPath()
    canvas.moveTo(-10 * size, 12 * size)
    canvas.lineTo(0, -20 * size)
    canvas.lineTo(10 * size, 12 * size)
    canvas.lineTo(0, 8 * size)
    canvas.fillStyle = color
    canvas.fill()
}

/** @constructor */
function Sputnik() {
    this.a = 0
    this.x = 120
    this.y = 0

    R1.setLineDash([1, 8])
    R1.strokeStyle = COLOR_BRIGHT[LIGHT]

    R1.beginPath()
    R1.arc(0, 0, 120, 0, 2 * Math.PI, false)
    R1.stroke()

    this.tex = createCanvas(40, 40, function (canvas) {
        canvas.translate(20, 24)
        draw_sputnik(canvas, 1, COLOR_BRIGHT[LIGHT])
        draw_sputnik(canvas, 0.5, COLOR_DARK[LIGHT])
        return canvas.canvas
    })
}

Sputnik.prototype.render = function (nap) {
    var av
    this.a -= (av = 0.001 * nap)
    if (this.a < 0)
        this.a += 2 * Math.PI
    this.x = 120 * Math.cos(this.a)
    this.y = 120 * Math.sin(this.a)
    R2.save()
    R2.translate(this.x, this.y)
    R2.rotate(this.a)
    R2.drawImage(this.tex, -20.5, -24.5)
    R2.restore()
}
