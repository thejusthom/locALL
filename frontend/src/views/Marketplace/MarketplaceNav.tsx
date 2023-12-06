import { Box } from "@mui/material";
import React, { MouseEvent } from "react";
import { Input, Menu, Segment, MenuItemProps } from "semantic-ui-react";
import MarketplaceView from "./MarketplaceView";

const MarketplaceNav = () => {
  const [active, setActive] = React.useState("all-items");
  const handleItemClick = (
    e: MouseEvent<HTMLAnchorElement>,
    menu: MenuItemProps
  ) => setActive(menu.name as string);
  return (
    <Box sx={{ m: 4 ,pl:{md:20,xs:2},pr:{md:20,xs:2}}}>
      <Menu attached="top" tabular>
        <Menu.Item
          name="all-items"
          active={active === "all-items"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="my-items"
          active={active === "my-items"}
          onClick={handleItemClick}
        />
      </Menu>
      <Box sx={{ minHeight: "600px" }}>
        <Segment attached="bottom">
          {active === "all-items" ? (
            <MarketplaceView active={active} />
          ) : (
            <MarketplaceView active={active} />
          )}
        </Segment>
      </Box>
    </Box>
  );
};

export default MarketplaceNav;
