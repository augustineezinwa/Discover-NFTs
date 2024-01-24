import React, { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";
import NftCard from "./NftCard";
import NftModal from "./NftModal";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";
import Wishes from "./Wishes";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Baloo Bhai',
      'Roboto'
    ].join(','),
  },
});

const App = () => {
  const [walletAddress, setWalletAdress] = useState("");
  const [nftData, setNftData] = useState<Array<any>>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [error, setError] = useState("");

  const INVALID_WALLET_ADDRESS_ERROR = 'Invalid wallet address, please ensure you input the wallet address in the correct format.';

  const fetchNft = async (walletAddress: string, e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent | FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(
        `https://api.opensea.io/api/v1/assets?owner=${walletAddress}`,
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_KEY || '',
            'Content-Type': 'application/json', // You can adjust the Content-Type based on your API requirements
            // Add any other headers if needed
          },
        }
      );
      const data = await response.json();
      setNftData(data.assets);
      if (response.status === 400) setError(INVALID_WALLET_ADDRESS_ERROR);
    } catch (e) {
      setError("Sorry, we lost internet connection to you, try reconnecting.");
    }
  };

  const loadModal = (data: any) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  return (
    <>
      <Wishes width="70%" height="70%" className="bg" />
      <ThemeProvider theme={theme}>
        {isModalOpen && (
          <NftModal
            isOpen={isModalOpen}
            onOpenModal={setIsModalOpen}
            data={modalData}
          />
        )}
        <Container maxWidth="xl">
          <Box
            sx={{
              minHeight: "100vh",
              padding: 5
            }}
          >
            <Box
              sx={{
                minHeight: "100vh",
                border: 'none',
              }}>
              <Typography variant="h2" gutterBottom pt={20} sx={{ zIndex: 30 }}>
                Discover NFTs on OpenSea
              </Typography>

              <form onSubmit={(e) => fetchNft(walletAddress, e)}>
                <div className="walletBox">
                  <label htmlFor="walletAddress" className="labelText">Enter Wallet Address:</label>
                  <span>
                    <input className="walletAddress" value={walletAddress} type="text" name="walletAddress" id="walletAddress" onChange={(e) => setWalletAdress(e.target.value)} />
                    <Button className="searchButton" size="small" variant="contained" onClick={(e) => fetchNft(walletAddress, e)}>Search</Button>
                  </span>
                </div>
              </form>

              {!!nftData?.length && <h3 className="search">Search Results: {nftData?.length || 0}</h3>}
              {(nftData?.length === 0 || error) && <div className="idle">
                Search Not Found
              </div>}

              <Grid container spacing={2}>
                {!!nftData?.length && nftData?.map((data, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <NftCard
                      title={data.name}
                      imageDescription=""
                      imageUrl={data.image_url}
                      onOpenModal={(e) => loadModal(data)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
