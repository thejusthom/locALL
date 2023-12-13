import * as React from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserProfileBlock from './UserProfileBlock';

export default function UserProfileView() {
  // const [value, setValue] = React.useState('1');

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      {/* <TabContext value={value}> */}
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
          {/* <TabList onChange={handleChange}>
            <Tab label="Profile" value="1" />
          </TabList> */}
        {/* </Box> */}
        {/* <TabPanel value="1"> */}
       <ProfileWrap>
         <h2>Profile</h2>
          <UserProfileBlock />
          </ProfileWrap>
        {/* </TabPanel> */}
      {/* </TabContext> */}
    </Box>
  );
}

const ProfileWrap = styled.article`
margin: 20px;
h2{
  margin: 0 0 0 10px;
    font-size: 28px;
    color: #1976d2;
}
`;