// components/Checkout.tsx
import { Button, Container, Stack, styled, Typography } from "@mui/material";
import { useCart } from "../contexts/cart";

function Checkout() {
  const { cart } = useCart();

  // Tính tổng giá trị của giỏ hàng
  const totalAmount = cart?.products.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <Container>
      <Wrapper>
        <Typography variant="h4" fontWeight={500} mb={3}>
          Checkout
        </Typography>

        <Stack spacing={3}>
          {cart?.products.map((item, index) => (
            <Stack
              key={index}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={500}>
                {item.product.title} (x{item.quantity})
              </Typography>
              <Typography fontWeight={500}>
                {(item.product.price * item.quantity).toLocaleString()} VND
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={3}
        >
          <Typography fontWeight={700}>Total:</Typography>
          <Typography fontWeight={700}>
            {totalAmount?.toLocaleString()} VND
          </Typography>
        </Stack>

        <Stack alignItems={"center"} mt={5}>
          <Button variant="contained" color="primary">
            Confirm Order
          </Button>
        </Stack>
      </Wrapper>
    </Container>
  );
}

export default Checkout;

const Wrapper = styled(Stack)(() => ({
  padding: 32,
}));
