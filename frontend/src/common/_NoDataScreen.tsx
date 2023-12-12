import * as React from "react";
import styled from "styled-components";
import NoData from ".././assets/images/NoData.jpg";

//No Data Screen to be shown when no data is found
const NoDataScreen = () => {
    return(
        <NoDataWrap>
        <img width={450} src={NoData} />
        <h2>Sorry, No Data Found!</h2>
        </NoDataWrap>
    );
};

const NoDataWrap = styled.article`
    text-align: center;
`;

export default NoDataScreen;