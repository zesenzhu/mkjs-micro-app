import React, { Component } from "react";

interface Props {
  son: string;
}
class Child extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  count = 0;
  render() {
    console.log("Child Component render");
    this.count += 2;
    return (
      <div>
        这里是child1子组件：{" "}
        <p>
          {" "}
          {this.props.son}
          {this.count}{" "}
        </p>
      </div>
    );
  }
}

export default Child;
