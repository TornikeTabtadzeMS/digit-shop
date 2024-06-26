import { Button, Grid } from "@mui/material";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";
import CartTable from "./CartTable";
import { toast } from "react-toastify";

export default function CartPage() {
  return (
    <div className="w-full bg-secondary p-6">
      <CartTable />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <CartSummary />
          <Button
            sx={{ backgroundColor: "#10b981" }}
            component={Link}
            to="#"
            variant="contained"
            size="large"
            fullWidth
            onClick={() => {
              toast.warning("Tornike finish the check out form");
            }}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
