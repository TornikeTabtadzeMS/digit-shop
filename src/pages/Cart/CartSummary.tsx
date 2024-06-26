import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import cartStore from "../../stores/CartStore";

interface Props {
  subtotal?: number;
}

export default function BasketSummary({ subtotal }: Props) {
  const { cart } = cartStore();
  if (subtotal === undefined)
    subtotal =
      cart?.reduce(
        (sum, item) =>
          sum +
          item.count *
            (item.cartProduct.salePrice
              ? item.cartProduct.salePrice
              : item.cartProduct.price),
        0
      ) ?? 0;
  const deliveryFee = subtotal > 1000 ? 0 : 5;

  return (
    <TableContainer
      component={Paper}
      variant={"outlined"}
      sx={{ background: "#697561", marginTop: "20px" }}
    >
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{subtotal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Delivery fee*</TableCell>
            <TableCell align="right">{deliveryFee}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{subtotal + deliveryFee}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <span style={{ fontStyle: "italic" }}>
                * Orders over $100 qualify for free delivery{" "}
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
