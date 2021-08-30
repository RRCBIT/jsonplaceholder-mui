import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { getParams } from "store/router-params.slice";
import { getUserList } from "store/users.slice";
import { getCommentList } from "store/comments.slice";
import { IUser } from "types/user.model";
import { getPostDetail } from "store/posts.slices";
import { IParams } from "types/routes.model";
import { RootState } from "store";
import { Paper } from "components";
import { useStyles } from "./post-detail.styles";

export default function PostDetail() {
  const { id } = useParams<IParams>();
  const dispatch = useDispatch();
  const { userList } = useSelector((state: RootState) => state.users);
  const comments = useSelector((state: RootState) => state.comments);
  const { postDetail, loading } = useSelector(
    (state: RootState) => state.posts
  );
  const { block, commentBlock } = useStyles();

  useEffect(() => {
    dispatch(getUserList());
    dispatch(getCommentList(postDetail.id));
  }, [dispatch, postDetail.id]);
  useEffect(() => {
    if (id) {
      dispatch(getParams(id));
      dispatch(getPostDetail(Number(id)));
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
    <>
      <Paper className={block} loading={loading} heading="Post Information">
        <Grid container>
          <Grid item lg={6}>
            <Grid container spacing={2}>
              <Grid item lg={4}>
                <Typography variant="body1">
                  <Box fontWeight={500}>Title</Box>
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Typography variant="body1">{postDetail.title}</Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="body1">
                  <Box fontWeight={500}>Body</Box>
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Typography variant="body1">{postDetail.body}</Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="body1">
                  <Box fontWeight={500}>Created by</Box>
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Link to={`/app/user/detail/${postDetail.userId}`}>
                  <Typography variant="body1">
                    {getUserName(postDetail.userId)}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper loading={comments.loading} heading="Comments">
        <Grid container>
          {comments.commentList.map((comment) => (
            <Grid className={commentBlock} key={comment.id}>
              <Typography variant="body1">{comment.name}</Typography>
              <Typography variant="body1">By {comment.email}</Typography>
              <Typography variant="body1">{comment.body}</Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
}
