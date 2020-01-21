 
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let interval
let frames = 0
const obstacles = []
let score = 0


class Background{
    constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = "./img/segunda.jpg"
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
    ctx.font = '50px Avenir'
    ctx.fillStyle = 'white'
  }
}


class Obstacle {
constructor(x,y, imgSrc) {
  this.x = x
  this.y = y
  this.width = 50
  this.height = 80
  this.img = new Image()
  this.img.src = imgSrc
}
draw() {
  this.x-=20 // velocidad obstaculos
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}
}

class Character {
    constructor(x, y) {
      this.x = 0
      this.y = 230
      this.width = 150
      this.height = 300
      this.sx = 0
      this.sy = 0
      this.img = new Image()
      this.img.src = "./img/depie.png"
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
      this.sx += 400
      if (this.sx >= 3200) this.sx = 0
      ctx.drawImage(
        this.img,
        this.sx,
        this.sy,
        3200/8,  //tamaño imag original
        300,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
    goRight() {
        if (this.x > canvas.width-this.width - 500) return // limite de mov
        this.x += 10
       
      }
      goLeft() {
        if (this.x < -80) return //limite de mov
        this.x -= 5
        
      }
      goUp() {
        if (this.y = 90) return
        this.y -= 150
    }  
         // if ( key [38]){
         // this.vy = -this.jumstrenght * 1.2
                   
        //for(let i = 0 ; i < Math.PI*2 ; i+=(360/45)* Math.PI/180) {
        //    this.y =    Math.sin(i)
     //   }
        
      goDown() {
        this.y += 0
        
      }
      move() {
        this.sx += 400 //mov de imag constante
}
isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
}

let trex = new Character(0, canvas.height - 200)
let trexWorld = new Background()

function startGame() {
  if (interval) return
  //ld.audio.play()
  interval = setInterval(update, 1000 / 15)
  }

function generarObstacles() {
    let img, rnd
    if (frames % 50 === 0) {
      //rnd = Math.floor(Math.random()*200) //* canvas.height
      if (Math.random() >= 0.01) imgSrc = "./img/osta2.png"
      else imgSrc = "./img/osta1.png"
      obstacles.push(new Obstacle(canvas.width + 300,400, imgSrc))
    }
  }
  
  function drawObstacles() {
    generarObstacles()
    obstacles.forEach(obstacle => obstacle.draw())
  }

  function checkCollitions() {
    if (trex.y >= canvas.height - trex.height) return gameOver()
    obstacles.forEach((obstacle, i) => {
      if (obstacle.x + obstacle.width <= 0) {
        obstacles.splice(i, 1)
      }
      trex.isTouching(obstacle) ? gameOver() : null
    })
  }
  
  function gameOver() {
    clearInterval(interval)
  }
//    obstacles.forEach((obstacle, idx) => {
//      if (trex.isTouching(obstacle)) {
//        if (obstacle.img.src) score += 10
//        else score -= 20
//        return obstacles.splice(idx, 1)
//      }
//    })
  
function update() {
    frames++
    if ( trex.y < 230 ) { trex.y += 5 }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    trexWorld.draw()
    trex.draw()
    drawObstacles()
    checkCollitions()
    ctx.fillText(String(score), canvas.width - 100, 100)
  }
  document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 39:
        return trex.goRight()
  
      case 38:
       // this.vy = this.jumstrenght * 1.2
       if ( trex.y > 230 ) { 
           return}
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