import { GoBack } from "components";
import { PATH_USER } from "routes/routes.paths";

import { Detail } from "modules/app/user";

export default function UserDetail() {
  return (
    <>
      <GoBack to={PATH_USER} />
      <Detail />
    </>
  );
}
