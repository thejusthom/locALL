import React from 'react'
import styled from "styled-components";

interface IProgressBar{
    bgcolor: string;
    progress: number;
    height: number;
}

const ProgressBar = (props: IProgressBar) => {
    const { bgcolor, progress, height } = props;
	return (
	<Parentdiv height={height}>
	<Childdiv progress={progress} bgColor={bgcolor}>
		<ProgressText>{`${progress}%`}</ProgressText>
	</Childdiv>
	</Parentdiv>
	)
}

const Parentdiv = styled.div<{height: number}>`
    height: ${(props) => props.height}px;
    width: 200px;
    background-color: whitesmoke;
    border-radius: 40px;
    margin: 50px;
    `;

const Childdiv = styled.div<{progress: number, bgColor: string}>`
    height: 100%;
    width: ${(props) => props.progress}%;
    background-color:  ${(props) => props.bgColor};
border-radius:40px;
    text-align: right;
`;

const ProgressText = styled.span`
padding: 10;
    color: black;
    font-weight: 900;
    `;

export default ProgressBar;
