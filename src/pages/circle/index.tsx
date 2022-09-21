import React, { useState, useEffect, useMemo } from "react";
import "./index.scss";
export default function App() {
  const [data, useData] = useState(new Array(5).fill(1).map((c, i) => i + 1));
  useEffect(() => {
    let time = data.length;
    const timer = setInterval(() => {
      ++time;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useData((pre) => {
        const a = [...pre];
        a.shift();
        a.push(time);
        return a;
      });
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="circle">
      {data.map((c, i) => {
        return (
          <div
            className={`child ${i === 0 ? "main animate" : "other animate2"} `}
            style={
              i === 0 ? {} : { transform: `translateY(${100 * (i - 1)}%)` }
            }
            key={c}
          >
            {c}
          </div>
        );
      })}
    </div>
  );
}
