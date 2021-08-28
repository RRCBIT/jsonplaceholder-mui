import { GoBack } from "components";
import { PATH_USER } from "routes/routes.paths";

export default function UserCreate() {
  return (
    <>
      <GoBack to={PATH_USER} />
      <h1>create user</h1>
    </>
  );
}
