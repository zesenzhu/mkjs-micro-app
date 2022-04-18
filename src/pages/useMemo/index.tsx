import React, { useState, memo, useRef, useEffect, useCallback } from "react";
// 在Hooks中获取上一次指定的props
const usePrevProps = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    console.log("value", value);
    ref.current = value;
  });
  console.log("ref.current", ref.current);
  return ref.current;
};
const AotherComponent = memo(function AotherComponent({ onClick }: any) {
  console.log("AotherComponent 组件渲染");
  return <button onClick={onClick}>AotherComponent - Inrement Count</button>;
});
export default function App() {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const handleCount = useCallback(() => setCount((count) => count + 1), []);
  const handleTotal = () => setTotal(total + 1);
  const prevHandleCount = usePrevProps(handleCount);

  console.log(
    "两次处理函数是否相等：",
    prevHandleCount,
    handleCount,
    prevHandleCount === handleCount
  );

  return (
    <div>
      <div>Count is {count}</div>
      <div>Total is {total}</div>
      <br />
      <div>
        <button onClick={handleCount}>Increment Count</button>
        <button onClick={handleTotal}>Increment Total</button>
      </div>
      <AotherComponent onClick={handleCount} />
    </div>
  );
}
