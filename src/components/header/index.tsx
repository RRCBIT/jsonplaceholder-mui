import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Breacrumb from "../breadcrumb";
import { useStyles } from "./header.styles";

export default function Header() {
  const { header, grid } = useStyles();

  function handleClickLogout() {
    // handle logout
  }

  return (
    <AppBar className={header} position="fixed" color="default">
      <Grid
        className={grid}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Breacrumb />
        <Button color="primary" onClick={handleClickLogout}>
          Logout
        </Button>
      </Grid>
    </AppBar>
  );
}
