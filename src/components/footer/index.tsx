import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./footer.styles";

export default function Footer() {
  const { footer } = useStyles();
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer className={footer}>
      <Grid container alignItems="center">
        <Typography variant="body1">
          &copy; Copyrighted by Loc Bui {currentYear}
        </Typography>
      </Grid>
    </footer>
  );
}
