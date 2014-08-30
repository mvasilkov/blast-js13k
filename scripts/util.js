/** @const */ var FIRE = 0
/** @const */ var WATER = 1
/** @const */ var EARTH = 2

/** @const */ var COLOR_BRIGHT = ['#f44', '#33b5e5', '#9c0']
/** @const */ var COLOR_DARK = ['#c00', '#09c', '#690']

function $id(id) { return document.getElementById(id) }
function rand0(a) { return a * (Math.random() - 0.5) }

var L1 = $id('L1'), L2 = $id('L2')
var R1 = L1.getContext('2d'), R2 = L2.getContext('2d')

var x0 = 0.5 * 900 + 0.5
var y0 = 0.5 * 600 + 0.5

R1.translate(x0, y0)
R2.translate(x0, y0)

/*
function load(images, done) {
    var toLoad = images.length
    var res = Array(toLoad)
    var loaded = 0

    images.forEach(function (url, i) {
        var image = new Image
        image.onload = function () {
            res[i] = this
            if (++loaded == toLoad)
                done(res)
        }
        image.src = url
    })
}
*/

function createCanvas(size, fn) {
    var canvas = document.createElement('canvas')
    canvas.height = canvas.width = size
    return fn(canvas.getContext('2d'))
}
