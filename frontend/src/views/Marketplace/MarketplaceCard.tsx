import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import React from 'react'
import { Marketplace } from '../../models/marketplace';


type Props = {
  marketplace: Marketplace;
}

const MarketplaceCard = (props: Props) => {
    return (
        <Card sx={{ width: 320 }}>
          <div>
            <Typography level="title-lg">{props.marketplace.productName}</Typography>
            <Typography level="body-sm">{props.marketplace.listingDate}</Typography>
          </div>
          <AspectRatio minHeight="120px" maxHeight="200px">
            <img
              src={`data:image/png;base64,${props.marketplace.image}`}
              srcSet={`data:image/png;base64,${props.marketplace.image}`}
              loading="lazy"
              alt={props.marketplace.productName}
            />
          </AspectRatio>
          <CardContent orientation="horizontal">
            <div>
              <Typography level="body-xs">Total price:</Typography>
              <Typography fontSize="lg" fontWeight="lg">
                {props.marketplace.price}
              </Typography>
            </div>
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            >
              Explore
            </Button>
          </CardContent>
        </Card>
      );
}

export default MarketplaceCard