import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

type NftCardProps = {
  imageUrl: string,
  imageDescription: string
}

const NftCard = ({imageUrl, imageDescription} : NftCardProps) => (<Card sx={{ maxWidth: 345, marginTop: 2 }}>
    <CardMedia
      component="img"
      alt={imageDescription}
      height="140"
      image={imageUrl}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>);

export default NftCard;