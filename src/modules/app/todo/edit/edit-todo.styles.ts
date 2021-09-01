import { createStyles, makeStyles } from "@material-ui/core/styles";

import { ITheme } from "theme";

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    titleInput: {
      marginBottom: theme.spacing(2)
    },
    switchLabel: {
      margin: 0
    }
  })
);
