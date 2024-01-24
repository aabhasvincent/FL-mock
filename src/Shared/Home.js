import React from "react";
class Home extends React.Component {
  constructor(props) {
    super(props);

    let app;
    if (__isBrowser__) {
      app = window.__INITIAL_DATA__;
      delete window.__INITIAL_DATA__;
    } else {
      app = this.props.staticContext.data;
    }

    this.state = {
      app,
    };

  }
  render() {
    const { app } = this.state;
    return <span>Select a Language</span>;
  }
}
export default Home;