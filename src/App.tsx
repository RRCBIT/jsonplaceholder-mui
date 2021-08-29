import { ReactElement } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";

import { AppLayout, AuthLayout } from "layout";
import { theme } from "theme";
import withAuthentication from "hocs/withAuthentication";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact={true}
              path="/"
              render={(): ReactElement => <Redirect to="/app/dashboard" />}
            />
            <Route
              exact={true}
              path="/app"
              render={(): ReactElement => <Redirect to="/app/dashboard" />}
            />
            <Route
              exact={true}
              path="/auth"
              render={(): ReactElement => <Redirect to="/auth/login" />}
            />
            <Route exact={false} path="/auth" component={AuthLayout} />
            <Route
              exact={false}
              path="/app"
              component={withAuthentication(AppLayout)}
            />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
