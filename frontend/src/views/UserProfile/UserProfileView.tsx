import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserProfileBlock from './UserProfileBlock';

export default function UserProfileView() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Profile" value="1" />
            <Tab label="My Events" value="2" />
            <Tab label="My Marketplace" value="3" />
            <Tab label="My FeedShares" value="4" />
            <Tab label="My Happenings" value="5" />
            <Tab label="My Donation Requests" value="6" />

          </TabList>
        </Box>
        <TabPanel value="1">
            <UserProfileBlock></UserProfileBlock>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
