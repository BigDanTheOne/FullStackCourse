import {store} from "./app/store";
import Map from "./Map";
import Edge from "./SwipableEdge";
import { useSelector, useDispatch } from 'react-redux';


function MapWithEdge(props){
    let dispatcher = useDispatch();
    return (
            <Map
                places={props.places} dispatcher={dispatcher}
            >
                <Edge
                    places={props.places} dispatcher={dispatcher}
                />
            </Map>
    )
}
export default MapWithEdge;
