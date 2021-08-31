import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MuiLink from "@material-ui/core/Link";

import { getUserDetail } from "store/users.slice";
import { getParams } from "store/router-params.slice";
import { IParams } from "types";
import { RootState } from "store";
import { Paper } from "components";

export default function UserDetail() {
  const { id } = useParams<IParams>();
  const dispatch = useDispatch();
  const { userDetail, loading } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (id) {
      dispatch(getParams(id));
      dispatch(getUserDetail(Number(id)));
    }
  }, [id, dispatch]);

  return (
    <Paper loading={loading} heading="User Information">
      <Grid container>
        <Grid item lg={6}>
          <Grid container spacing={2}>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Name</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="body1">{userDetail.name}</Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Username</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="body1">{userDetail.username}</Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Email</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="body1">{userDetail.email}</Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Phone</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="body1">{userDetail.phone}</Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Address</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="body1">
                {`${userDetail.address.suite}, ${userDetail.address.street}, ${userDetail.address.city}, ${userDetail.address.zipcode}`}
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Coordinate</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="body1">
                {`${userDetail.address.geo.lat}, ${userDetail.address.geo.lng}`}
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Website</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="body1">
                <MuiLink href={userDetail.website}>
                  {userDetail.website}
                </MuiLink>
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Company name</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="body1">{userDetail.company.name}</Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Company catchphrase</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="body1">
                {userDetail.company.catchPhrase}
              </Typography>
            </Grid>
            <Grid item lg={4}>
              <Typography variant="body1">
                <Box fontWeight={500}>Company BS</Box>
              </Typography>
            </Grid>
            <Grid item lg={8}>
              <Typography variant="body1">{userDetail.company.bs}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
