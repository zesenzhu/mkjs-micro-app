import { useState } from 'react'
import './index.scss'
export default function App() {
  const [data] = useState(new Array(5).fill(1).map((c, i) => i))
  // useEffect(() => {
  //   let time = data.length;
  //   const timer = setInterval(() => {
  //     ++time;
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     useData((pre) => {
  //       const a = [...pre];
  //       a.shift();
  //       a.push(time);
  //       return a;
  //     });
  //   }, 2000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  return (
    <div className="circle">
      {data.map((c, i) => {
        return (
          <div
            className={`child child_${c} ${
              i === 0 ? 'main animate' : 'other animate2'
            } `}
            style={{ left: `translateX(${80 * i}%)` }}
            key={c}
          >
            {c}
          </div>
        )
      })}
    </div>
  )
}
