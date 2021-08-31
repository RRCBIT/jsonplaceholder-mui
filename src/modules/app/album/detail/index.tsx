import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Carousel from "react-material-ui-carousel";

import { getParams } from "store/router-params.slice";
import { getUserList } from "store/users.slice";
import { getCommentList } from "store/comments.slice";
import { IUser, IParams } from "types";
import { getAlbumDetail, getPhotosByAlbum } from "store/albums.slice";
import { RootState } from "store";
import { Paper } from "components";
import { useStyles } from "./album-detail.styles";

export default function AlbumDetail() {
  const { id } = useParams<IParams>();
  const dispatch = useDispatch();
  const { userList } = useSelector((state: RootState) => state.users);
  const { albumDetail, loading, photosByAlbum } = useSelector(
    (state: RootState) => state.albums
  );
  const { block, carousel, info } = useStyles();

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getCommentList(albumDetail.id));
    dispatch(getPhotosByAlbum(albumDetail.id));
  }, [dispatch, albumDetail.id]);
  useEffect(() => {
    if (id) {
      dispatch(getParams(id));
      dispatch(getAlbumDetail(Number(id)));
    }
  }, [id, dispatch]);

  function getUserName(userId: number) {
    const user = userList.find((item: IUser) => item.id === userId);
    if (user) {
      return user.name;
    }
    return "";
  }

  return (
    <Paper className={block} loading={loading} heading="Album Information">
      <Grid container direction="column">
        <Grid className={info} item lg={6}>
          <Grid container spacing={2}>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Title</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="body1">{albumDetail.title}</Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Created by</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Link to={`/app/user/detail/${albumDetail.userId}`}>
                <Typography variant="body1">
                  {getUserName(albumDetail.userId)}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6}>
          <Typography variant="body1">
            <Box fontWeight={500}>Photos</Box>
          </Typography>
          <Carousel
            className={carousel}
            animation="slide"
            navButtonsAlwaysVisible
            indicators={false}
          >
            {photosByAlbum.map((photo) => (
              <img key={photo.id} src={photo.url} alt="pic" />
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Paper>
  );
}
