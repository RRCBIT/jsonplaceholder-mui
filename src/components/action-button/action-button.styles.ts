import { createStyles, makeStyles } from "@material-ui/core/styles";

import { ITheme } from "theme";

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    actionButton: {
      marginRight: theme.spacing(1),
      padding: "7px 16px"
    }
  })
);
