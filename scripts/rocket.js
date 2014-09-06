/** @const */ var deadZone = 100

function intersection(x, y, r) {
    /** @const */ var r0 = 76
    /** @const */ var rr0 = r0 * r0
    var dist, a, b
    dist = Math.sqrt(x * x + y * y)
    if (dist > r0 + r || dist < Math.abs(r0 - r))
        return false
    a = (rr0 - r * r + dist * dist) / (2 * dist)
    b = Math.sqrt(rr0 - a * a)
    return [(x * a + y * b) / dist,
            (y * a - x * b) / dist]
}

function rand_poly(canvas, r, a, c) {
    /** @const */ var PI35 = Math.PI / 3.5
    canvas.beginPath()
    for (var i = 0; i < 7; ++i)
        canvas.lineTo(16.5 + (r + rand0(a)) * Math.cos(PI35 * i),
                      16.5 + (r + rand0(a)) * Math.sin(PI35 * i))
    canvas.fillStyle = c
    canvas.fill()
}

/** @constructor */
function Rocket() {
    var s, dist, a, i10n
    s = 1 - 2 * (Math.random() < 0.5)
    if (Math.random() < 0.4) {
        this.x = 0.5 * 900 * s
        this.y = rand0(600 - deadZone)
    }
    else {
        this.x = rand0(900 - deadZone)
        this.y = 0.5 * 600 * s
    }

    dist = Math.sqrt(this.x * this.x + this.y * this.y)
    this.r = 0.75 * dist
    a = Math.atan(-this.x / this.y) + Math.asin(0.5 * dist / this.r) +
        (this.y < 0) * Math.PI
    this.x0 = this.x - this.r * Math.cos(a)
    this.y0 = this.y - this.r * Math.sin(a)

    if ((i10n = intersection(this.x0, this.y0, this.r))) {
        this.x1 = i10n[0]
        this.y1 = i10n[1]
    }
    else this.x1 = this.y1 = 0

    this.a0 = Math.atan2(this.y - this.y0, this.x - this.x0)
    this.a1 = Math.atan2(this.y1 - this.y0, this.x1 - this.x0)
    if (this.a0 <= this.a1)
        this.a0 += 2 * Math.PI

    this.side = s = 0|Math.random() * 3

    this.tex = createCanvas(33, 33, function (canvas) {
        rand_poly(canvas, 14, 4, COLOR_BRIGHT[s])
        rand_poly(canvas, 7, 2, COLOR_DARK[s])
        return canvas.canvas
    })

    this.opacity = 1
}

Rocket.prototype.update = function (av) {
    this.a0 -= av
    if (this.a0 <= this.a1) return --life, true
    this.x = this.x0 + this.r * Math.cos(this.a0)
    this.y = this.y0 + this.r * Math.sin(this.a0)
}
