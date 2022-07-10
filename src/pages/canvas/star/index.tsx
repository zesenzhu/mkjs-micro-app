import React, { useEffect, useRef } from "react";
import Star, { StarInterface } from "./star";
import utils from "utils/canvasUtils";

let animatedFrame: null | number = null;
const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log(utils);
  const ctxRef = useRef<CanvasRenderingContext2D | null>();
  const resize = () => {
    const ctx = ctxRef.current as CanvasRenderingContext2D;

    if (animatedFrame) {
      ctx?.clearRect(
        0,
        0,
        canvasRef.current?.width as number,
        canvasRef.current?.height as number
      );
      window.cancelAnimationFrame(animatedFrame);
    }
    if (canvasRef.current) {
      canvasRef.current.height =
        canvasRef.current?.clientHeight * window.devicePixelRatio;
      canvasRef.current.width =
        canvasRef.current?.clientWidth * window.devicePixelRatio;
      ctx.strokeStyle = "red";
      ctx.fillStyle = "red";
      ctx.lineWidth = 0.2;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      let list = [];
      for (let i = 0; i < 200; i++) {
        const star = new Star({ ctx });
        list.push(star);
      }
      console.log(animatedFrame, canvasRef.current, canvasRef.current?.width);

      draw(list);
    }
  };
  const draw = (list: StarInterface[]) => {
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
    animatedFrame = window.requestAnimationFrame(draw.bind(this, list));
  };
  useEffect(() => {
    if (canvasRef.current) {
      (ctxRef.current =
        canvasRef.current.getContext("2d")) as CanvasRenderingContext2D;

      resize();

      window.addEventListener("resize", () => {
        resize();
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
