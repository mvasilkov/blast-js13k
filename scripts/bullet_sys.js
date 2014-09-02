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

BulletSystem.prototype.damage = function (rocketSys) {
    var i, j, bullet, rocket, u, v,
        ilen = this.bullets.length,
        jlen = rocketSys.rockets.length

    iloop:
    for (i = 0; i < ilen; ++i) {
        bullet = this.bullets[i]

        for (j = 0; j < jlen; ++j) {
            rocket = rocketSys.rockets[j]

            u = abs(rocket.x - bullet[0])
            v = abs(rocket.y - bullet[1])
            if (u <= 16 && v <= 16 &&
                u * u + v * v <= 256) {

                this.bullets.splice(i, 1)
                // jshint -W017
                --i
                --ilen

                rocketSys.rockets.splice(j, 1)
                rocketSys.dying.push(rocket)
                --j
                --jlen

                continue iloop
            }
        }
    }
}
