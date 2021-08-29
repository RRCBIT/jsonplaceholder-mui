import MuiPaper, { PaperProps } from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

import { useStyles } from "./paper.styles";

interface CustomPaperProps extends PaperProps {
  heading?: string;
  className?: string;
}

export default function Paper({
  className,
  heading,
  children,
  ...props
}: CustomPaperProps) {
  const { root, title } = useStyles();

  return (
    <MuiPaper className={clsx(className && className, root)} {...props}>
      {heading && (
        <Typography className={title} variant="h6">
          {heading}
        </Typography>
      )}
      {children}
    </MuiPaper>
  );
}

Paper.defaultProps = {
  heading: "",
  className: ""
};
