var c = document.getElementById('jauslin')
var ctx = c.getContext('2d')
var drawInterval
var matrix = 'トウキョウjauslin❤️^_^(°o°)(ノಠ益ಠ)ノ彡┻━┻o^)／(^^)/ (≧∇≦)/(/◕ヮ◕)/(^o^)丿∩(·ω·)∩(·ω·)^ω^'.split('')
var message = 'neo is a burger'
var currentLetters = []
var messageLetters = []
var fontSize = 22

window.addEventListener('resize', init, false)

function init () {
  resetCanvasSize()
  setupMessage()
  clearDrawInterval()
  createColumns()
  createDrawInterval()
}

function createDrawInterval () {
  drawInterval = setInterval(function () { draw() }, 100)
}

function resetCanvasSize () {
  c.height = window.innerHeight
  c.width = window.innerWidth
}

function clearDrawInterval () {
  clearInterval(drawInterval)
}

function createColumns () {
  var columns = Math.round(c.width / fontSize)
  var rows = Math.round(c.height / fontSize)
  for (var x = 0; x < columns; x++) {
    currentLetters[x] = Math.round(Math.random() * rows)
  }
}

// function getRandomColor () {
//   var letters = 'BC'
//   var color = '#'
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 2)]
//   }
//   return color
// }

function draw () {
  drawMatrixLetters()
  drawMessage()
  fadeCanvasOut()
}

function drawMatrixLetters () {
  ctx.font = '22px Helvetica'
  for (var i = 0; i < currentLetters.length; i++) {
    var x = fontSize * i
    var y = currentLetters[i] * fontSize
    var text = ''
    for (var t = 0; t < message.length; t++) {
      var coord = messageLetters[t].coord
      if (coord[0] === x && coord[1] === y) {
        messageLetters[t].active = true
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
}

function drawMessage () {
  for (var i = 0; i < message.length; i++) {
    ctx.fillStyle = '#FF99CC'
    var letter = messageLetters[i]
    if (letter.active) {
      ctx.fillText(letter.letter, letter.coord[0], letter.coord[1])
      messageLetters[i].count++
      deActivateLetterIfPastCount(i)
    }
  }
}

function deActivateLetterIfPastCount (index) {
  if (messageLetters[index].count > 100) {
    messageLetters[index].active = false
    messageLetters[index].count = 0
  }
}

function fadeCanvasOut () {
  ctx.fillStyle = 'rgba(0,0,0,.2)'
  ctx.fillRect(0, 0, c.width, c.height)
}

function setupMessage () {
  messageLetters = []
  var xStart = Math.round(c.width / fontSize / 2) - Math.round(message.length / 2)
  var yx = Math.round((c.height / fontSize) / 2) * fontSize
  for (var i = 0; i < message.length; i++) {
    messageLetters.push({
      letter: message[i],
      coord: [(fontSize * (i + xStart)), yx],
      active: false,
      count: 0
    })
  }
}
init()
