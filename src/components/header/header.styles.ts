import { createStyles, makeStyles } from "@material-ui/core/styles";

import { ITheme } from "theme";

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    header: {
      width: "calc(100% - 15rem)",
      backgroundColor: "#fff",
      height: "5rem",
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2)
    },
    grid: {
      height: "100%"
    }
  })
);
