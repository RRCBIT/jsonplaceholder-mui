import Grid from "@material-ui/core/Grid";
import { Switch, Route } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import { authRoutes } from "routes/routes.routes";
import { useStyles } from "./auth.layout.styles";

export default function AuthLayout() {
  const { authLayout, title } = useStyles();

  const renderRoutes = (routes: typeof authRoutes) =>
    routes.map((route) => (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ));
  return (
    <Grid
      className={authLayout}
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item lg={4}>
        <Typography variant="h4" className={title}>
          JSONPLACEHOLDER
        </Typography>
        <Switch>
          <Switch>{renderRoutes(authRoutes)}</Switch>
        </Switch>
      </Grid>
    </Grid>
  );
}
