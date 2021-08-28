import { GoBack } from "components";
import { PATH_USER } from "routes/routes.paths";

export default function UserEdit() {
  return (
    <>
      <GoBack to={PATH_USER} />
      <h1>edit user</h1>
    </>
  );
}
