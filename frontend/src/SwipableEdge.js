import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import React, {useState, useRef} from 'react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import {places} from  "./places"
import TeamCard from './Cards';
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
const styles={
    pannel:{
        // overflow: 'hidden',
        // zIndex: 100,
        borderRadius: 15,
        // position: "relative",
        // bottom: "0px",
        // paddingBottom: "56px"
    },
    body:{
        // overflow: 'hidden',
        // zIndex: 400,
        // position: "relative",
        borderRadius: 15,
        // bottom: "0px",
        // marginBottom: "56px"
    },
    overlay:{
        // overflow: 'hidden',
        // zIndex: 400,
        // position: "relativxe",
        borderRadius: 15,
        // bottom: "0px",
        // marginBottom: "56px"
    },
    title:{
        overflow: 'visible',
        backgroundColor: grey[500],
        padding: '16px 0',
        boxSizing: 'border-box',
        color: 'white',
        height: '56px',
        fontSize: '24px',
        textAlign: 'center',
        borderRadius: "15px 15px 0px 0px",
        zIndex: 200,
        position: "relative",
        // marginBottom: "56px"
    },
};

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
    zIndex: 200
}));

export default function SwipableBottomPannel({places, user_id, reloadData}) {
    const filteredPlacesIDs = useSelector((state) => state.map.filteredPlaces);
    let filteredPlaces = [];
    for (let i = 0; i < places.length; i++) {
        for (let j = 0; j < filteredPlacesIDs.length; j++) {
            if (places[i].id == filteredPlacesIDs[j]) {
                filteredPlaces.push(places[i])
                break
            }
        }
    }
    return (
        <div style={{zIndex: 100,
            position: "relative",}}>
            <SwipeableBottomSheet
                overflowHeight={112}
                marginTop={300}
                // style={styles.pannel}
                bodyStyle={styles.body}
                // overlayStyle={styles.overlay}
                shadowTip={false}
                // overflow={false}
                topShadow={false}
            >
                <div style={styles.title} >
                    <Puller />
                    <Typography sx={{ p: 2, color: 'text.secondary'}}>
                        {filteredPlaces.length} results
                    </Typography>
                </div>
                <TeamCard places = {filteredPlaces} slider={true} user_id={user_id} reloadData={reloadData}/>
            </SwipeableBottomSheet>
        </div>
    )
}
