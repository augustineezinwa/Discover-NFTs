import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Owner Address"
                secondary={data.asset_contract.owner || "Not Available"}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Created Date"
                secondary={new Date(
                  data.asset_contract.created_date
                ).toDateString()}
              />
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            variant="contained"
            sx={{ backgroundColor: "black", color: "white" }}
            disabled={!data.permalink}
            onClick={() => window.open(data.permalink, '_blank', 'noopener,noreferrer')}
          >
            Purchase ON OPENSEA
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default NftModal;
