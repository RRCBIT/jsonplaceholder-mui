import { useMemo, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

import { PATH_USER } from "routes/routes.paths";
import { getParams } from "store/router-params.slice";
import { addNewUser, addUpdatedUser, getUserDetail } from "store/users.slice";
import { RootState } from "store";
import { Paper } from "components";
import { IParams } from "types";
import { createUser, updateUser } from "services/users.services";
import { userSchema } from "./user-form.schema";

interface UserFormProps {
  mode: "create" | "edit";
}

export default function UserForm({ mode }: UserFormProps) {
  const dispatch = useDispatch();
  const { userDetail, loading } = useSelector(
    (state: RootState) => state.users
  );
  const history = useHistory();
  const { id } = useParams<IParams>();
  const initialValues = useMemo(() => {
    if (mode === "edit") {
      return {
        name: userDetail.name,
        username: userDetail.username,
        email: userDetail.email,
        phone: userDetail.phone,
        street: userDetail.address.street,
        suite: userDetail.address.suite,
        city: userDetail.address.city,
        zipcode: userDetail.address.zipcode,
        lat: userDetail.address.geo.lat,
        lng: userDetail.address.geo.lng,
        website: userDetail.website,
        companyName: userDetail.company.name,
        companyCatchphrase: userDetail.company.catchPhrase,
        companyBs: userDetail.company.bs
      };
    }
    return {
      name: "",
      username: "",
      email: "",
      phone: "",
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      lat: "",
      lng: "",
      website: "",
      companyName: "",
      companyCatchphrase: "",
      companyBs: ""
    };
  }, [userDetail, mode]);
  useEffect(() => {
    if (id) {
      dispatch(getParams(id));
      dispatch(getUserDetail(Number(id)));
    }
  }, [id, dispatch]);

  async function handleSubmit(values: any) {
    const submitData = {
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      website: values.website,
      address: {
        street: values.street,
        suite: values.suite,
        city: values.city,
        zipcode: values.zipcode,
        geo: {
          lat: values.lat,
          lng: values.lng
        }
      },
      company: {
        name: values.companyName,
        catchPhrase: values.companyCatchphrase,
        bs: values.companyBs
      }
    };
    if (mode === "create") {
      try {
        const response = await createUser(submitData);
        dispatch(
          addNewUser({
            id: response.data.id,
            ...response.data.body
          })
        );
        history.push(PATH_USER);
      } catch (e) {
        //
      }
    }
    if (mode === "edit") {
      try {
        const response = await updateUser(Number(id), {
          id: Number(id),
          ...submitData
        });
        dispatch(
          addUpdatedUser({
            id: response.data.id,
            ...response.data.body
          })
        );
        history.push(PATH_USER);
      } catch (e) {
        //
      }
    }
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: userSchema
  });

  return (
    <Paper loading={loading} heading="User Information">
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid container item lg={5} md={7}>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={!!formik.touched.name && !!formik.errors.name}
                  label="Name *"
                  name="name"
                  size="small"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  helperText={
                    formik.touched.name &&
                    formik.errors.name &&
                    formik.errors.name
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={!!formik.touched.username && !!formik.errors.username}
                  label="Username *"
                  name="username"
                  size="small"
                  variant="outlined"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.username &&
                    formik.errors.username &&
                    formik.errors.username
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={!!formik.touched.email && !!formik.errors.email}
                  label="Email *"
                  size="small"
                  name="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.email &&
                    formik.errors.email &&
                    formik.errors.email
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={!!formik.touched.phone && !!formik.errors.phone}
                  label="Phone *"
                  name="phone"
                  size="small"
                  variant="outlined"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.phone &&
                    formik.errors.phone &&
                    formik.errors.phone
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={!!formik.touched.street && !!formik.errors.street}
                  label="Street *"
                  name="street"
                  size="small"
                  variant="outlined"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.street &&
                    formik.errors.street &&
                    formik.errors.street
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={!!formik.touched.suite && !!formik.errors.suite}
                  label="Suite *"
                  name="suite"
                  size="small"
                  variant="outlined"
                  value={formik.values.suite}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.suite &&
                    formik.errors.suite &&
                    formik.errors.suite
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={!!formik.touched.city && !!formik.errors.city}
                  label="City *"
                  name="city"
                  size="small"
                  variant="outlined"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.city &&
                    formik.errors.city &&
                    formik.errors.city
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={!!formik.touched.zipcode && !!formik.errors.zipcode}
                  label="Zip Code *"
                  name="zipcode"
                  size="small"
                  variant="outlined"
                  value={formik.values.zipcode}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.zipcode &&
                    formik.errors.zipcode &&
                    formik.errors.zipcode
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={!!formik.touched.lng && !!formik.errors.lng}
                  label="Longitude *"
                  name="lng"
                  size="small"
                  variant="outlined"
                  value={formik.values.lng}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.lng && formik.errors.lng && formik.errors.lng
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={!!formik.touched.lat && !!formik.errors.lat}
                  label="Latitude *"
                  name="lat"
                  size="small"
                  variant="outlined"
                  value={formik.values.lat}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.lat && formik.errors.lat && formik.errors.lat
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={!!formik.touched.website && !!formik.errors.website}
                  label="Website *"
                  name="website"
                  size="small"
                  variant="outlined"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.website &&
                    formik.errors.website &&
                    formik.errors.website
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">https://</InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={
                    !!formik.touched.companyName && !!formik.errors.companyName
                  }
                  label="Company name *"
                  name="companyName"
                  size="small"
                  variant="outlined"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.companyName &&
                    formik.errors.companyName &&
                    formik.errors.companyName
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={
                    !!formik.touched.companyCatchphrase &&
                    !!formik.errors.companyCatchphrase
                  }
                  label="Compay catchphrase *"
                  name="companyCatchphrase"
                  size="small"
                  variant="outlined"
                  value={formik.values.companyCatchphrase}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.companyCatchphrase &&
                    formik.errors.companyCatchphrase &&
                    formik.errors.companyCatchphrase
                  }
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <TextField
                  fullWidth
                  error={
                    !!formik.touched.companyBs && !!formik.errors.companyBs
                  }
                  label="Company BS *"
                  name="companyBs"
                  size="small"
                  variant="outlined"
                  value={formik.values.companyBs}
                  onChange={formik.handleChange}
                  InputLabelProps={{ shrink: true }}
                  helperText={
                    formik.touched.companyBs &&
                    formik.errors.companyBs &&
                    formik.errors.companyBs
                  }
                />
              </Grid>
              <Grid
                container
                justifyContent="flex-end"
                item
                lg={12}
                spacing={1}
              >
                <Grid item>
                  <Link to={PATH_USER}>
                    <Button
                      type="button"
                      disableElevation
                      variant="contained"
                      color="default"
                    >
                      Cancel
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    disableElevation
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
