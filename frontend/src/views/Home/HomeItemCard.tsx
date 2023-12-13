// Imports from mui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
//imports from project file
import { ItemCard } from "./HomeItemCards";
// Imports from semantic ui
import { Image } from "semantic-ui-react";

// Type of props given to HomeItemCard
type Props = {
  item: ItemCard;
};

const HomeItemCard = (props: Props) => {
  return (
    <Box sx={{ padding: "30px" }}>
      <Box sx={{ mb: 2 }}>
        <Typography component="h2" variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          {props.item.title}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Image
            src={props.item.image}
            alt="Local Events"
            width="250px"
            height="250px"
          />
        </Box>
        <Typography
          sx={{ mb: 2, color: "text.secondary", fontWeight: 500, fontSize: 22 }}
        >
          {props.item.content}
        </Typography>
      </Box>
    </Box>
  );
};
export default HomeItemCard;
