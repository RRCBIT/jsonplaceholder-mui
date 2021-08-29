import { createStyles, makeStyles } from "@material-ui/core/styles";

import { ITheme } from "theme";

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    filter: {
      marginBottom: theme.spacing(2.5)
    },
    form: {
      "& .MuiInputBase-root": {
        width: "13.25rem",
        marginRight: theme.spacing(1)
      },
      "& button": {
        marginRight: theme.spacing(1)
      }
    }
  })
);
