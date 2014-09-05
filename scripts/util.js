/** @const */ var FIRE = 0
/** @const */ var WATER = 1
/** @const */ var EARTH = 2
/** @const */ var LIGHT = 3

/** @const */ var COLOR_BRIGHT = '#f441#3bf1#9c01#fb3'.split(1)
/** @const */ var COLOR_DARK = '#c001#09c1#6901#f80'.split(1)

function $id(id) { return document.getElementById(id) }
function rand0(a) { return a * (Math.random() - 0.5) }
function abs(x) { return x < 0 ? -x : x }

var L1 = $id('L1'), L2 = $id('L2')
var R1 = L1.getContext('2d'), R2 = L2.getContext('2d')

/** @const */ var x0 = 0.5 * 900 + 0.5
/** @const */ var y0 = 0.5 * 600 + 0.5

R1.translate(x0, y0)
R2.translate(x0, y0)

var score = 0
var $score = $id('score').firstChild

var game_started = false

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

function createCanvas(w, h, fn) {
    var canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    return fn(canvas.getContext('2d'))
}
