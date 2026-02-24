import React from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import HomePage from "./pages/HomePage";
import NftDetailPage from "./pages/NftDetailPage";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7b1384",
      dark: "#5c0d63",
      light: "#9c27b0",
    },
  },
  typography: {
    fontFamily: ["Baloo Bhai", "Roboto"].join(","),
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/nft" element={<NftDetailPage />} />
    </Routes>
  </ThemeProvider>
);

export default App;
