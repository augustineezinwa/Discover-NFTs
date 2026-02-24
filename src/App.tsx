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

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

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
