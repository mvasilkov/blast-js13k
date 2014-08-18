function $id(id) { return document.getElementById(id) }
function rand0(a) { return a * (Math.random() - 0.5) }

var L1 = $id('L1'), L2 = $id('L2')
var R1 = L1.getContext('2d'), R2 = L2.getContext('2d')

var x0 = 0.5 * 900 + 0.5 - 40
var y0 = 0.5 * 600 + 0.5 - 20

R1.translate(x0, y0)
R2.translate(x0, y0)

var NEUTRAL = 0, FIRE = 1, WATER = 2, EARTH = 3

var PAINT = ['ecf0f1', 'ff220e', '1ad6fd', 'beff0e']
