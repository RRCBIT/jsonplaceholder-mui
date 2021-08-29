import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { login } from "store/auth.slices";
import { Paper } from "components";
import { loginSchema } from "./login.schema";

export default function LoginForm() {
  const dispatch = useDispatch();

  function handleSubmit(values: any) {
    dispatch(login(values));
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: handleSubmit,
    validationSchema: loginSchema
  });

  return (
    <Paper>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12}>
            <TextField
              fullWidth
              error={!!formik.touched.email && !!formik.errors.email}
              variant="outlined"
              size="small"
              label="Email"
              name="email"
              value={formik.values.email}
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              helperText={
                formik.touched.email &&
                formik.errors.email &&
                formik.errors.email
              }
              inputProps={{
                autocomplete: "new-password",
                form: {
                  autocomplete: "off"
                }
              }}
            />
          </Grid>
          <Grid item lg={12} md={12}>
            <TextField
              fullWidth
              error={!!formik.touched.password && !!formik.errors.password}
              variant="outlined"
              size="small"
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              helperText={
                formik.touched.password &&
                formik.errors.password &&
                formik.errors.password
              }
              inputProps={{
                autocomplete: "new-password",
                form: {
                  autocomplete: "off"
                }
              }}
            />
          </Grid>
          <Grid container justifyContent="center" item lg={12}>
            <Button
              type="submit"
              disableElevation
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
