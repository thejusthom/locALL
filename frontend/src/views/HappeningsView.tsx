import React, { useState, useEffect } from 'react';
import '../assets/styles/happenings.scss';
import Posts from '../happenings-page/posts/posts';
import happeningsService from '../services/happeningsService';
import { useSelector } from 'react-redux';
import Happenings from '../models/happenings';
import { Tab } from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import NoDataScreen from '../common/_NoDataScreen';
import { useTranslation } from "react-i18next";

const HappeningsView: React.FC = () =>{
  const { t } = useTranslation('common');

  const [allHappenings, setAllHappenings] = useState([] as Happenings[]);
  const [myHappenings, setMyHappenings] = useState([] as Happenings[]);
  const locationId = useSelector((state: any) => state.location.pincode);
  const currentUser = useSelector((state: any) => state.user);
  const [tab, setTab] = React.useState('0');

  console.log(currentUser);
 
  useEffect(() => {
    const fetchAllHappenings = async () => {
      try
      {
        const happenings = await happeningsService.getAllHappenings(locationId);
        setAllHappenings(happenings);
        console.log(happenings);
      }
      catch(err)
      {
        console.log(err);
      }
    };

    const fetchMyHappenings = async () => {
      try
      {
        const happenings = await happeningsService.getHappeningsByParams(locationId, currentUser?.user?._id);
        setMyHappenings(happenings);
      }
      catch(err){
        console.log(err);
      }
    };

    if (tab === '0') {
      fetchAllHappenings();
    } else if (tab === '1' && currentUser.isLoggedIn) {
      fetchMyHappenings();
    }
  }, [tab, locationId, currentUser]);

  function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
  <div className="happenings">
    <TabContext value={tab}>
      <TabList
        sx={{
          margin: "15px 0 0 0",
          '& .MuiTab-root': {
            fontSize: "16px",
            fontWeight: "bold",
          },
        }}
        onChange={(_, newValue) => setTab(newValue)}
        aria-label="happenings tabs"
      >
        <Tab label={t("all_happenings")} value="0" {...a11yProps(0)} />
        {currentUser.isLoggedIn && <Tab label={t("my_happenings")} value="1" {...a11yProps(1)} />}
      </TabList>
      <TabPanel value="0">
        {allHappenings.length === 0 ? (
          <NoDataScreen />
        ) : (
          <Posts posts={allHappenings} />
        )}
      </TabPanel>
      {currentUser?.isLoggedIn && (
        <TabPanel value="1">
          <Link to={'/happenings/createPost'} className="link" >
            <Button sx={{ mt: 5, ml : 7, mb : 3, mr: 8, width: 193}}  variant="contained">
              {t("create_happening")}
            </Button>
          </Link>
          {myHappenings.length === 0 ? (
            <NoDataScreen />
          ) : (
            <Posts posts={myHappenings} />
          )}
        </TabPanel>
      )}
    </TabContext>
  </div>
  )
};

export default HappeningsView;