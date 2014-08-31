function BulletSystem(sputnik) {
    this.sputnik = sputnik
    this.bullets = []
    L2.addEventListener('mousedown', this.fire.bind(this), false)
}

BulletSystem.prototype.fire = function (event) {
    var bcr = L2.getBoundingClientRect()
    var x = event.clientX - 0.5 * 900 - (0|bcr.left) - this.sputnik.x
    var y = event.clientY - 0.5 * 600 - (0|bcr.top) - this.sputnik.y
    var len = Math.sqrt(x * x + y * y)
    this.bullets.push([this.sputnik.x, this.sputnik.y, x / len, y / len])
}

BulletSystem.prototype.render = function (nap) {
    var i, len, b, v
    v = 0.25 * nap
    len = this.bullets.length

    R2.beginPath()
    R2.fillStyle = COLOR_BRIGHT[LIGHT]
    for (i = 0; i < len; ++i) {
        b = this.bullets[i]
        b[0] += v * b[2]
        b[1] += v * b[3]
        R2.rect(b[0] - 2.5, b[1] - 2.5, 5, 5)
    }
    R2.fill()
}
