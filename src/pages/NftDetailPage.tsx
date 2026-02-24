import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import "./NftDetailPage.css";

export type NftDetailState = {
  nft: {
    name?: string;
    description?: string;
    image_url?: string;
    identifier?: string;
    contract?: string;
    opensea_url?: string;
    owner?: { address?: string };
  };
};

const NftDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as NftDetailState | null;
  const nft = state?.nft;

  const copy = async (value?: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Ignore clipboard errors silently.
    }
  };

  const shortAddress = (value?: string) => {
    if (!value) return "Not available";
    if (value.length <= 14) return value;
    return `${value.slice(0, 8)}...${value.slice(-6)}`;
  };

  if (!nft) {
    return (
      <Box className="nft-detail-page nft-detail-page--missing">
        <Container maxWidth="md">
          <Typography variant="h5" className="nft-detail-page__title">
            NFT not found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            This page was opened without NFT data. Search for a wallet, then
            open an NFT from the results.
          </Typography>
          <Button
            variant="contained"
            className="nft-detail-page__back-btn"
            onClick={() => navigate("/")}
            startIcon={<ArrowBackIosNewIcon />}
          >
            Back to Discover
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="nft-detail-page">
      <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Box className="nft-detail-page__layout">
          <Box className="nft-detail-page__topbar">
            <Button
              className="nft-detail-page__back-btn"
              startIcon={<ArrowBackIosNewIcon />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <span className="nft-detail-page__tag">NFT Detail</span>
          </Box>

          <Box className="nft-detail-page__shell">
            <Box className="nft-detail-page__content-section">
              <Typography variant="h3" className="nft-detail-page__name">
                {nft.name || "Unnamed NFT"}
              </Typography>

              <Typography className="nft-detail-page__section-title">
                Description
              </Typography>
              <Typography className="nft-detail-page__description">
                {nft.description?.trim() || "No description provided for this NFT."}
              </Typography>

              <Typography className="nft-detail-page__section-title">
                Asset Data
              </Typography>
              <Box className="nft-detail-page__data-grid">
                <Box className="nft-detail-page__data-row">
                  <div className="nft-detail-page__data-label">Token ID</div>
                  <div className="nft-detail-page__data-value-wrap">
                    <div className="nft-detail-page__data-value">
                      {nft.identifier ?? "Not available"}
                    </div>
                    {nft.identifier && (
                      <IconButton
                        size="small"
                        className="nft-detail-page__copy-btn"
                        onClick={() => copy(nft.identifier)}
                      >
                        <ContentCopyIcon fontSize="inherit" />
                      </IconButton>
                    )}
                  </div>
                </Box>

                <Box className="nft-detail-page__data-row">
                  <div className="nft-detail-page__data-label">Contract Address</div>
                  <div className="nft-detail-page__data-value-wrap">
                    <div className="nft-detail-page__data-value">
                      {nft.contract ?? "Not available"}
                    </div>
                    {nft.contract && (
                      <IconButton
                        size="small"
                        className="nft-detail-page__copy-btn"
                        onClick={() => copy(nft.contract)}
                      >
                        <ContentCopyIcon fontSize="inherit" />
                      </IconButton>
                    )}
                  </div>
                </Box>

                <Box className="nft-detail-page__data-row">
                  <div className="nft-detail-page__data-label">Owner Address</div>
                  <div className="nft-detail-page__data-value-wrap">
                    <div className="nft-detail-page__data-value">
                      {nft?.owner?.address ?? "Not available"}
                    </div>
                    {nft?.owner?.address && (
                      <IconButton
                        size="small"
                        className="nft-detail-page__copy-btn"
                        onClick={() => copy(nft.owner?.address)}
                      >
                        <ContentCopyIcon fontSize="inherit" />
                      </IconButton>
                    )}
                  </div>
                </Box>
              </Box>

              <Box className="nft-detail-page__actions">
                <Button
                  variant="outlined"
                  className="nft-detail-page__secondary-cta"
                  onClick={() => navigate("/")}
                >
                  Discover More NFTs
                </Button>
                {nft.opensea_url && (
                  <Button
                    variant="contained"
                    size="large"
                    className="nft-detail-page__cta"
                    endIcon={<OpenInNewIcon />}
                    onClick={() =>
                      window.open(nft.opensea_url, "_blank", "noopener,noreferrer")
                    }
                  >
                    View on OpenSea
                  </Button>
                )}
              </Box>
            </Box>

            <Box className="nft-detail-page__media-section">
              <Box
                className="nft-detail-page__image-wrap"
                style={
                  nft.image_url
                    ? { backgroundImage: `url(${nft.image_url})` }
                    : undefined
                }
              >
                {nft.image_url ? (
                  <img
                    src={nft.image_url}
                    alt={nft.name || "NFT"}
                    className="nft-detail-page__image"
                  />
                ) : (
                  <Typography className="nft-detail-page__image-fallback">
                    Image not available
                  </Typography>
                )}
              </Box>
              <Box className="nft-detail-page__quick-meta">
                <div className="nft-detail-page__pill">
                  <span className="nft-detail-page__pill-label">Token</span>
                  <span className="nft-detail-page__pill-value">
                    {nft.identifier ?? "N/A"}
                  </span>
                </div>
                <div className="nft-detail-page__pill">
                  <span className="nft-detail-page__pill-label">Owner</span>
                  <span className="nft-detail-page__pill-value">
                    {shortAddress(nft?.owner?.address)}
                  </span>
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NftDetailPage;
