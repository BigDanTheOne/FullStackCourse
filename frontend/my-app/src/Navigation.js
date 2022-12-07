import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MapIcon from '@material-ui/icons/Map';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Feed from "./Feed";
import {places} from "./places";
import Map from "./Map";
import MapWithEdge from "./MapWithEdge";

export default function PrimaryNav (props)  {
    const [appState, setAppState] = useState({
            value: 0,
            data: [],

        }
    );
    const [filter, setFilter] = useState({
        filterValue: '["Granny"]',
        loading: true
    });
    const handleChange = (event, value_) => {
        setAppState({data: appState.data, value: value_});
    };
    useEffect(() => {
        // if (filter.loading) {
        //     fetch(`http://127.0.0.1:5000/api/events/eventFilter/?filters=${filter.filterValue}`,
        //         {
        //             headers: {
        //                 "content_type": "application/json",
        //             },
        //             method: "GET",
        //         })
        //         .then((response) => response.json())
        //         .then((data_) => {
        //             console.log(data_);
        //             setAppState({data: data_, value: appState.value})
        //             setFilter({filterValue: filter.filterValue, loading: false})
        //         });
        // }
    }, [])
    const navHeight = "56px";
    let child = null;
    if (appState.value === 0) {
        child = <Feed initFeedData={appState.data} setFilter={setFilter}/>;
    } else {
        child = <MapWithEdge places={appState.data} setFilter={setFilter}/>
    }
    if (filter.loading) {
        let user_id = 121212
        fetch(`http://127.0.0.1:5000/api/events/eventFilter/?filters=${filter.filterValue}&user_id=${user_id}`,
            {
                headers: {
                    "content_type": "application/json",
                },
                method: "GET",
            })
            .then((response) => response.json())
            .then((data_) => {
                console.log(data_);
                setAppState({data: data_, value: appState.value})
                setFilter({filterValue: filter.filterValue, loading: false})
            });
    }
    return (
        <div style={{position: "relative"}}>
            <Box sx={{ height: `calc(100vh - ${navHeight})`, position: "relative"}}>
                {child}
            </Box>
            <BottomNavigation
                value={appState.value}
                onChange={handleChange}
                showLabels
                style={{width: '100%',
                    position: "relative",
                    bottom: 0,
                    height: navHeight,
                    zIndex: 200}}
            >
                <BottomNavigationAction icon={<ExploreIcon />} sx={{opacity: 0}}/>
                <BottomNavigationAction icon={<MapIcon />}/>
            </BottomNavigation>

        </div>
    );
}
