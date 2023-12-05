import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ItemCard } from "./HomeItemCards";

type Props = {
  item: ItemCard;
};

const HomeItemCard = (props: Props) => {
  return (
    <Box sx={{ padding: "30px" }}>
      <Box sx={{ mb: 2 }}>
        <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
          {props.item.title}
        </Typography>
        <Typography sx={{ mb: 2, color: "text.secondary" }}>
          {props.item.content}
        </Typography>
      </Box>
    </Box>
  );
};
export default HomeItemCard;
