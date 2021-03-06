import { useState, useMemo } from "react";
import ReactMapGL from "react-map-gl";
import "./Map.css";
import FilterDrawer from "./FilterDrawer";
import StormMarker from "./StormMarker";
import Legend from "./Legend";
import createMarkers from "./helpers/createMarkers";

export default function Map(props) {
	// configs for filtering events by type
	const [eventsToDisplay, setEventsToDisplay] = useState({
		Storms: true,
		Glaciers: true,
		Wildfires: true,
		Volcanoes: true,
	});
	// configure map starting point
	const [viewport, setViewport] = useState({
		latitude: 37.833818,
		longitude: -102.483696,
		zoom: 3,
	});
	const { wildfires, volcanoes, glaciers, storms } = props;

	//useMemo to prevent rerendering all markers whenever moving the map
	const fireMarkers = useMemo(() => createMarkers(wildfires), [wildfires]);
	const glacierMarkers = useMemo(() => createMarkers(glaciers), [glaciers]);
	const volcanoMarkers = useMemo(() => createMarkers(volcanoes), [volcanoes]);
	const stormMarkers = storms.map((storm) => (
		//extract pure coordinates data from the storm event and pass it to Source to draw storm line
		// Current version using seeded data. To use real API data, run a function to get "const geodata = event.geometry.map((data) => data.coordinates);" and request the real API in App.js
		<StormMarker
			key={storm.geometry.coordinates[0]}
			coordinates={storm.geometry.coordinates}
		/>
	));
	return (
		<div className="Map">
			<FilterDrawer
				eventsToDisplay={eventsToDisplay}
				setEventsToDisplay={setEventsToDisplay}
			/>
			<Legend />
			<ReactMapGL
				{...viewport}
				width="100%"
				height="100%"
				mapStyle="mapbox://styles/mapbox/dark-v10"
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
				onViewportChange={(viewport) => setViewport(viewport)}
			>
				{eventsToDisplay.Wildfires && fireMarkers}
				{eventsToDisplay.Volcanoes && volcanoMarkers}
				{eventsToDisplay.Glaciers && glacierMarkers}
				{eventsToDisplay.Storms && storms && stormMarkers}
			</ReactMapGL>
		</div>
	);
}
