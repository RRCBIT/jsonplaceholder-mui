import TableCell from "@material-ui/core/TableCell";

export default function UserTableHead() {
  return (
    <>
      <TableCell>ID</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Username</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Phone number</TableCell>
      <TableCell>Action</TableCell>
    </>
  );
}
