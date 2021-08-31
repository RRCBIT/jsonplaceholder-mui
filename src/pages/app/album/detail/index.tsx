import { GoBack } from "components";
import { Detail } from "modules/app/album";
import { PATH_ALBUM } from "routes/routes.paths";

export default function PostDetail() {
  return (
    <>
      <GoBack to={PATH_ALBUM} />
      <Detail />
    </>
  );
}
