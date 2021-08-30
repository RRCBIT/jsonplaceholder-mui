import { createStyles, makeStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

import { ITheme } from "theme";

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    block: {
      marginBottom: theme.spacing(2.5)
    },
    commentBlock: {
      width: "100%",
      paddingBottom: theme.spacing(2.5),
      borderBottom: `1px solid ${grey[200]}`,
      "&:not(:first-child)": {
        paddingTop: theme.spacing(2.5)
      }
    }
  })
);
