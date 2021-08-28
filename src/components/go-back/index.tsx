import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { useStyles } from "./go-back.styles";

interface GoBackProps {
  to: string;
}

export default function GoBack({ to }: GoBackProps) {
  const { paper, icon } = useStyles();

  return (
    <Paper className={paper}>
      <Grid>
        <Link to={to}>
          <Button color="primary">
            <ArrowBackIcon className={icon} />
            Go back
          </Button>
        </Link>
      </Grid>
    </Paper>
  );
}
