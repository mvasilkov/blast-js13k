/** @const */ var f = 30
/** @const */ var size = c_eval(0|256 * 2 / 3)

/** @constructor */
function Moon(r, rotation, tilt) {
    this.cache = Array(size * size)
    this.r = r || 12
    this.c = f * f - this.r * this.r
    this.rot = [0,
        -Math.PI * (tilt || 48) / 180,
        -Math.PI * (rotation || 24) / 180]
    this.init()
}
Moon['size'] = size


~ function ($$, undefined) {
    /** @const */ var $x = 0
    /** @const */ var $y = 1
    /** @const */ var $z = 2

    /** @const */ var b = -2 * f * f
    /** @const */ var scale = 30
    /** @const */ var fac = scale / size
    /** @const */ var texSize = 320

    var lookAt = [0, f, 0]
    var radiusVector = Array(3)

    $$.calcVector = function (u, v) {
        lookAt[$x] = fac * u - 0.5 * scale
        lookAt[$z] = fac * v - 0.5 * scale

        var a = lookAt[$x] * lookAt[$x] + f * f + lookAt[$z] * lookAt[$z]

        var Δ = b * b - 4 * a * this.c
        if (Δ <= 0) return null

        var x1 = (-b - Math.sqrt(Δ)) / (2 * a)
        radiusVector[$x] = x1 * lookAt[$x]
        radiusVector[$y] = x1 * lookAt[$y] - f
        radiusVector[$z] = x1 * lookAt[$z]

        var x = radiusVector[$x]
        var cos$z = Math.cos(this.rot[$z])
        var sin$z = Math.sin(this.rot[$z])
        radiusVector[$x] = x * cos$z - radiusVector[$y] * sin$z
        radiusVector[$y] = x * sin$z + radiusVector[$y] * cos$z

        var z = radiusVector[$z]
        var cos$y = Math.cos(this.rot[$y])
        var sin$y = Math.sin(this.rot[$y])
        radiusVector[$z] = z * cos$y - radiusVector[$y] * sin$y
        radiusVector[$y] = z * sin$y + radiusVector[$y] * cos$y

        return [texSize * (Math.atan2(radiusVector[$y], radiusVector[$x]) +
                Math.PI + 1) / (2 * Math.PI), texSize * Math.floor(texSize -
                1 - texSize * Math.min(1, Math.acos(radiusVector[$z] / this.r) / Math.PI))]
    }

    $$.getVector = function (i) {
        if (this.cache[i] === undefined) {
            var v = Math.floor(i / size)
            this.cache[i] = this.calcVector(i - v * size, v)
        }
        return this.cache[i]
    }

    $$['render'] = function (writeTo, offset) {
        var readFrom = this.tex.data
        var vec, idxFrom, idxTo
        var i = size * size
        while (i--) {
            vec = this.getVector(i)
            if (vec === null) continue
            idxFrom = 4 * (Math.floor(vec[0] + offset) % texSize + vec[1])
            idxTo = 4 * i
            writeTo[idxTo] = readFrom[idxFrom]
            writeTo[idxTo + 1] = readFrom[idxFrom + 1]
            writeTo[idxTo + 2] = readFrom[idxFrom + 2]
            writeTo[idxTo + 3] = 255
        }
    }

    $$.init = function () {
        this.tex = createCanvas(texSize, function (canvas) {
            canvas.fillStyle = '#7f8c8d'
            canvas.fillRect(0, 0, texSize, texSize)
            canvas.fillStyle = '#ecf0f1'
            var cs = texSize / 32, i, j
            for (i = 0; i < 32; ++i) for (j = 0; j < 32; ++j)
                if (i % 2 == j % 2) canvas.fillRect(cs * i, cs * j, cs, cs)
            return canvas.getImageData(0, 0, texSize, texSize)
        })
    }
}(Moon.prototype)

window['Moon'] = Moon
