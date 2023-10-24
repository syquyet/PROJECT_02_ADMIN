import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";


export default function Deposits() {
  return (
    <React.Fragment>
      <h3>Total</h3>
      <Typography component="p" variant="h4">
        4.000.000VND
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 19/10/2023
      </Typography>
      <div>
        <Link color="primary" href="#" >
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
