import React from "react";

const Button = ({
  onClickButton,
  children,
}: {
  onClickButton: any;
  children: any;
}) => {
  return (
    <>
      <button onClick={onClickButton}>{children}</button>
      <span>{Math.random()}</span>
    </>
  );
};

export default React.memo(Button);
