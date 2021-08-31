import { createStyles, makeStyles } from "@material-ui/core/styles";

import { ITheme } from "theme";

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    block: {
      marginBottom: theme.spacing(2.5)
    },
    info: {
      marginBottom: theme.spacing(2.5)
    },
    carousel: {
      display: "flex",
      justifyContent: "center",
      minHeight: 600
    }
  })
);
