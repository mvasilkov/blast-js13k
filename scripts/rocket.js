/** @const */ var deadZone = 100

function Rocket() {
    var s, dist, a
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
    this.a0 = Math.atan2(this.y - this.y0, this.x - this.x0)
    this.a1 = Math.atan2(-this.y0, -this.x0)
}

Rocket.prototype.render = function () {
    R2.beginPath()
    R2.arc(this.x0, this.y0, this.r, this.a0, this.a1, true)
    R2.strokeStyle = '#ffdb4c'
    R2.stroke()
}
