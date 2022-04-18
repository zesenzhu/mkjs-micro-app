import React, { Component } from "react";
class App extends Component {
  constructor(props: any) {
    super(props);
    console.log("StringRef----constructor:", this.refs);
  }
  componentDidMount() {
    console.log("this.refs.XXX");
    console.log("StringRef----componentDidMount:", this.refs);
  }
  render() {
    return <h1 ref="h1Ref">1.String Ref</h1>;
  }
}
export default App;
