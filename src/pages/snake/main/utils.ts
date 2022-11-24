// type DirectionType = 'left' | 'Right' | 'up' | 'down'
import { DirectionType } from '../types'
interface InitParams {
  initX?: number
  initY?: number
  speed?: number
  direction?: DirectionType
  unit?: number
}
export class Snake {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  initX: number
  initY: number
  direction: DirectionType = 'Right'
  speed: number = 0
  active: boolean = false
  animateFrame: number | null = null
  xDir: number = 1
  yDir: number = 0
  unit: number = 6
  times: number = 0

  canvasDom: HTMLCanvasElement
  constructor(
    canvasDom: HTMLCanvasElement,
    { initX, initY, speed, direction = 'Right', unit = 10 }: InitParams
  ) {
    this.canvasDom = canvasDom
    canvasDom.height = canvasDom?.clientHeight * window.devicePixelRatio
    canvasDom.width = canvasDom?.clientWidth * window.devicePixelRatio
    this.ctx = canvasDom.getContext('2d') as CanvasRenderingContext2D
    this.unit = unit
    this.x = this.initX = initX || unit || 0 / 2
    this.y = this.initY = initY || unit || 0 / 2
    this.changeSpeed(speed || 2)
    this.changeDirection(direction)
  }

  changeDirection(direction: DirectionType) {
    if (direction === this.direction) return
    const dir = direction
    this.direction = direction
    if (dir === 'Down') {
      this.yDir = 1
      this.xDir = 0
    } else if (dir === 'Up') {
      this.yDir = -1
      this.xDir = 0
    } else if (dir === 'Left') {
      this.yDir = 0
      this.xDir = -1
    } else if (dir === 'Right') {
      this.yDir = 0
      this.xDir = 1
    }
  }
  initSnakeStyle() {
    const { ctx } = this

    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'red'
    ctx.lineWidth = 0.2
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
  }
  changeSpeed(speed: number) {
    this.speed = 60 / speed
  }
  drawSnake() {
    const { ctx, x, y } = this
    const half = this.unit / 2
    ctx.beginPath()
    ctx.rect(x - half, y - half, this.unit, this.unit)
    ctx.closePath()
    ctx.fill()
  }

  move() {
    if (this.speed > this.times) {
      this.times++
      return
    }

    this.times = 0
    this.x += this.xDir * this.unit
    this.y += this.yDir * this.unit
    if (this.x <= 0 || this.x >= this.canvasDom.width - this.unit) {
      this.x = this.initX
    }
    if (this.y <= 0 || this.y >= this.canvasDom.height - this.unit) {
      this.y = this.initY
    }
  }
  start() {
    this.active = true
    this.animateFrame = window.requestAnimationFrame(this.draw.bind(this))
  }
  stop() {
    this.active = false
    this.animateFrame && cancelAnimationFrame(this.animateFrame)
  }
  draw() {
    this.ctx?.clearRect(
      0,
      0,
      this.canvasDom?.width as number,
      this.canvasDom?.height as number
    )
    this.move()
    this.drawSnake()

    this.animateFrame = window.requestAnimationFrame(this.draw.bind(this))
  }
}
