import { ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";
import theme from "../../assets/theme/theme";
import "../../index.css";
import AuthHeader from "./AuthHeader/AuthHeader";
import AuthFooter from "./AuthFooter/AuthFooter";

export default function Auth() {
  return (
    <div className="bg-auth-bg bg-no-repeat bg-cover	">
      <ThemeProvider theme={theme}>
        <AuthHeader />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <AuthFooter />
      </ThemeProvider>
    </div>
  );
}
