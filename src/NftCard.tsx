import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

type NftCardProps = {
  imageUrl: string;
  imageDescription: string;
  title: string;
  onOpenModal: (
    event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent
  ) => void;
};

const NftCard = ({
  imageUrl,
  imageDescription,
  title,
  onOpenModal,
}: NftCardProps) => (
  <Card sx={{ marginTop: 2 }}>
    <CardMedia
      component="img"
      alt={imageDescription}
      image={imageUrl}
      height={200}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title?.length > 23 ? `${title.substring(0, 22)} ...` : title}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size="large"
        variant="contained"
        sx={{ marginTop: 0 }}
        onClick={onOpenModal}
      >
        View NFT
      </Button>
    </CardActions>
  </Card>
);

export default NftCard;
