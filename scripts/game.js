var texSize = 320
var x = 0.5 * (900 - Moon.size)
var y = 0.5 * (600 - Moon.size)

var moon = new Moon
var rocketSys = new RocketSystem
var sputnik = new Sputnik
var bulletSys = new BulletSystem(sputnik)
var moonBuf = R1.createImageData(Moon.size, Moon.size)

moon.render(moonBuf.data, 0)
R1.putImageData(moonBuf, x, y)

var offset = texSize, then = Date.now(), diff

function main() {
    then += (diff = Date.now() - then)
    requestAnimationFrame(main)

    if (opt.rot) {
        offset -= diff / 24
        while (offset < 0)
            offset += texSize

        moon.render(moonBuf.data, offset)
        R1.putImageData(moonBuf, x, y)
    }

    if (!game_started) return

    R2.clearRect(-x0, -y0, 900, 600)

    bulletSys.damage(rocketSys)
    rocketSys.render(diff)
    sputnik.render(diff)
    bulletSys.render(diff)

    $life.nodeValue = life
    $score.nodeValue = score

    if (!life) game_over()
}

var atk = rocketSys.add.bind(rocketSys), ai = 0

function atkWave() {
    if (!game_started) return
    var rand = rand0(2)
    switch (true) {
        case rand > 0.96: setTimeout(atk, 800)
        /* fall through */
        case rand > 0.69: setTimeout(atk, 600)
        /* fall through */
        case rand > 0: setTimeout(atk, 400)
        /* fall through */
        case rand > -0.69: setTimeout(atk, 200)
    }
    atk()
    ai = setTimeout(atkWave, 4000 + rand0(1000))
}

var $xgo = $id('xgo')
var $go = $id('go')

function reset() {
    if (game_started) return
    aa.play('beep')
    life = LIFE_FULL
    score = sputnik.a = 0
    rocketSys.rockets = []
    bulletSys.bullets = []
    game_started = true
    $xgo.className = 'h'
    setTimeout(atkWave, 200)
}
$go.addEventListener('click', reset, false)

function game_over() {
    var msg = 'Game Over'
    game_started = false
    if (ai) clearTimeout(ai)
    R2.fillStyle = 'rgba(0,0,0,0.6)'
    R2.fillRect(-450, -270, 900, 155)
    R2.fillStyle = '#f44'
    R2.fillText(msg, -0.5 * R2.measureText(msg).width, -160)
    $go.firstChild.nodeValue = 'Play again'
    $xgo.className = ''
}

main()
