/** @constructor */
function RocketSystem() {
    this.rockets = []
    this.dying = []
}

RocketSystem.prototype.add = function () {
    var rocket = new Rocket()
    this.rockets.push(rocket)
}

var shto = 0
function stopShaking() {
    L1.className = ''
    shto = 0
}

RocketSystem.prototype.render = function (nap) {
    var i, len, rocket, av, fv
    len = this.rockets.length
    av = 0.00016 * nap

    R2.setLineDash([4])

    for (i = 0; i < len; ++i) {
        if ((rocket = this.rockets[i]).update(av)) {
            aa.play('boom')
            this.rockets.splice(i, 1)
            this.dying.push(rocket)
            // jshint -W017
            --i
            --len

            L1.className = 'sh'
            if (shto) clearTimeout(shto)
            shto = setTimeout(stopShaking, 300)
        }
        else {
            R2.beginPath()
            R2.arc(rocket.x0, rocket.y0, rocket.r, rocket.a0, rocket.a1, true)
            R2.strokeStyle = COLOR_BRIGHT[rocket.side]
            R2.stroke()
            R2.drawImage(rocket.tex, rocket.x - 16.5, rocket.y - 16.5)
        }
    }

    if (!(len = this.dying.length))
        return

    fv = 0.005 * nap

    for (i = 0; i < len; ++i) {
        rocket = this.dying[i]
        if ((rocket.opacity -= fv) <= 0) {
            this.dying.splice(i, 1)
            // jshint -W017
            --i
            --len
        }
        else {
            R2.globalAlpha = rocket.opacity
            R2.drawImage(rocket.tex, rocket.x - 16.5, rocket.y - 16.5)
        }
    }

    R2.globalAlpha = 1
}
