 
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let interval
let frames = 0
//let score = 0


class Background{
    constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = "./img/primera.jpg"
    this.img.onload = () => {
      this.draw()
    }
   // this.audio = new Audio()
   // this.audio.src =
   //   'http://23.237.126.42/ost/nyan-cat-fly-gamerip/tpwewlja/146__-0r._-2y.mp3'
   // this.audio.loop = true
}
draw() {    
    if (this.x < -canvas.width) this.x = 0
    this.x--
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.img,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
   // ctx.font = '50px Avenir'
    //ctx.fillStyle = 'white'
  }
}
class Character {
    constructor(x, y) {
      this.x = 0
      this.y = 400
      this.width = 150
      this.height = 150
      this.sx = 0
      this.sy = 0
      this.img = new Image()
      this.img.src = "./img/depie.png"
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
      //  this.y -=2
      if (this.sx >= 3200) this.sx = 0
      ctx.drawImage(
        this.img,
        this.sx,
        this.sy,
        300,  //tamaño imag original
        500,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
    goRight() {
        if (this.x > canvas.width - 100) return
        this.x += 20
        this.move()
      }
      goLeft() {
        this.x -= 20
        this.move()
      }
      goUp() {
        this.y -= 0
        this.move()
      }
      goDown() {
        this.y += 0
        this.move()
      }
      move() {
        this.sx += 50
}
}
let trex = new Character(0, canvas.height - 200)
let trexWorld = new Background()

function startGame() {
  if (interval) return
  interval = setInterval(update, 1000 / 60)
}

function update() {
    frames++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    trexWorld.draw()
    trex.draw()

   // drawObstacles()
    //checkCollitions()
   // ctx.fillText(String(score), canvas.width - 100, 100)
  }
  document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 39:
        return trex.goRight()
  
      case 38:
        return trex.goUp()
  
      case 37:
        return trex.goLeft()
  
      case 40:
        return trex.goDown()
  
      case 13:
        return startGame()
        
    }
  })
  
  document.querySelector('button').onclick = () => {
    if (canvas.webkitRequestFullScreen) {
      canvas.webkitRequestFullScreen()
    } else {
      canvas.mozRequestFullScreen()
    }
  }