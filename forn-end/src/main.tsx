import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user.tsx";
import { CartProvider } from "./contexts/cart.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#F9F1E7", // Custom primary color
  //   },
  //   secondary: {
  //     main: "#dc004e", // Custom secondary color
  //   },
  // },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
