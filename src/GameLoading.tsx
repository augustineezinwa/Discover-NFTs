import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./GameLoading.css";

const GameLoading = () => (
  <Box className="game-loading" role="status" aria-label="Loading NFTs">
    <div className="game-loading__orb">
      <div className="game-loading__core" />
      <div className="game-loading__ring game-loading__ring--1" />
      <div className="game-loading__ring game-loading__ring--2" />
      <div className="game-loading__ring game-loading__ring--3" />
    </div>
    <Typography component="span" className="game-loading__text" variant="body1">
      Discovering NFTs...
    </Typography>
  </Box>
);

export default GameLoading;
