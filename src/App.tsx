import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import HomePage from "./pages/HomePage";
import NftDetailPage from "./pages/NftDetailPage";
import { SearchStateProvider } from "./context/SearchStateContext";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

const DARK_MODE_STORAGE_KEY = "discover-nfts:dark-mode";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem(DARK_MODE_STORAGE_KEY);
    return stored === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem(DARK_MODE_STORAGE_KEY, String(isDarkMode));
  }, [isDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: "#7b1384",
            dark: "#5c0d63",
            light: "#9c27b0",
          },
        },
        typography: {
          fontFamily: ["Baloo Bhai", "Roboto"].join(","),
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <SearchStateProvider>
        <IconButton
          aria-label="Toggle dark mode"
          className="themeToggleButton"
          onClick={() => setIsDarkMode((prev) => !prev)}
        >
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nft" element={<NftDetailPage />} />
        </Routes>
      </SearchStateProvider>
    </ThemeProvider>
  );
};

export default App;
