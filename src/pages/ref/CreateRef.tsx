import React, { Component, createRef } from "react";
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
    this.h1Ref = createRef();
    console.log("CreateRef---constructor:", this.h1Ref, this.ComRef);
  }
  h1Ref: any = null;
  ComRef: any = null;
  componentDidMount() {
    console.log("CreateRef----componentDidMount:", this.h1Ref, this.ComRef);
  }
  render() {
    return (
      <h1 ref={this.h1Ref}>
        2.CreateRef
        <Com ref={(element) => (this.ComRef = element)} />
      </h1>
    );
  }
}
export default App;
