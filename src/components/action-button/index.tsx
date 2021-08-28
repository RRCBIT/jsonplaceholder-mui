import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { useStyles } from "./action-button.styles";

interface ActionButtonProps extends IconButtonProps {
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
    <IconButton className={actionButton} {...props}>
      {renderActionIcon()}
    </IconButton>
  );
}
