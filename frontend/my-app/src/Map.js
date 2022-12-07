import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { useEventHandlers } from '@react-leaflet/core'
import { LatLngExpression } from "leaflet";
import L from "leaflet"
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet/hooks'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import {TeamCardDemo} from './Cards'
import {useCallback, useMemo, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
// import {places} from "./places"
import {setPlacesIDs, getBounds} from './features/map/mapSlice'
const markerIcon = new L.Icon({
    popupAnchor:  [-0, -0],
    iconSize: [32,45],
})
const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

function ShowBounds({dispatcher, places}) {
    const map = useMap()
    const bounds = map.getBounds()
    const bounds_ = {
        topleft_lat: bounds._northEast.lat,
        topleft_lng: bounds._northEast.lng,
        bottomright_lat: bounds._southWest.lat,
        bottomright_lng: bounds._southWest.lng
    }
    let filteredPlaces = [];
    for (let i = 0; i < places.length; i++) {
        const lat = places[i].position[0]
        const lng = places[i].position[1]
        if (bounds_.topleft_lat >= lat && lat >= bounds_.bottomright_lat && bounds_.topleft_lng >= lng && lng >=bounds_.bottomright_lng) {
            filteredPlaces.push(places[i].id)
        }
    }
    // console.log("Passing...")
    // console.log(map, bounds)
    // console.log(filteredPlaces)
    dispatcher(setPlacesIDs(filteredPlaces))
    const onChange = useCallback(() => {
        const bounds = map.getBounds()
        const bounds_ = {
            topleft_lat: bounds._northEast.lat,
            topleft_lng: bounds._northEast.lng,
            bottomright_lat: bounds._southWest.lat,
            bottomright_lng: bounds._southWest.lng
        }
        let filteredPlaces = [];
        for (let i = 0; i < places.length; i++) {
            const lat = places[i].position[0]
            const lng = places[i].position[1]
            if (bounds_.topleft_lat >= lat && lat >= bounds_.bottomright_lat && bounds_.topleft_lng >= lng && lng >=bounds_.bottomright_lng) {
                filteredPlaces.push(places[i].id)
            }
        }
        // console.log("Passing...")
        // console.log(map, bounds)
        // console.log(filteredPlaces)
        dispatcher(setPlacesIDs(filteredPlaces))
    }, [])
    const handlers = { move: onChange, zoom: onChange, click: onChange, load: onChange,
        add: onChange, loading: onChange, overlayadd: onChange}

    useEventHandlers({ instance: map }, handlers)
}

// function showPreview(dispatcher, place) {
//     console.log(place)
//     dispatcher(setPlacesIDs([place], [place])) //TODO
// }


export default function Map(props) {
    const defaultPosition = [48.864716, 2.349]; // Paris position
    let dispatcher = props.dispatcher;
    return (
        <div
            style={{ height: `calc(100vh - 56px)`, width: '100wh', position: "relative"}}
        >
            {props.children}
            <MapContainer
                center={defaultPosition}
                zoom={13}
                style={{ height: `calc(100vh - 56px)`, width: '100wh', position: "relative", zIndex: 3}}
            >
                {props.places.map((place) => (
                    <Marker
                        key={place.id}
                        position={place.position} // 👈
                        eventHandlers={{ click:  () => dispatcher(setPlacesIDs([place.id])) }}
                        icon={L.divIcon({
                            iconSize: [30, 30],
                            html: "<img src=" + place.image + " style='width: 60px; height: 60px; left: 50%; top: 50%;border-radius:  50%; border: 2px solid white;left: 50%;top: 50%;margin: -15px 0 0 -15px;'>"
                        })}
                    />
                ))}
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ShowBounds dispatcher={dispatcher} places={props.places}/>
            </MapContainer>
        </div>
    );
};

