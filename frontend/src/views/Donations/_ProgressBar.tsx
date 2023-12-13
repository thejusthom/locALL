import React from 'react'
import styled from "styled-components";
import Box from "@mui/material/Box";
import Popover from '@mui/material/Popover';

interface IProgressBar{
    id: string
    bgcolor: string;
    progress: number;
    height: number;
    donationRequired: number;
    donationAchieved: number;
}

const ProgressBar = (props: IProgressBar) => {
  //props
    const { id, bgcolor, progress, height, donationRequired, donationAchieved } = props;
    //useState
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    //functions
    const onShowPopOver = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
      };
    const open = Boolean(anchorEl);
	return (
	<Parentdiv height={height}>
    {/* popover to show amount achieved/amount required */}
        <Popover
  id={id}
  open={open}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  PaperProps={{
    style: {
      backgroundColor: "transparent",
      boxShadow: "none",
      borderRadius: 0
    }
  }}
> <Box
          sx={{
            position: "relative",
            mt: "10px",
            "&::before": {
              backgroundColor: "white",
              content: '""',
              display: "block",
              position: "absolute",
              width: 12,
              height: 12,
              top: -6,
              transform: "rotate(45deg)",
              left: "calc(50% - 6px)"
            }
          }}
        />
        <PopOver>
          ${donationAchieved} / ${donationRequired}
          </PopOver>
        </Popover>
        {/* progress inner bar */}
	<Childdiv id={id} progress={progress} bgColor={bgcolor} onMouseOver={onShowPopOver}>
		<ProgressText>{`${progress}%`}</ProgressText>
	</Childdiv>
	</Parentdiv>
	)
}

const Parentdiv = styled.div<{height: number}>`
    height: ${(props) => props.height}px;
    width: 200px;
    background-color: #eaeaea;
    border-radius: 40px;
    /* margin: 50px; */
    `;

const Childdiv = styled.div<{progress: number, bgColor: string}>`
    height: 100%;
    width: ${(props) => props.progress}%;
    background-color:  ${(props) => props.bgColor};
border-radius:40px;
    text-align: right;
`;
const PopOver = styled.div`
padding: 10px;
border-radius: 5px;
background-color: white;
`;
const ProgressText = styled.span`
padding: 10px;
    color: black;
    font-weight: 900;
    `;

export default ProgressBar;
