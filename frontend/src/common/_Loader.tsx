import React from "react";
import styled from "styled-components";
import { SpinnerDotted } from 'spinners-react';

interface ILoading{
isLoading: boolean;
}

//Loader Component to display when API calls are in progress or when some data manipulation is occuring
const Loading = (props: ILoading) => {
  return (
    <LoadingWrap>
      <SpinnerDotted color={"#123abc"} size={95} enabled={props.isLoading} />
    </LoadingWrap>
  );
};

const LoadingWrap = styled.section`
position: fixed;
top: 50%;
left: 50%;
`;

export default Loading;