import Chip from "@material-ui/core/Chip";

import { useStatusStyles } from "./todo-list.styles";

interface StatusChipProps {
  completed: boolean;
}

export default function StatusChip({ completed }: StatusChipProps) {
  const { statusColor } = useStatusStyles({ completed });
  const status = completed ? "DONE" : "PENDING";
  return <Chip className={statusColor} label={status} variant="outlined" />;
}
