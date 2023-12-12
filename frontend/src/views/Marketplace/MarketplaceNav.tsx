import { Box } from "@mui/material";
import React, { MouseEvent } from "react";
import { Menu, Segment, MenuItemProps } from "semantic-ui-react";
import MarketplaceView from "./MarketplaceView";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const MarketplaceNav = () => {
  const { t } = useTranslation('common');

  const [active, setActive] = React.useState("all-items");
  const user = useSelector((state: any) => state.user);
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
