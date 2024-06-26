import { Outlet } from "react-router";
import { ThemeProvider } from "@mui/material";
import theme from "../assets/theme/theme";

import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";

export default function Root() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="max-w-full max-h-content bg-main-bg	bg-contain">
          <Header />
          <div className="flex min-h-screen	">
            <Outlet />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
