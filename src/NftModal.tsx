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
  console.log(data);
  return (
    <Dialog
      onClose={(e) => onOpenModal(false)}
      open={isOpen}
      maxWidth="sm"
      TransitionComponent={Transition}
      scroll="body"
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
          overflowY: "scroll"
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
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
            tokenId={data.identifier}
            contractAddress={data.contract}
            ownerAddress={data?.owner?.address}
          />
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            variant="contained"
            disabled={!data.opensea_url}
            onClick={() =>
              window.open(data.opensea_url
                , "_blank", "noopener,noreferrer")
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
