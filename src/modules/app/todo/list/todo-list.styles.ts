import { createStyles, makeStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import green from "@material-ui/core/colors/green";

import { ITheme } from "theme";

interface StatusChipProps {
  completed: boolean;
}

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    filterBlock: {
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

export const useStatusStyles = makeStyles((theme: ITheme) =>
  createStyles({
    statusColor: {
      color: ({ completed }: StatusChipProps) => {
        if (completed) {
          return theme.palette.success.main;
        }
        return grey[500];
      },
      borderColor: ({ completed }: StatusChipProps) => {
        if (completed) {
          return theme.palette.success.main;
        }
        return grey[500];
      },
      backgroundColor: ({ completed }: StatusChipProps) => {
        if (completed) {
          return green[50];
        }
        return grey[50];
      }
    }
  })
);
