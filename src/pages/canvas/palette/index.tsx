import { Button, InputNumber } from "antd";
import React, { useEffect, useRef, useState } from "react";
import canvasUtils from "../../../utils/canvasUtils";
import drawLine from "./drawLine";
import "./index.css";
const { captureTouch, captureClick, getPixelRatio } = canvasUtils;
const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const moveRef = useRef<any>({});
  const ctxRef = useRef<CanvasRenderingContext2D | null>();

  const [drawType] = useState("line");
  const ratioRef = useRef(window.devicePixelRatio);
  const resize = (ctx: CanvasRenderingContext2D) => {
    if (canvasRef.current && ctx) {
      canvasRef.current.height =
        canvasRef.current?.clientHeight * ratioRef.current;
      canvasRef.current.width =
        canvasRef.current?.clientWidth * ratioRef.current;
      ctx.strokeStyle = "red";
      // ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
    }
  };
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = (ctxRef.current =
        canvasRef.current?.getContext("2d")) as CanvasRenderingContext2D;
      ratioRef.current = getPixelRatio(canvasRef.current as HTMLCanvasElement);

      resize(ctx);
      // captureTouch(canvasRef.current, moveEvent, ratioRef.current);
      // captureClick(canvasRef.current, moveEvent, ratioRef.current);
      window.addEventListener("resize", () => {
        resize(ctx);
      });
      // draw();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(ratioRef);
  useEffect(() => {
    let removeTouch = () => {};
    let removeClick = () => {};
    if (canvasRef.current) {
      removeTouch = captureTouch(
        canvasRef.current,
        moveEvent,
        ratioRef.current
      );
      removeClick = captureClick(
        canvasRef.current,
        moveEvent,
        ratioRef.current
      );
    }

    return () => {
      removeTouch && removeTouch();
      removeClick && removeClick();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawType]);
  const moveEvent = (type: string, event: any) => {
    moveRef.current = event;
    switch (type) {
      case "mouseup":
      case "touchend":
        ctxRef.current?.closePath();
        break;
      case "touchstart":
      case "mousedown":
        ctxRef.current?.beginPath();
        break;
      default:
    }
    if (drawType === "line") {
      ctxRef.current && drawLine(event, canvasRef.current as HTMLCanvasElement);
    }
  };

  const clearPalette = () => {
    ctxRef.current?.clearRect(
      0,
      0,
      canvasRef.current?.width as number,
      canvasRef.current?.height as number
    );
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Button className="handle" type="primary" onClick={clearPalette}>
        清屏
      </Button>
      <InputNumber
        addonBefore={"线条宽度"}
        min={1}
        max={50}
        onChange={(value: any) => {
          if (ctxRef.current) ctxRef.current.lineWidth = value;
        }}
        defaultValue={2}
      />
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
