import "./StormMarker.css";
import { Marker } from "react-map-gl";

const coords = [-122.483396, 37.8327];

export default function StormMarker(props) {
	return (
		<Marker longitude={coords[0]} latitude={coords[1]}>
			<div className="animated-marker"></div>
		</Marker>
	);
}
