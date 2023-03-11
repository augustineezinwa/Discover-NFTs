import Avatar from "@mui/material/Avatar";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CloudIcon from "@mui/icons-material/Cloud";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import WorkIcon from "@mui/icons-material/Work";

type DetailListProps = {
 tokenId: string;
 contractAddress: string;
 ownerAddress: string | null
};

const DetailList = ({
    tokenId,
    contractAddress,
    ownerAddress
}: DetailListProps) => (
    <List
    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", overflowX: "scroll" }}
  >
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <WorkIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Token ID"
        secondary={tokenId}
      />
    </ListItem>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <CloudIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Contract Address"
        secondary={contractAddress}
      />
    </ListItem>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <BeachAccessIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary="Owner Address"
        secondary={ownerAddress || 'Not Available'}
      />
    </ListItem>
  </List>
);

export default DetailList;