import { useState } from "react";
import ReactMapGL from "react-map-gl";
import "./Map.css";
import PointEvent from "./PointEvent";
import StormLine from "./StormLine.js";

export default function Map(props) {
	const [viewport, setViewport] = useState({
		latitude: 37.833818,
		longitude: -122.483696,
		zoom: 5,
	});
	const { pointEvents, storms } = props;
	return (
		<div className="Map">
			<ReactMapGL
				{...viewport}
				width="100%"
				height="100%"
				mapStyle="mapbox://styles/mapbox/dark-v10"
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
				onViewportChange={(viewport) => setViewport(viewport)}
			>
				{pointEvents.map((event) => (
					<PointEvent event={event} key={event.properties.id} />
				))}
				{storms.map((storm) => (
					<StormLine id={storm.id} event={storm} />
				))}
			</ReactMapGL>
		</div>
	);
}
