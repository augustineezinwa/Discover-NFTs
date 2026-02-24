import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import NftCard from "../NftCard";
import Typography from "@mui/material/Typography";
import Wishes from "../Wishes";
import GameLoading from "../GameLoading";

const INVALID_WALLET_ADDRESS_ERROR =
  "Invalid wallet address, please ensure you input the wallet address in the correct format.";
const SEARCH_STATE_STORAGE_KEY = "discover-nfts:search-state";

const HomePage = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAdress] = useState("");
  const [nftData, setNftData] = useState<Array<any>>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchStateHydrated, setIsSearchStateHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawState = sessionStorage.getItem(SEARCH_STATE_STORAGE_KEY);
      if (!rawState) return;
      const parsedState = JSON.parse(rawState);

      if (typeof parsedState.walletAddress === "string") {
        setWalletAdress(parsedState.walletAddress);
      }
      if (Array.isArray(parsedState.nftData)) {
        setNftData(parsedState.nftData);
      }
      if (typeof parsedState.error === "string") {
        setError(parsedState.error);
      }
    } catch {
      // Ignore invalid session state.
    } finally {
      setIsSearchStateHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isSearchStateHydrated) return;
    try {
      sessionStorage.setItem(
        SEARCH_STATE_STORAGE_KEY,
        JSON.stringify({
          walletAddress,
          nftData: nftData ?? [],
          error,
        })
      );
    } catch {
      // Ignore storage write errors.
    }
  }, [walletAddress, nftData, error, isSearchStateHydrated]);

  const fetchNft = async (
    address: string,
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent | KeyboardEvent
  ) => {
    e.preventDefault();
    const trimmed = address.trim();
    if (!trimmed) return;
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.opensea.io/api/v2/chain/ethereum/account/${trimmed}/nfts`,
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY || "",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setNftData([]);
        if (response.status === 400) {
          setError(INVALID_WALLET_ADDRESS_ERROR);
        } else if (response.status === 404 || data?.error?.code === 404) {
          setError("Wallet address not found. Please check the address and try again.");
        } else {
          setError(
            data?.error?.message ||
            data?.detail ||
            "Something went wrong. Please try again."
          );
        }
        return;
      }
      setNftData(Array.isArray(data.nfts) ? data.nfts : []);
    } catch (err) {
      setNftData([]);
      setError(
        "Sorry, we lost internet connection to you, try reconnecting."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openNftDetail = (nft: any) => {
    navigate("/nft", { state: { nft } });
  };

  return (
    <>
      <Wishes width="70%" height="70%" className="bg" />
      <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 2, md: 3 } }}>
        <Box
          sx={{
            minHeight: "100vh",
            padding: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box sx={{ minHeight: "100vh", border: "none" }}>
            <Typography
              variant="h2"
              gutterBottom
              className="appTitle"
              sx={{ zIndex: 30 }}
            >
              Discover NFTs on OpenSea
            </Typography>

            <form
              onSubmit={(e) => fetchNft(walletAddress, e)}
              className="searchForm"
            >
              <div className="walletBox">
                <label htmlFor="walletAddress" className="labelText">
                  Enter Wallet Address:
                </label>
                <div className="searchInputGroup">
                  <input
                    className="walletAddress"
                    value={walletAddress}
                    type="text"
                    name="walletAddress"
                    id="walletAddress"
                    placeholder="0x..."
                    onChange={(e) => setWalletAdress(e.target.value)}
                    disabled={isLoading}
                    aria-describedby="wallet-hint"
                  />
                  <Button
                    type="submit"
                    className="searchButton"
                    variant="contained"
                    disabled={isLoading || !walletAddress.trim()}
                    onClick={(e) => {
                      e.preventDefault();
                      fetchNft(walletAddress, e);
                    }}
                  >
                    Search
                  </Button>
                </div>
                <span id="wallet-hint" className="sr-only">
                  Enter a valid Ethereum wallet address to discover NFTs
                </span>
              </div>
            </form>

            {isLoading && <GameLoading />}

            {!isLoading && !!nftData?.length && (
              <h3 className="search">
                Search Results: {nftData?.length || 0}
              </h3>
            )}
            {!isLoading && (nftData?.length === 0 || error) && (
              <div className="idle">{error || "Search Not Found"}</div>
            )}

            <Grid container spacing={2}>
              {!!nftData?.length &&
                nftData?.map((data, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}>
                    <NftCard
                      title={data.name}
                      imageDescription=""
                      imageUrl={data.image_url}
                      onOpenModal={() => openNftDetail(data)}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
