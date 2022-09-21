import { atom, useAtom } from "jotai";
import { Button } from "antd";

// 原始Atom
const countAtom = atom(0);
// 派生Atom
const doubleCountAtom = atom((get) => get(countAtom) * 2);
// 仅有更新函数的Atom
const increaseTenAtom = atom(null, (get, set, _arg) =>
  set(countAtom, get(countAtom) + 10)
);

const Counter = () => {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      <p>count:{count}</p>
      <Button onClick={() => setCount((c) => c + 1)}>+1</Button>
    </div>
  );
};
const DoubleText = () => {
  const [doubleCount] = useAtom(doubleCountAtom);
  const [, increase] = useAtom(increaseTenAtom);
  return (
    <div>
      <p>count:{doubleCount}</p>
      <Button onClick={() => increase?.()}>+10</Button>
    </div>
  );
};

const App = () => {
  return (
    <>
      Time:{Date.now()}
      <DoubleText />
      <Counter />
    </>
  );
};
export default App;
