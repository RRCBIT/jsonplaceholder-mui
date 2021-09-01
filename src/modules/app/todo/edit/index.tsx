import { useState, useMemo, ChangeEvent } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useFormik } from "formik";

import { ITodo } from "types";
import { useStyles } from "./edit-todo.styles";

interface EditModalProps {
  todo: ITodo;
  open: boolean;
  item: string;
  onClose: () => void;
  onConfirm: (values: ITodo) => void;
}

export default function EditModal({
  todo,
  open,
  item,
  onClose,
  onConfirm
}: EditModalProps) {
  const { titleInput, switchLabel } = useStyles();
  const [completed, setCompleted] = useState<boolean>(false);

  const initialValues = useMemo(() => {
    setCompleted(todo.completed);
    return {
      title: todo.title
    };
  }, [todo.title]);

  function handleSubmit(values: any) {
    const senData = {
      id: todo.id,
      title: values.title,
      userId: todo.userId,
      completed
    };
    onConfirm(senData);
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit
  });

  function handleChangeCompleted(event: ChangeEvent<HTMLInputElement>) {
    setCompleted(event.target.checked);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle id="alert-dialog-title">{`Edit ${item}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              fullWidth
              className={titleInput}
              label="Title *"
              name="title"
              size="small"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              className={switchLabel}
              control={
                <Switch
                  checked={completed}
                  name="status"
                  color="primary"
                  onChange={handleChangeCompleted}
                />
              }
              label="Status"
              labelPlacement="start"
            />
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
            type="submit"
            variant="contained"
            disableElevation
            color="primary"
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
