import { useEffect, useCallback, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

import { RootState } from "store";
import { getUserList } from "store/users.slice";
import { getTodoList, deleteTodo, updateTodo } from "store/todos.slice";
import { Paper, Table, ActionButton, DeleteModal } from "components";
import { IUser, ITodo } from "types";
import { useStyles } from "./todo-list.styles";
import TodoTableHead from "./todo.table-head";
import StatusChip from "./status-chip";
import EditModal from "../edit";

interface IFilter {
  userId: number | null;
  status: boolean | undefined;
}

export default function TodoList() {
  const [isOpen, setIsOpen] = useState({
    delete: false,
    edit: false
  });
  const [filter, setFilter] = useState<IFilter>({
    userId: null,
    status: undefined
  });
  const [selectedTodo, setSelectedTodo] = useState<ITodo>({
    id: 0,
    userId: 0,
    title: "",
    completed: false
  });
  const { filterBlock, form } = useStyles();
  const dispatch = useDispatch();
  const { userList } = useSelector((state: RootState) => state.users);
  const { todoList, loading } = useSelector((state: RootState) => state.todos);

  const getData = useCallback(() => {
    dispatch(getUserList());
    dispatch(getTodoList({ userId: filter.userId, status: filter.status }));
  }, [dispatch, filter.userId, filter.status]);

  useEffect(() => {
    getData();
  }, [getData]);

  function handleChangeUserId(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setFilter({ ...filter, userId: Number(event.target.value) });
  }
  function handleChangeStatus(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setFilter({ ...filter, status: event.target.value === "done" });
  }
  function handleClearFilter() {
    setFilter({
      userId: null,
      status: undefined
    });
  }
  function handleClickCancelDelete() {
    setIsOpen({ ...isOpen, delete: false });
  }
  function handleClickConfirmDelete() {
    dispatch(deleteTodo(selectedTodo.id));
    setIsOpen({ ...isOpen, delete: false });
  }
  function handleClickCancelEdit() {
    setIsOpen({ ...isOpen, edit: false });
  }
  function handleClickConfirmEdit(values: any) {
    setIsOpen({ ...isOpen, edit: false });
    dispatch(updateTodo({ id: values.id, body: values }));
  }
  function handleClickDelete(item: ITodo) {
    setSelectedTodo(item);
    setIsOpen({ ...isOpen, delete: true });
  }
  function handleClickEdit(item: ITodo) {
    setSelectedTodo(item);
    setIsOpen({ ...isOpen, edit: true });
  }
  function getUserName(id: number) {
    const user = userList.find((item) => item.id === id);
    if (user) {
      return user.name;
    }
    return "";
  }
  function renderRows(item: ITodo) {
    return (
      <TableRow key={item.id}>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.title}</TableCell>
        <TableCell>
          <Link to={`/app/user/detail/${item.userId}`}>
            {getUserName(item.userId)}
          </Link>
        </TableCell>
        <TableCell>
          <StatusChip completed={item.completed} />
        </TableCell>
        <TableCell>
          <ActionButton
            actionType="edit"
            onClick={() => handleClickEdit(item)}
          />
          <ActionButton
            actionType="delete"
            onClick={() => handleClickDelete(item)}
          />
        </TableCell>
      </TableRow>
    );
  }
  function getStatus(status: boolean | undefined) {
    if (status === undefined) return "";
    if (status === true) return "done";
    if (status === false) return "pending";
  }

  return (
    <>
      <Paper className={filterBlock}>
        <Grid container justifyContent="flex-start">
          <form className={form}>
            <TextField
              select
              size="small"
              variant="outlined"
              label="User"
              InputLabelProps={{ shrink: true }}
              value={filter.userId}
              onChange={handleChangeUserId}
            >
              {userList.map((user: IUser) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              variant="outlined"
              label="Status"
              InputLabelProps={{ shrink: true }}
              value={getStatus(filter.status)}
              onChange={handleChangeStatus}
            >
              <MenuItem value="done">Done</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="default"
              disableElevation
              onClick={handleClearFilter}
            >
              Clear
            </Button>
          </form>
        </Grid>
      </Paper>
      <Table
        loading={loading}
        head={<TodoTableHead />}
        colSpan={5}
        data={todoList}
        renderRows={renderRows}
      />
      <DeleteModal
        open={isOpen.delete}
        item="todo"
        onClose={handleClickCancelDelete}
        onConfirm={handleClickConfirmDelete}
      />
      <EditModal
        open={isOpen.edit}
        todo={selectedTodo}
        item="todo"
        onClose={handleClickCancelEdit}
        onConfirm={handleClickConfirmEdit}
      />
    </>
  );
}
