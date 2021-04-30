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
	const { wildfires, volcanoes, glaciers, storms } = props;
	const pointMarkers = useMemo(
		//use memo to prevent rerendering all markers whenever moving the map
		() =>
			[...wildfires, ...glaciers, ...volcanoes].map((event, i) => (
				<PointEvent event={event} key={event.properties.id + i} />
			)),
		[]
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
				{storms &&
					storms.map((storm) => (
						<StormLine
							key={storm.geometry.coordinates[0]}
							event={storm}
						/>
					))}
			</ReactMapGL>
		</div>
	);
}
