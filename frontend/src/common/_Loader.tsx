import React from "react";
import styled from "styled-components";
import { SpinnerDotted } from 'spinners-react';

interface ILoading{
isLoading: boolean;
}

const Loading = (props: ILoading) => {
//  const style = {textAlign: 'center'};
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
/* transform: "translate(-50%, -50%)" */
`;

export default Loading;