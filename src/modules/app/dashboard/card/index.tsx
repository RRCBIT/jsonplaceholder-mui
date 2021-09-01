import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

interface DashboardCardProps {
  loading?: boolean;
  number: number;
  title: string;
  link: string;
}

export default function DashboardCard({
  loading,
  number,
  title,
  link
}: DashboardCardProps) {
  return (
    <Card>
      {!loading ? (
        <>
          <CardHeader title={title} />
          <CardContent>
            <Grid container justifyContent="space-between">
              <Typography variant="body1">Total</Typography>
              <Typography variant="h4">{number}</Typography>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="flex-end">
              <Link to={link}>
                <Button disableElevation color="primary">
                  More
                </Button>
              </Link>
            </Grid>
          </CardActions>
        </>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: 193 }}
        >
          <CircularProgress />
        </Grid>
      )}
    </Card>
  );
}

DashboardCard.defaultProps = {
  loading: false
};
