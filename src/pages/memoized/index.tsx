import React, { Component } from "react";
import Child from "./Child";
import Child1 from "./Child1";
import Child2 from "./Child2";
import Child4 from "./child4";
interface Props {}
interface State {
  parentInfo: string;
  sonInfo: string;
}
class Parent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      parentInfo: "parent",
      sonInfo: "son",
    };
    this.changeParentInfo = this.changeParentInfo.bind(this);
  }

  changeParentInfo() {
    this.setState({
      parentInfo: `改变了父组件state：${Date.now()}`,
    });
  }

  render() {
    console.log("Parent Component render");
    return (
      <div>
        <p>{this.state.parentInfo}</p>
        <button onClick={this.changeParentInfo}>改变父组件state</button>
        <br />
        <Child son={this.state.sonInfo}></Child>
        <Child1 son={this.state.sonInfo}></Child1>
        <Child2 son={this.state.sonInfo}></Child2>
        <Child4 son={this.state.sonInfo}></Child4>
      </div>
    );
  }
}

export default Parent;
