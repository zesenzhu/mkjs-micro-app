import React, { useState, useContext, createContext } from "react";
import { Button } from "antd";
import Atom from "./atom";
import "./index.scss";
const context = createContext<any>({});

const CounterA = () => {
  const [value, setValue] = useContext(context);
  return (
    <div>
      <div>
        A: {value.a};<span> Time: {Date.now()}</span>
      </div>
      <Button
        onClick={() => setValue((prev: any) => ({ ...prev, a: prev.a + 1 }))}
      >
        A+1
      </Button>
    </div>
  );
};

const CounterB = () => {
  const [value, setValue] = useContext(context);
  return (
    <div>
      <div>
        B: {value.b};<span> Time: {Date.now()}</span>
      </div>
      <Button
        onClick={() => setValue((prev: any) => ({ ...prev, b: prev.b + 1 }))}
      >
        B+1
      </Button>
    </div>
  );
};

const TimeC = () => {
  return <div>TimeC: {Date.now()}</div>;
};

const initValue = {
  a: 0,
  b: 1,
};

const Provider: React.FC<Omit<React.ProviderProps<any>, string>> = ({
  children,
}) => {
  const [value, setValue] = useState(initValue);
  return (
    <context.Provider value={[value, setValue]}>{children}</context.Provider>
  );
};

export default function App() {
  return (
    <Provider>
      <div className="Jotai">
        <div>
          {" "}
          <CounterA />
          <CounterB />
          <TimeC />
        </div>
        <div>
          <p>atom使用</p>
          <Atom />
        </div>
      </div>
    </Provider>
  );
}
