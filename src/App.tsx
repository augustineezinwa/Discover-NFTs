import React, { useEffect, useState } from 'react';
import { ReactComponent as ReactLogo } from './logo.svg';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import NftCard from './NftCard';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



const App = () => {
  const [walletAddress, setWalletAdress] = useState<string>('');
  const [nftData, setNftData] = useState<Array<any>>();

  const fetchNft = async (walletAddress: string) => {
    const response = await fetch(`https://api.opensea.io/api/v1/assets?owner=${walletAddress}`);
    const data = await response.json();
    setNftData(data.assets);
    console.log(data);
  }

  useEffect(() => {
    fetchNft(walletAddress);
  }, [walletAddress]);

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: '#ffff', minHeight: '100vh', padding: 5, mt: 5, flexGrow: 1, borderRadius: 5 }}>
          <h1 className="header">Discover{'  '}<ReactLogo />{'  '}NFTs</h1>
          <div>
            <TextField value={walletAddress} fullWidth label="# Enter wallet address" id="walletAddress" variant="outlined" sx={{ mb: 2 }} onChange={(e) => setWalletAdress(e.target.value)} />
          </div>

          <h3 className="search">Search Results: {nftData?.length || 0}</h3>
          <Divider component="hr" sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {nftData?.map((data, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}>
                <NftCard title={data.name} imageDescription="" imageUrl={data.image_url} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default App;
