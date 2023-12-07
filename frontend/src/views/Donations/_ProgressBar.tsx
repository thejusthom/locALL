import React from 'react'
import styled from "styled-components";

interface IProgressBar{
    bgcolor: string;
    progress: number;
    height: number;
}

const Progress_bar = (props: IProgressBar) => {
    const { bgcolor, progress, height } = props;
	return (
	<Parentdiv height={height}>
	<Childdiv progress={progress} bgColor={bgcolor}>
		<ProgressText>{`${progress}%`}</ProgressText>
	</Childdiv>
	</Parentdiv>
	)
}



export default Progress_bar;
