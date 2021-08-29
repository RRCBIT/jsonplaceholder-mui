import { createStyles, makeStyles } from "@material-ui/core/styles";

import { ITheme } from "theme";

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    },
    title: {
      marginBottom: theme.spacing(2.5)
    }
  })
);
