import React, { useEffect, useRef } from "react";
// import { is } from 'immutable'
interface Props {
  son: string;
}
function Child(props: Props) {
  useEffect(() => {
    console.log("Child Component");
  });
  const count = useRef(0);
  count.current += 1;
  return (
    <div>
      这里是child子组件-memo：{" "}
      <p>
        {" "}
        {props.son}
        {count.current}{" "}
      </p>
    </div>
  );
}

export default Child;
