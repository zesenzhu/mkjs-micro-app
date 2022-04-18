import React, { Component } from "react";
import StringRef from "./StringRef";
import CallbackRef from "./CallbackRef";
import CreateRef from "./CreateRef";
class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <StringRef />
        <CallbackRef />
        <CreateRef />
      </div>
    );
  }
}
export default App;
