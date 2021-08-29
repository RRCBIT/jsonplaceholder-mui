import { GoBack } from "components";
import { PATH_USER } from "routes/routes.paths";

import { Form } from "modules/app/user";

export default function UserCreate() {
  return (
    <>
      <GoBack to={PATH_USER} />
      <Form mode="create" />
    </>
  );
}
