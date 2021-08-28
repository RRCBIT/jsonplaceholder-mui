import { createStyles, makeStyles } from "@material-ui/core/styles";

import { ITheme } from "theme";

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    right: {
      marginLeft: "15rem",
      minHeight: "100vh",
      width: "calc(100% - 15rem)"
    },
    content: {
      marginTop: "5rem",
      minHeight: "calc(100vh - 5rem)",
      padding: theme.spacing(2.5)
    }
  })
);
