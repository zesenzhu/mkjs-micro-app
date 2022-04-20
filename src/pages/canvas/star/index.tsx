import React, { useEffect, useRef } from "react";
import Star, { StarInterface } from "./star";
let animatedFrame: null | number = null;
const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ctxRef = useRef<CanvasRenderingContext2D | null>();
  const resize = (ctx: CanvasRenderingContext2D) => {
    if (animatedFrame) {
      window.cancelAnimationFrame(animatedFrame);
    }
    if (canvasRef.current) {
      canvasRef.current.height =
        canvasRef.current?.clientHeight / window.devicePixelRatio;
      canvasRef.current.width =
        canvasRef.current?.clientWidth / window.devicePixelRatio;
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      ctx.lineWidth = 0.1;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      let list = [];
      for (let i = 0; i < 200; i++) {
        const star = new Star({ ctx });
        list.push(star);
      }
      console.log(canvasRef.current, canvasRef.current?.clientHeight);

      animatedFrame = draw(list);
    }
  };
  const draw = (list: StarInterface[]): number => {
    ctxRef?.current?.clearRect(
      0,
      0,
      canvasRef.current?.width as number,
      canvasRef.current?.height as number
    );
    list.forEach((c) => {
      c.draw();
    });

    Star.connectStarLine(ctxRef.current as CanvasRenderingContext2D);
    return window.requestAnimationFrame(draw.bind(this, list));
  };
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = (ctxRef.current =
        canvasRef.current.getContext("2d")) as CanvasRenderingContext2D;

      resize(ctx);

      window.addEventListener("resize", () => {
        resize(ctx);
      });
      // draw();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{
          marginTop: 10,
          border: "1px #000 solid",
          height: "100%",
          width: "100%",
        }}
      ></canvas>
    </div>
  );
};
export default Canvas;
