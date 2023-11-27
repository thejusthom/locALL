import * as React from "react";
import styled from "styled-components";
import { AddressAutofill, SearchBox } from '@mapbox/search-js-react';

const NavBar = () => {
    const tabs = [
        {
            id: "home",
            label: "Home"
        },
        {
            id: "happenings",
            label: "Happenings"
        },
        {
            id: "events",
            label: "Events"
        },
        {
            id: "feedShare",
            label: "Feed Share"
        },
    ]
    return(
        <section style={{display: "flex"}}>
            <Left>
        {tabs.map((tab) => {
            return(
                <Tab key={tab.id}>
                    {tab.label}
                </Tab>
            )
        })}
        </Left>
        <Right>
            <form>
        <AddressAutofill accessToken={"pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw"}>
          <input
            name="address"
            title=" Your Address"
            placeholder="Address"
            type="text"
            className="form-control"
            style={{ marginLeft: "10px", marginTop: "10px" }}
            autoComplete="address-line1"
          />
        </AddressAutofill>
        </form>
        <form>
<SearchBox accessToken={'pk.eyJ1IjoiYXNobWl5YS12aWpheWFjaGFuZHJhbiIsImEiOiJjbHBnMXRxc3oxaXd3MmlwcG5zZjBpdXNqIn0.GqCCjkCcmFsgrpMnl7ntzw'} />
        </form>
        </Right>
        </section>
    );
};

const Tab = styled.button`
/* text-decoration: none; */
background-color: none;
border: none;
padding-right: 20px;
font-size: 20px;
`;
const Left = styled.section``;
const Right = styled.section``;


export default NavBar; 