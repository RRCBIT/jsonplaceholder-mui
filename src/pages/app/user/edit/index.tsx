import { GoBack } from "components";
import { PATH_USER } from "routes/routes.paths";

import { Form } from "modules/app/user";

export default function UserEdit() {
  return (
    <>
      <GoBack to={PATH_USER} />
      <Form mode="edit" />
    </>
  );
}
