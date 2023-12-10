import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import SuccessfulIcon from "../../assets/images/successfulIcon.svg";

const Success = () => {
  return (
    <SuccessWrap>
        <SuccessDiv>
    <img src={SuccessfulIcon} width={60} height={60} />
    <p>Your Payment is Successful! Thank you for your contribution in making a person's life better.</p>
   <Link to="/donations"><span>Go Back</span></Link>
    </SuccessDiv>
    </SuccessWrap>
  )
}

const SuccessWrap = styled.article`
width: 100%;
height: 100%;
text-align: center;
p{
    margin: 40px 0;
    font-size: 28px;
}
span{
    font-size: 24px;
}
`;
const SuccessDiv = styled.div`
/* width: 100%;
height: 100%; */
position: absolute;
top: 32%;
left: 13%;
`;

export default Success;