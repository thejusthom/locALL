import { Box, Typography } from '@mui/material'
import { useState, useEffect} from 'react'
import MarketplaceCard from './MarketplaceCard'
import { Marketplace } from '../../models/marketplace';
import marketplaceService from '../../services/marketplaceService';
import { useSelector } from 'react-redux'

const MarketplaceView = () => {
  const [marketplaceCards, setMarketplaceCards] = useState([] as Marketplace[]);
  const locationId = useSelector((state: any) => state.location.pincode);
  useEffect(()=>{
    console.log(locationId);
    marketplaceService.getMarketplace(locationId).then((marketplaceCards)=> setMarketplaceCards(marketplaceCards));
  },[locationId]);
  
  return (
    <Box>
       <Typography variant="h4"
        sx={{
          m: 2,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
        >All items in your locAL</Typography>
        <Box sx={{display:"flex",
      m:1 ,
      gap:2}}>
        {marketplaceCards.map((marketplaceCard: Marketplace) => (
          <MarketplaceCard marketplace={marketplaceCard}></MarketplaceCard>
        ))}
        </Box>
        </Box>
  )
}

export default MarketplaceView