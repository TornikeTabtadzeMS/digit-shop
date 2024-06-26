import { Delete } from "@mui/icons-material";
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
import productStore from "../../../stores/ProductStore";
import { useEffect, useState } from "react";
import likedProductServices from "../../../services/LikedProducts";
import { IRootLikedProduct } from "../../../interfaces/productInterfaces";
import cartService from "../../../services/Cart";
import { toast } from "react-toastify";

export default function Favorites() {
  const { favorites, setFavorites } = productStore();
  const [favoriteItems, setFavoriteItems] =
    useState<IRootLikedProduct[]>(favorites);

  useEffect(() => {
    likedProductServices
      .getAll()
      .then((res) => {
        setFavorites(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [setFavorites, favoriteItems]);

  const handleRemoveFavorite = (id: string) => {
    likedProductServices
      .delete(id)
      .then((res) => {
        console.log(res.data);
        setFavoriteItems(favorites);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleAddToCart = (id: string) => {
    cartService
      .addOne({ product_id: id })
      .then((res) => {
        console.log(res.data);
        toast.info("the product has added to cart");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <TableContainer component={Paper} sx={{ background: "#697561" }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Original Price</TableCell>
            <TableCell align="center">Add To cart</TableCell>
            <TableCell align="right">With sale</TableCell>
            {favorites && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {favorites!.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={item.likedProduct.image}
                    alt={item.likedProduct.title}
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span>{item.likedProduct.title}</span>
                </Box>
              </TableCell>
              <TableCell align="right">
                $
                {item.likedProduct.salePrice ? (
                  <s>{item.likedProduct.price.toFixed(2)}</s>
                ) : (
                  item.likedProduct.price.toFixed(2)
                )}
              </TableCell>
              <TableCell align="center">
                {favorites && (
                  <LoadingButton
                    loading={status.includes("pendingAddItem" + item.id)}
                    onClick={() => handleAddToCart(item.product_id)}
                    color="success"
                  >
                    <Typography>Add to cart</Typography>
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align="right">
                $
                {item.likedProduct.salePrice
                  ? item.likedProduct.salePrice.toFixed(2)
                  : "Not for sale"}
              </TableCell>
              {favorites && (
                <TableCell align="right">
                  <LoadingButton
                    loading={status === "pendingRemoveItem" + item.id + "del"}
                    onClick={() => handleRemoveFavorite(item.id)}
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
