import React from 'react';
import {ReactComponent as ReactLogo} from './logo.svg';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NftCard from './NftCard';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const App = () => {
  return (
    <>

<Container maxWidth="xl">
    <Box sx={{ bgcolor: '#ffff', minHeight: '100vh', padding: 5, mt: 5, flexGrow: 1, borderRadius: 5}}>
      <h1 className="header">Discover{'  '}<ReactLogo />{'  '}NFTs</h1>
    <div>
        <TextField fullWidth label="# Enter wallet address" id="walletAddress" variant="outlined" sx={{ mb: 2 }}/>
    </div>

    <h3 className="search">Search Results: 0</h3>
    <Divider component="hr" sx={{mb: 2 }}/>

    <Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
   <NftCard imageDescription="" imageUrl="" />
  </Grid>

  <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
  <Card sx={{ maxWidth: 345, marginTop: 2 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
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
    </Card>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
  <Card sx={{ maxWidth: 345, marginTop: 2 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
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
    </Card>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
  <Card sx={{ maxWidth: 345, marginTop: 2 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
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
    </Card>
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
  <Card sx={{ maxWidth: 345, marginTop: 2 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
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
    </Card>
  </Grid>

</Grid>
    </Box>
  </Container>
  </>
  );
}

export default App;
