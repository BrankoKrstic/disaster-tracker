import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "./Map.css";
import WhatshotIcon from "@material-ui/icons/Whatshot";

export default function Map(props) {
	const [viewport, setViewport] = useState({
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 5,
	});
	// use useState to create an EventInfo componenet that takes event data and display set to true/false
	const displayEventInfo = (i) => {
		// display event info component and pass relevant data
		console.log(props.events[i]);
	};
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
				{/* add separate componenets for different events */}
				{props.events.map((event, i) => (
					<Marker
						key={event.id}
						latitude={event.geometry[0].coordinates[1]}
						longitude={event.geometry[0].coordinates[0]}
					>
						<WhatshotIcon
							style={{ color: "#d50000", cursor: "pointer" }}
							fontSize="large"
							onClick={() => displayEventInfo(i)}
						/>
					</Marker>
				))}
			</ReactMapGL>
		</div>
	);
}
