import React, { Component } from "react";
class Com extends Component {
  a = 1;
  b = 2;
  render() {
    return <div />;
  }
}
class App extends Component {
  constructor(props: any) {
    super(props);
    console.log("CallBackRef---constructor:", this.h1Ref, this.ComRef);
  }
  h1Ref: any = null;
  ComRef: any = null;
  componentDidMount() {
    console.log("this.h1Ref");
    console.log("CallBackRef----componentDidMount:", this.h1Ref, this.ComRef);
  }
  render() {
    return (
      <h1 ref={(element) => (this.h1Ref = element)}>
        2.Callback Ref
        <Com ref={(element) => (this.ComRef = element)} />
      </h1>
    );
  }
}
export default App;
