var c = document.getElementById('jauslin')
var ctx = c.getContext('2d')
var matrix = 'トウキョウjauslin❤️^_^(°o°)(ノಠ益ಠ)ノ彡┻━┻o^)／(^^)/ (≧∇≦)/(/◕ヮ◕)/(^o^)丿∩(·ω·)∩(·ω·)^ω^'.split('')
var fontSize = 22
var drawInterval
var message = 'neo is a burger'
var currentLetters = []
var specials = []
window.addEventListener('resize', init, false)

function init () {
  c.height = window.innerHeight
  c.width = window.innerWidth
  var specials = []
  setupSpecials()
  clearAnim()
  createColumns()
  drawInterval = setInterval(function () { draw() }, 100)
}

function clearAnim () {
  clearInterval(drawInterval)
}

function createColumns () {
  var columns = Math.round(c.width / fontSize)
  var rows = Math.round(c.height / fontSize)
  for (var x = 0; x < columns; x++) {
    currentLetters[x] = Math.round(Math.random() * rows)
  }
}

function getRandomColor () {
  var letters = 'BC'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 2)]
  }
  return color
}

function draw () {
  ctx.font = '22px Helvetica'
  for (var i = 0; i < currentLetters.length; i++) {
    var x = fontSize * i
    var y = currentLetters[i] * fontSize
    var text = ''
    for (var t = 0; t < message.length; t++) {
      var coord = specials[t].coord
      if (coord[0] === x && coord[1] === y) {
        specials[t].active = true
        text = ' '
      }
      if (coord[1] === y) {
      }
    }
    text = text ? text : matrix[Math.floor(Math.random() * matrix.length)]
    ctx.fillStyle = '#ff80bf'
    // ctx.fillStyle = getRandomColor()
    ctx.fillText(text, x, y)

    if (currentLetters[i] < 0 && Math.random() > 0.45) {
      currentLetters[i] = Math.round(c.height / fontSize)
    }
    currentLetters[i]--
  }

  for (var yy = 0; yy < message.length; yy++) {
    ctx.fillStyle = '#FF99CC'
    var l = specials[yy]
    if (l.active) {
      ctx.fillText(l.letter, l.coord[0], l.coord[1])
      specials[yy].count++
      if (specials[yy].count > 100) {
        specials[yy].active = false
        specials[yy].count = 0
      }
    }
  }
  fadeCanvasOut()
}

function fadeCanvasOut () {
  ctx.fillStyle = 'rgba(0,0,0,.2)'
  ctx.fillRect(0, 0, c.width, c.height)
}

function setupSpecials () {
  specials = []
  var xStart = Math.round(c.width / fontSize / 2) - Math.round(message.length / 2)
  var yx = Math.round((c.height / fontSize) / 2) * fontSize
  for (var i = 0; i < message.length; i++) {
    specials.push({
      letter: message[i],
      coord: [(fontSize * (i + xStart)), yx],
      active: false,
      count: 0
    })
  }
}
init()
