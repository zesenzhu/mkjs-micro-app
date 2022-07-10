interface StarProps {
  ctx: CanvasRenderingContext2D;
  x?: number;
  y?: number;
}
export interface StarInterface {
  x?: number;
  y?: number;
  draw: () => void;
  ctx: CanvasRenderingContext2D;
  canDraw: boolean;
  drawStar: () => void;
  targetX: number; //当前X方向要偏移的距离
  targetY: number; //当前Y方向要偏移的距离
  addSubX: number; //当前X方向增加还是减少
  addSubY: number; //当前Y方向增加还是减少
  step: number; //每次变化的单位
  key: number; //当前star的key
}

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 150;
type StarType = {
  x: number;
  y: number;
};
type StarKeyType = StarType & { connectStar: StarType[]; connected?: boolean };
//记录当前界面存活的点
const starList: Record<number, StarKeyType> = {};
let starKey = 0;
const distance = 90; //star之间的距离小于就连线

let a = 0;
export default class star implements StarInterface {
  x = 0;
  y = 0;
  width = CANVAS_WIDTH;
  height = CANVAS_HEIGHT;
  canDraw = false;
  ctx: CanvasRenderingContext2D;
  targetX = 0; //当前X方向要偏移的距离
  targetY = 0; //当前Y方向要偏移的距离
  step = 0.1; //每次变化的单位
  addSubX = 0; //当前X方向增加还是减少
  addSubY = 0; //当前Y方向增加还是减少
  key = starKey;
  constructor(props: StarProps) {
    const { ctx, x, y } = props;

    this.canDraw = true;
    this.ctx = ctx;
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
    this.x = x || Math.round(ctx.canvas.width * Math.random());
    this.y = y || Math.round(ctx.canvas.height * Math.random());
    starList[starKey++] = {
      x: this.x,
      y: this.y,
      connectStar: [],
    };
  }

  draw = () => {
    this.moveStar();
    this.drawStar();
  };

  drawStar = () => {
    const { ctx, x, y } = this;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  };
  moveStar = () => {
    let { height, width, step } = this;
    // const { connectStar} = starList[this.key]||{connectStar:[]}
    const connectStar: StarType[] = [];
    while (
      !this.targetX ||
      this.x + this.addSubX < -10 ||
      this.x + this.addSubX > width + 10
    ) {
      this.addSubX = Math.random() > 0.5 ? step : -step;
      this.targetX = Math.round(width * Math.random());
      this.targetX = this.addSubX < 0 ? this.targetX : -this.targetX;
    }
    while (
      !this.targetY ||
      this.y + this.addSubY < -10 ||
      this.y + this.addSubY > height + 10
    ) {
      this.addSubY = Math.random() > 0.5 ? step : -step;
      this.targetY = Math.round(height * Math.random());
      this.targetY = this.addSubY < 0 ? this.targetY : -this.targetY;
    }

    this.x += this.addSubX;
    this.y += this.addSubY;

    for (let key in starList) {
      const { x, y, connected } = starList[key];
      if (
        Math.abs(this.x - x) <= distance &&
        Math.abs(this.y - y) <= distance &&
        !connected
      ) {
        connectStar.push({ x, y });
      }
    }
    starList[this.key] = {
      x: this.x,
      y: this.y,
      connectStar,
    };
    this.targetX += this.addSubX;
    this.targetY += this.addSubY;
  };

  static connectStarLine = (ctx: CanvasRenderingContext2D) => {
    if (!a) {
      console.log(starList);
      a++;
    }
    for (let key in starList) {
      const { x, y, connectStar } = starList[key];
      connectStar.forEach((c) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();
        ctx.stroke();
      });
      starList[key].connected = true;
    }
  };
}
