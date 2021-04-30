import { useState, useMemo } from "react";
import ReactMapGL from "react-map-gl";
import "./Map.css";
import PointEvent from "./PointEvent";
import StormLine from "./StormLine.js";
import FilterDrawer from "./FilterDrawer";
import StormMarker from "./StormMarker";

export default function Map(props) {
	const [eventsToDisplay, setEventsToDisplay] = useState({
		Storms: true,
		Glaciers: true,
		Wildfires: true,
		Volcanoes: true,
	});
	const [viewport, setViewport] = useState({
		latitude: 37.833818,
		longitude: -122.483696,
		zoom: 5,
	});
	const { wildfires, volcanoes, glaciers, storms } = props;
	const wildfireMarkers = useMemo(
		//use memo to prevent rerendering all markers whenever moving the map
		() =>
			wildfires.map((event, i) => (
				<PointEvent event={event} key={event.properties.id + i} />
			)),
		[wildfires]
	);
	const glacierMarkers = useMemo(
		//use memo to prevent rerendering all markers whenever moving the map
		() =>
			glaciers.map((event, i) => (
				<PointEvent event={event} key={event.properties.id + i} />
			)),
		[glaciers]
	);
	const volcanoMarkers = useMemo(
		//use memo to prevent rerendering all markers whenever moving the map
		() =>
			volcanoes.map((event, i) => (
				<PointEvent event={event} key={event.properties.id + i} />
			)),
		[volcanoes]
	);
	return (
		<div className="Map">
			<FilterDrawer
				eventsToDisplay={eventsToDisplay}
				setEventsToDisplay={setEventsToDisplay}
			/>
			<ReactMapGL
				{...viewport}
				width="100%"
				height="100%"
				mapStyle="mapbox://styles/mapbox/dark-v10"
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
				onViewportChange={(viewport) => setViewport(viewport)}
			>
				{eventsToDisplay.Wildfires && wildfireMarkers}
				{eventsToDisplay.Volcanoes && volcanoMarkers}
				{eventsToDisplay.Glaciers && glacierMarkers}
				{eventsToDisplay.Storms &&
					storms.map((storm) => (
						//extract pure coordinates data from the storm event and pass it to Source to draw storm line
						// Current version using seeded data. To use real API data, run a function to get "const geodata = event.geometry.map((data) => data.coordinates);" and request the real API in App.js
						<StormMarker
							key={storm.geometry.coordinates[0]}
							coordinates={storm.geometry.coordinates}
						/>
					))}
			</ReactMapGL>
		</div>
	);
}
