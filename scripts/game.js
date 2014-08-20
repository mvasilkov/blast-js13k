var moonSize = 0|256 * 2 / 3
var texSize = 320
var x = 0.5 * (900 - moonSize)
var y = 0.5 * (600 - moonSize)

var moon = new Moon
var moonBuf = R1.createImageData(moonSize, moonSize)

var offset = texSize, then = Date.now(), diff

function r() {
    offset -= (diff = Date.now() - then) / 24
    then += diff
    while (offset < 0)
        offset += texSize
    moon.render(moonBuf.data, offset)
    requestAnimationFrame(r)
    R1.putImageData(moonBuf, x, y)
}

r()
