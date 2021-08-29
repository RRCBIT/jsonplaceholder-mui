import { GoBack } from "components";
import { Detail } from "modules/app/post";
import { PATH_POST } from "routes/routes.paths";

export default function PostDetail() {
  return (
    <>
      <GoBack to={PATH_POST} />
      <Detail />
    </>
  );
}
