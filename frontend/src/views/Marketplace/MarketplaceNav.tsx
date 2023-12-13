// Imports from react
import React, { MouseEvent } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// Imports from mui
import { Box } from "@mui/material";
// Imports from semantic ui
import { Menu, Segment, MenuItemProps } from "semantic-ui-react";
// Imports from project files
import MarketplaceView from "./MarketplaceView";

// Navigation for Marketplace
const MarketplaceNav = () => {
  // Translation
  const { t } = useTranslation("common");

  // State of active
  const [active, setActive] = React.useState("all-items");
  // Get user from redux store
  const user = useSelector((state: any) => state.user);
  // Handle item click and setting active accordingly
  const handleItemClick = (
    e: MouseEvent<HTMLAnchorElement>,
    menu: MenuItemProps
  ) => setActive(menu.value as string);
  return (
    <Box sx={{ m: 4, pl: { md: 5, xs: 2 }, pr: { md: 5, xs: 2 } }}>
      <Menu attached="top" tabular>
        <Menu.Item
          name={t("all_items")}
          value="all-items"
          active={active === "all-items"}
          onClick={handleItemClick}
        />
        {user.isLoggedIn && (
          <Menu.Item
            name={t("my_items")}
            value="my-items"
            active={active === "my-items"}
            onClick={handleItemClick}
          />
        )}
      </Menu>
      <Box sx={{ minHeight: "600px" }}>
        <Segment attached="bottom">
          {active === "all-items" ? (
            <MarketplaceView active={active} />
          ) : (
            user.isLoggedIn && <MarketplaceView active={active} />
          )}
        </Segment>
      </Box>
    </Box>
  );
};

export default MarketplaceNav;
