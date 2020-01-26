 
window.onload = function() {
//    document.getElementById("start-button").onclick = function() {
//      startGame();
    }

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.fillRect (0,0,canvas.width,canvas.height)
let interval
let frames = 0
const obstacles = []
let score = 0
const imgs = {
    premio1: "./img/premio1.png",
    premio2: "./img/premio2.png",
    premio3: "./img/premio3.png"
}


class Background{
    constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = "./img/primera.jpg"
    this.img2 = new Image ()
    this.img2.src = "./img/pierde.jpg"
    this.img2.onload = () => {
        this.draw2()
      }
    this.img.onload = () => {
        this.draw()
      }
  
    this.audio = new Audio()
    this.audio.src =
     './music/juego.mp3'
    this.audio.loop = true
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
  draw2(){
      
    ctx.drawImage(this.img2, 0, 0, this.width, this.height)
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
  this.audio = new Audio()
      this.audio.src =
       './music/pacman-dies.mp3'
}
draw() {
  this.x-=20 // velocidad obstaculos
  ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  //ctx.strokeRect(this.x, this.y, this.width, this.height)
  //ctx.strokeRect(this.x, this.y+25, this.width, this.height-25)
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
      this.audio = new Audio()
      this.audio.src =
       './music/ball-dragon-gt-jump.mp3'
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
      //ctx.strokeRect(this.x + 40, this.y + 90, this.width - 85, this.height - 150)
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
        trex.audio.play()
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
      this.x + 40< obstacle.x + obstacle.width &&
      this.x + 40 + this.width -85 > obstacle.x &&
      this.y + 90 < obstacle.y +25 + obstacle.height -25 &&
      this.y + 90 +this.height -150 > obstacle.y +25
    )
  }
}

let trex = new Character(0, canvas.height - 200)
let trexWorld = new Background()

function startGame() {
  if (interval) return
  trexWorld.audio.play()
  interval = setInterval(update, 1000 / 15)
  }

function generarObstacles() {
    let img, rnd
    if (frames % 30 === 0) {
      //rnd = Math.floor(Math.random()*200) //* canvas.height
      if (Math.random() >= 0.9) imgSrc = "./img/obsta1.png"
      else imgSrc = "./img/obsta2.png"
      obstacles.push(new Obstacle(canvas.width + 300,400, imgSrc))
    }
    if (frames % 200 === 0) {
        if (Math.random() >= 0.5) img = imgs.premio1
        else img = imgs.premio2
        obstacles.push(new Obstacle(canvas.width + 300,200, img))
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
          score += 10
        obstacles.splice(i, 1)
        if (obstacle.img.src === imgs.premio1) score += 50
      }
      trex.isTouching(obstacle) ? gameOver() : null
    })
  
  }
  
  

  function gameOver() {
    clearInterval(interval)
    ctx.clearRect(0,0,canvas.width, canvas.height)
    trexWorld.draw2()
    ctx.font= "90px serif"
    ctx.fillStyle = "white"
    ctx.fillText("Game Over", 500, 350, 300)
    ctx.fillText(`score : ${score}`, 550,450,200)
    trexWorld.audio.pause()
    Obstacle.audio.play()
  }


function update() {
    frames++
    if ( trex.y < 230 ) { trex.y += 5 }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    trexWorld.draw()
    trex.draw()
    drawObstacles()
    ctx.fillText(String(score), canvas.width - 100, 100)
    checkCollitions()
    
  }
  document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 39:
        return trex.goRight()
  
      case 38:
       // this.vy = this.jumstrenght * 1.2
       if ( trex.y === 231 ) { 
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
  document.querySelector('button').onclick = () => {
    if (canvas.webkitRequestFullScreen) {
      canvas.webkitRequestFullScreen()
    } else {
      canvas.mozRequestFullScreen()
    }
  }