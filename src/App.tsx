import React, { useEffect, useState } from "react";
import { ReactComponent as ReactLogo } from "./logo.svg";
import { ReactComponent as IdleLogo } from './idle.svg';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import NftCard from "./NftCard";
import NftModal from "./NftModal";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  const [walletAddress, setWalletAdress] = useState("");
  const [nftData, setNftData] = useState<Array<any>>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const [error, setError] = useState("");

  const INVALID_WALLET_ADDRESS_ERROR = 'Invalid wallet address, please ensure you input the wallet address in the correct format.';

  const fetchNft = async (walletAddress: string) => {
    setError("");
    try{
    const response = await fetch(
      `https://api.opensea.io/api/v1/assets?owner=${walletAddress}`
    );
    const data = await response.json();
    setNftData(data.assets);
    if(response.status === 400) setError(INVALID_WALLET_ADDRESS_ERROR);
    } catch(e) {
      setError("Sorry, we lost internet connection to you, try reconnecting.");
    }
  };

  useEffect(() => {
    fetchNft(walletAddress);
  }, [walletAddress]);

  const loadModal = (data: any) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const hasError = error.length > 0 && !!walletAddress;

  return (
    <>
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
            bgcolor: "#ffff",
            minHeight: "100vh",
            padding: 5,
            mt: 5,
            flexGrow: 1,
            borderRadius: 5,
          }}
        >
          <h1 className="header">
            Discover
            <ReactLogo />
            NFTs
          </h1>
          <div>
            <TextField
              value={walletAddress}
              fullWidth
              label="# Enter wallet address"
              id="walletAddress"
              variant="outlined"
              sx={{ mb: 2 }}
              onChange={(e) => setWalletAdress(e.target.value)}
              error={hasError}
              helperText={hasError && error}
            />
          </div>

          <h3 className="search">Search Results: {nftData?.length || 0}</h3>
          {!!nftData?.length && <Divider component="hr" sx={{ mb: 2 }} />}
          {!nftData?.length && <div className="idle">
            <IdleLogo />
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
      </Container>
    </>
  );
};

export default App;
