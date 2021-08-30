import Button, { ButtonProps } from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { useStyles } from "./action-button.styles";

interface ActionButtonProps extends ButtonProps {
  actionType: "view" | "edit" | "delete";
}

export default function ActionButton({
  actionType,
  ...props
}: ActionButtonProps) {
  const { actionButton } = useStyles({ actionType });

  function renderActionIcon() {
    if (actionType === "view") return <VisibilityIcon />;
    if (actionType === "edit") return <EditIcon />;
    if (actionType === "delete") return <DeleteIcon />;
  }

  return (
    <Button
      variant="outlined"
      disableElevation
      color="default"
      className={actionButton}
      {...props}
    >
      {renderActionIcon()}
    </Button>
  );
}
