import React, { ComponentType, FC } from "react";
import { Redirect } from "react-router-dom";

import { TOKEN_NAME } from "constants/configs";

const withAuthentication =
  <P extends any>(Component: ComponentType<P>): FC<P> =>
  (props) => {
    const isAuthenticated = localStorage.getItem(TOKEN_NAME) as any;
    if (isAuthenticated) {
      return <Component {...props} />;
    }
    return (
      <Redirect
        to={{
          pathname: "/auth/login"
        }}
      />
    );
  };

export default withAuthentication;
