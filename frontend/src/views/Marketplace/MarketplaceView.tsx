import { Box, Typography } from '@mui/material'
import React from 'react'
import MarketplaceCard from './MarketplaceCard'

const Marketplace = () => {
  
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
        <MarketplaceCard></MarketplaceCard>
    </Box>
  )
}

export default Marketplace