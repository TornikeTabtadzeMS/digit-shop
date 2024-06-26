import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from "@mui/material";
import cartService from "../../services/Cart";
import { useEffect, useState } from "react";
import cartStore from "../../stores/CartStore";
import { ICartProduct } from "../../interfaces/productInterfaces";

export default function CartTable() {
  const { cart, setCart } = cartStore();
  const [cartItems, setCartItems] = useState<ICartProduct[] | null>(cart);
  useEffect(() => {
    cartService
      .getAllCartProducts()
      .then((res) => {
        setCart(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [setCart, cartItems]);

  const removeItem = (id: string) => {
    cartService
      .deleteCartProduct({ id: id, removeAll: true })
      .then((res) => {
        console.log(res.data);
        setCartItems(cart);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const removeOneItem = (id: string) => {
    cartService
      .deleteCartProduct({ id, removeAll: false })
      .then((res) => {
        console.log(res.data);
        setCartItems(cart);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const addItem = (id: string) => {
    cartService
      .addOne({ product_id: id })
      .then((res) => {
        console.log(res.data);
        setCartItems(cart);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (!cart)
    return (
      <Typography style={{ color: "white" }} variant="h3">
        Your Cart is empty
      </Typography>
    );
  return (
    <TableContainer component={Paper} sx={{ background: "#697561" }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {cart && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {cart!.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={item.cartProduct.image}
                    alt={item.cartProduct.title}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span>{item.cartProduct.title}</span>
                </Box>
              </TableCell>
              <TableCell align="right">
                $
                {(item.cartProduct.salePrice
                  ? item.cartProduct.salePrice
                  : item.cartProduct.price
                ).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                {cart && (
                  <LoadingButton
                    loading={status === "pendingRemoveItem" + item.id + "rem"}
                    onClick={() => removeOneItem(item.id)}
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                )}
                {item.count}
                {cart && (
                  <LoadingButton
                    loading={status.includes("pendingAddItem" + item.id)}
                    onClick={() => addItem(item.product_id)}
                    color="error"
                  >
                    <Add />
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align="right">
                $
                {(
                  (item.cartProduct.salePrice
                    ? item.cartProduct.salePrice
                    : item.cartProduct.price) * item.count
                ).toFixed(2)}
              </TableCell>
              {cart && (
                <TableCell align="right">
                  <LoadingButton
                    loading={status === "pendingRemoveItem" + item.id + "del"}
                    onClick={() => removeItem(item.id)}
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
