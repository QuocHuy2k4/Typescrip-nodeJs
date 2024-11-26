import {
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/cart";
import { useProductCart } from "../hooks/useProductCart";

const labels = ["Product", "Price", "Quantity", "Subtotal", ""];

function Cart() {
  const { cart } = useCart();
  const { removeToCart, updateQuantity } = useProductCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) return; // Ngăn không cho cập nhật số lượng âm hoặc bằng 0
    updateQuantity(productId, newQuantity / newQuantity); // Gọi hàm updateQuantity
  };

  return (
    <>
      <Container>
        <Wrapper>
          <LabelWrapper
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            {labels.map((label, index) => (
              <Typography fontWeight={500} key={index}>
                {label}
              </Typography>
            ))}
          </LabelWrapper>
          <Stack gap={3} my={3}>
            {cart?.products.map((item) => (
              <Stack
                key={item.product._id}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} alignItems={"center"} gap={4}>
                  <img
                    src={item.product?.image}
                    width={"100px"}
                    alt={item.product.title}
                  />

                  <Typography fontWeight={500}>
                    {item.product.title.substring(0, 10)}...
                  </Typography>
                </Stack>

                <Typography fontWeight={500}>
                  {item.product.price.toLocaleString()} VND
                </Typography>

                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <IconButton
                    onClick={
                      () =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity - 1
                        ) // Giảm số lượng đi 1
                    }
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                  <Typography fontWeight={500}>{item.quantity}</Typography>
                  <IconButton
                    onClick={
                      () =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity + 1
                        ) // Tăng số lượng lên 1
                    }
                  >
                    <AddCircleOutline />
                  </IconButton>
                </Stack>

                <Typography fontWeight={500}>
                  {(item.product.price * item.quantity).toLocaleString()} VND
                </Typography>

                <IconButton onClick={() => removeToCart(item.product._id)}>
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Wrapper>
        <Stack alignItems={"center"}>
          <Link to="/checkout">
            <Button variant="contained" sx={{ mb: 10 }}>
              Checkout
            </Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
}

export default Cart;

const Wrapper = styled(Stack)({
  padding: "72px",
  backgroundColor: "#fff", // Thêm màu nền cho phần giỏ hàng nếu cần
  borderRadius: "10px", // Thêm bo góc cho đẹp
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Đổ bóng nhẹ
});

const LabelWrapper = styled(Stack)({
  backgroundColor: "#F9F1E7",
  height: "55px",
  borderRadius: "8px", // Bo góc phần label
  justifyContent: "center", // Căn giữa nội dung theo chiều dọc
  paddingLeft: "20px", // Thêm khoảng cách bên trái
  paddingRight: "20px", // Thêm khoảng cách bên phải
  fontWeight: "bold", // Đậm chữ
});
