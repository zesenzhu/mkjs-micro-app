type PreXYType = {
  x: number;
  y: number;
  end?: boolean;
};
const preXY: PreXYType = { x: -1, y: -1 };
const pointList: PreXYType[] = [];
const drawLine = (event: any, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const { x, y, isPressed } = event;
  // console.log(event)
  if (x === null || y === null || !isPressed) {
    preXY.x = -1;
    preXY.y = -1;
    return;
  }
  // console.log(x, y)

  pointList.push({
    x,
    y,
  });

  const draw = (ctx: CanvasRenderingContext2D) => {
    // if (headDrive < 30) {
    //     headDrive++
    //     window.requestAnimationFrame(draw.bind(this, ctx))

    //     return
    // }
    // headDrive = 0
    if (pointList.length <= 0) {
      return;
    }
    const [{ x, y }] = pointList.splice(0, 1);
    // ctx.save();
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (preXY.x === -1 && preXY.y === -1) {
      const radius = ctx.lineWidth / 2;
      const fillStyle = ctx.fillStyle;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = fillStyle;
    } else {
      ctx.beginPath();

      ctx.moveTo(preXY.x, preXY.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.closePath();
    }

    preXY.x = x;
    preXY.y = y;

    // ctx.restore();
    // window.requestAnimationFrame(draw.bind(this, ctx))
  };
  draw(ctx);
};

export default drawLine;
