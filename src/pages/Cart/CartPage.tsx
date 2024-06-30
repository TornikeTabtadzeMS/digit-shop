import { Button, Grid } from "@mui/material";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";
import CartTable from "./CartTable";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";
import cartStore from "../../stores/CartStore";

export default function CartPage() {
  const { cart } = cartStore();
  const [checkoutModalIsOpen, setCheckoutModalIsOpen] =
    useState<boolean>(false);

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
            disabled={!cart?.length}
            onClick={() => {
              setCheckoutModalIsOpen(true);
            }}
          >
            Checkout
          </Button>
          <CheckoutModal
            isOpen={checkoutModalIsOpen}
            onClose={() => {
              setCheckoutModalIsOpen(false);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
