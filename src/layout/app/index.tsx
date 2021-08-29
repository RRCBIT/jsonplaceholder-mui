import Grid from "@material-ui/core/Grid";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

import { Header, Sidebar, Footer } from "components";
import { appRoutes } from "routes/routes.routes";
import { useStyles } from "./app.layout.styles";

function AppLayout() {
  const { right, content } = useStyles();

  const renderRoutes = (routes: typeof appRoutes) =>
    routes.map((route) => (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ));

  return (
    <Grid container>
      <Sidebar />
      <Grid className={right}>
        <Header />
        <Grid container direction="column">
          <Grid className={content}>
            <Switch>{renderRoutes(appRoutes)}</Switch>
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withRouter(AppLayout);
