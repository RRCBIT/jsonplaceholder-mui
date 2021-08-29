import { createStyles, makeStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

import { ITheme } from "theme";

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    authLayout: {
      height: "100vh",
      backgroundColor: grey[50]
    },
    title: {
      textAlign: "center",
      marginBottom: theme.spacing(4),
      fontWeight: 500,
      color: theme.palette.primary.main
    }
  })
);
