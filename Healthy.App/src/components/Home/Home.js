import React from "react";
import { getType } from "../../api";
import RequireAuthentication from "../RequireAuthHOC";
import { Redirect } from "react-router-dom";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
    };
  }
  componentDidMount = () => {

    getType().then((data) => {
      if(!data) return;
      this.setState({ type: data})
      })
  };

  render() {
    const { type, useName } = this.state;

    return (
      <div>
        <Redirect to={`/${type}`} />
      </div>
    );
  }
}

export default RequireAuthentication(Home);
