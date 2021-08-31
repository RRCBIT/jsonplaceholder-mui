import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface DeleteModalProps {
  open: boolean;
  item: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  open,
  item,
  onClose,
  onConfirm
}: DeleteModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {`Delete this ${item}?`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Are you sure you want to delete this ${item}? This action cannot be undone`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disableElevation
          color="default"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={onConfirm}
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
