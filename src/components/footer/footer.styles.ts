import { createStyles, makeStyles } from "@material-ui/core/styles";

import { ITheme } from "theme";

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    footer: {
      height: "4rem",
      "& div": {
        height: "100%",
        padding: theme.spacing(2)
      }
    }
  })
);
