var a = new Moon(0, 0, 50, NEUTRAL)
a.render()

var r = 250, skew = -0.05 * Math.PI

var b = new Moon(
    r * Math.cos(skew),
    r * Math.sin(skew),
    50, FIRE)
b.render()

var c = new Moon(
    r * Math.cos(4 * Math.PI / 3 + skew)|0,
    r * Math.sin(4 * Math.PI / 3 + skew)|0,
    50, WATER)
c.render()

var d = new Moon(
    r * Math.cos(2 * Math.PI / 3 + skew)|0,
    r * Math.sin(2 * Math.PI / 3 + skew)|0,
    50, EARTH)
d.render()
