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
                    places={props.places}
                    user_id={props.user_id}
                    reloadData={props.reloadData}
                />
            </Map>
    )
}
export default MapWithEdge;
