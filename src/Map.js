import { useState } from "react";
import ReactMapGL from "react-map-gl";
import "./Map.css";
import PointEvent from "./PointEvent";

export default function Map(props) {
	const [viewport, setViewport] = useState({
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 5,
	});
	const { wildfires, ice, storms, volcanoes } = props;
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
				{/* add separate componenets for different events (possibly display different ones based on route) */}
				{wildfires.map((event) => (
					<PointEvent event={event} key={event.properties.id} />
				))}
				{ice.map((event) => (
					<PointEvent event={event} key={event.properties.id} />
				))}
				{volcanoes.map((event) => {
					console.log(event);
					return (
						<PointEvent event={event} key={event.properties.id} />
					);
				})}
			</ReactMapGL>
		</div>
	);
}
