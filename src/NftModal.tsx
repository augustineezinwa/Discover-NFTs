import React from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DetailList from "./DetailList";
import Transition from "./Animation/Transistion";

type NftModalProps = {
  onOpenModal: (isOpen: boolean) => void;
  isOpen: boolean;
  data: any;
};

const NftModal = ({ onOpenModal, isOpen, data }: NftModalProps) => {
  return (
    <Dialog
      onClose={(e) => onOpenModal(false)}
      open={isOpen}
      maxWidth="sm"
      TransitionComponent={Transition}
    >
      <DialogTitle>NFT Details</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={(e) => onOpenModal(false)}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Card
        sx={{
          borderRadius: 0,
          maxWidth: "100%",
          minWidth: "25vw",
          overflow: "scroll",
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="300"
          image={data.image_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
          <DetailList
            tokenId={data.token_id}
            contractAddress={data.asset_contract.address}
            ownerAddress={data?.owner?.address}
          />
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            variant="contained"
            sx={{ backgroundColor: "black", color: "white" }}
            disabled={!data.permalink}
            onClick={() =>
              window.open(data.permalink, "_blank", "noopener,noreferrer")
            }
          >
            PURCHASE ON OPENSEA
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default NftModal;
