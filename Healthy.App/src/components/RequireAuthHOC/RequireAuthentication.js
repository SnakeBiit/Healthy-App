import React from "react";
import { Redirect } from "react-router-dom";
import Login from "../Login";

export function RequireAuthentication(Component) {
  return class AuthenticatedComponent extends React.Component {
    render() {
      const { isAuthenticated } = this.props;
      const redirect = (
        <div>
          <Login></Login>
          <Redirect to="/" />
        </div>
      );
      return (
        <React.Fragment>
          {isAuthenticated ? <Component {...this.props} /> : redirect}
        </React.Fragment>
      );
    }
  };
}

export default RequireAuthentication;
