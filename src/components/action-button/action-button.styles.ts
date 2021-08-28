import { createStyles, makeStyles } from "@material-ui/core/styles";

import { ITheme } from "theme";

interface ActionButtonProps {
  actionType: "view" | "edit" | "delete";
}

export const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    actionButton: {
      color: ({ actionType }: ActionButtonProps) => {
        if (actionType === "edit") return theme.palette.primary.main;
        if (actionType === "view") return theme.palette.success.main;
        if (actionType === "delete") return theme.palette.danger.main;
      }
    }
  })
);
