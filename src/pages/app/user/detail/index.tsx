import { GoBack } from "components";
import { PATH_USER } from "routes/routes.paths";

export default function UserDetail() {
  return (
    <>
      <GoBack to={PATH_USER} />
      <h1>detail user</h1>
    </>
  );
}
