
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy)

listenToMove(yyy)

var eraserEnalbed = false
eraser.onclick = function () {
    eraserEnalbed = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnalbed = false
    actions.className = 'actions'
}
/******************************************************/

function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }

}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.strokeStyle = 'black'
    context.moveTo(x1, y1)
    context.lineWidth = 5
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

function listenToMove(canvas) {
    var using = false
    var lastPoint = { "x": undefined, "y": undefined }
    canvas.onmousedown = function (aaa) {
        console.log('down')
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnalbed) {
            context.clearRect(x - 5, y - 5, 10, 10) // 清除区域是正方形，xy各-5，鼠标就在清除区域的正中心
        } else {
            lastPoint = { "x": x, "y": y }
        }
    }
    canvas.onmousemove = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        if (!using) { return }
        if (eraserEnalbed) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = { "x": x, "y": y }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint  // 注意理解这行
        }
    }
    canvas.onmouseup = function (aaa) {
        using = false
    }
}