import Button, { ButtonProps } from "@material-ui/core/Button";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

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
    if (actionType === "view")
      return <VisibilityOutlinedIcon fontSize="small" />;
    if (actionType === "edit") return <EditOutlinedIcon fontSize="small" />;
    if (actionType === "delete") return <DeleteOutlinedIcon fontSize="small" />;
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
