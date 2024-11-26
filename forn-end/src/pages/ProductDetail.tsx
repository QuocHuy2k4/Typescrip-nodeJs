import useProducts from "../hooks/useProducts";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import {
  AddCircleOutlineTwoTone,
  RemoveCircleOutline,
} from "@mui/icons-material";

import { useState } from "react";
import { Product } from "../types/Product";
import { useProductCart } from "../hooks/useProductCart";

export default function ProductDetail() {
  const { product } = useProducts();
  const { addToCart } = useProductCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = (product: Product) => {
    if (quantity <= 0) return;
    addToCart({ product, quantity });
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Product Detail</h2>
      {product && (
        <Grid container spacing={2} alignItems="center">
          {/* Hình ảnh sản phẩm */}
          <Grid item xs={12} md={6}>
            <img
              src={product.image}
              className="card-img-top"
              alt=""
              style={{ width: "100%", maxWidth: "300px" }} // Giảm kích thước ảnh
            />
          </Grid>

          {/* Thông tin và nút Add to Cart */}
          <Grid item xs={12} md={6}>
            <h5 className="card-title">Name: {product.title}</h5>
            <p className="card-text">Des: {product.description}</p>
            <p className="card-text">Price: {product.price} VND</p>

            <Stack direction={"row"} gap={2} alignItems={"center"} mt={2}>
              <Typography>Quantity: </Typography>
              <IconButton
                onClick={() => setQuantity(quantity === 0 ? 0 : quantity - 1)}
              >
                <RemoveCircleOutline />
              </IconButton>
              <TextField
                id="outlined-basic"
                label="quantity"
                variant="outlined"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <IconButton onClick={() => setQuantity(quantity + 1)}>
                <AddCircleOutlineTwoTone />
              </IconButton>
            </Stack>

            {/* Nút Add to Cart */}
            <Button
              variant="outlined"
              onClick={() => handleAddToCart(product)}
              sx={{ mt: 2 }} // Thêm khoảng cách phía trên
            >
              Add to cart
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
