var $x = 0
var $y = 1
var $z = 2

var r = 12
var f = 30
var focalPoint = [0, 0, 0]
var moonLocation = [0, f, 0]
var tilt = 40
var turn = 20
var rotation = [0, (-tilt) * Math.PI / 180, (-turn) * Math.PI / 180]
var scale = 30
var size = 256
var texSize = 1024
var fac = scale / size
var lookAt = [0, f, 0]
var radiusVector = Array(3)
var cache = Array(size * size)

var b = -2 * f * f
var c = focalPoint[$x] * focalPoint[$x] + moonLocation[$x] * moonLocation[$x] +
        focalPoint[$y] * focalPoint[$y] + moonLocation[$y] * moonLocation[$y] +
        focalPoint[$z] * focalPoint[$z] + moonLocation[$z] * moonLocation[$z] -
        2 * (
            focalPoint[$x] * moonLocation[$x] +
            focalPoint[$y] * moonLocation[$y] +
            focalPoint[$z] * moonLocation[$z]
        ) - r * r


~ function ($$, undefined) {
    $$.calcVector = function (u, v) {
        lookAt[$x] = fac * u - 0.5 * scale
        lookAt[$z] = fac * v - 0.5 * scale

        var a = lookAt[$x] * lookAt[$x] + f * f + lookAt[$z] * lookAt[$z]

        var Δ = b * b - 4 * a * c
        if (Δ <= 0) return null

        var x1 = (-b - Math.sqrt(Δ)) / (2 * a)
        radiusVector[$x] = x1 * lookAt[$x] + (focalPoint[$x] - moonLocation[$x])
        radiusVector[$y] = x1 * lookAt[$y] + (focalPoint[$y] - moonLocation[$y])
        radiusVector[$z] = x1 * lookAt[$z] + (focalPoint[$z] - moonLocation[$z])

        var x = radiusVector[$x]
        radiusVector[$x] = x * Math.cos(rotation[$z]) - radiusVector[$y] * Math.sin(rotation[$z])
        radiusVector[$y] = x * Math.sin(rotation[$z]) + radiusVector[$y] * Math.cos(rotation[$z])

        var z = radiusVector[$z]
        radiusVector[$z] = z * Math.cos(rotation[$y]) - radiusVector[$y] * Math.sin(rotation[$y])
        radiusVector[$y] = z * Math.sin(rotation[$y]) + radiusVector[$y] * Math.cos(rotation[$y])

        return {
            u: texSize * (
                Math.atan2(radiusVector[$y], radiusVector[$x]) + Math.PI + 1
            ) / (2 * Math.PI),
            v: texSize * Math.floor(texSize - 1 -
                texSize * Math.min(1, Math.acos(radiusVector[$z] / r) / Math.PI)
            )
        }
    }

    $$.getVector = function (i) {
        if (cache[i] === undefined) {
            var v = Math.floor(i / size)
            cache[i] = $$.calcVector(i - v * size, v)
        }
        return cache[i]
    }
}(window)
