import { useState, useMemo } from "react";
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
	const pointMarkers = useMemo(
		//use memo to prevent rerendering all markers whenever moving the map
		() =>
			pointEvents.map((event, i) => (
				<PointEvent event={event} key={event.properties.id + i} />
			)),
		[pointEvents]
	);
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
				{pointMarkers}
				{storms.map((storm) => (
					<StormLine key={storm.id} event={storm} />
				))}
			</ReactMapGL>
		</div>
	);
}
