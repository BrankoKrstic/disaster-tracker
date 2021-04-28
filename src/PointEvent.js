import { useState } from "react";
import displayIcon from "./helpers/displayIcon";
import { Marker } from "react-map-gl";
import PopupWindow from "./PopupWindow";
import calcCoords from "./helpers/calcCoords";
import "./PointEvent.css";

export default function PointEvent(props) {
	const [showPopup, togglePopup] = useState(false);
	const { event } = props;
	const longitude = calcCoords(event, 1);
	const latitude = calcCoords(event, 0);
	return (
		<div>
			<Marker latitude={longitude} longitude={latitude}>
				{/* helper function to display the right icon based on event type */}
				{displayIcon(event, togglePopup)}
			</Marker>
			{showPopup && (
				<PopupWindow
					latitude={longitude}
					longitude={latitude}
					togglePopup={togglePopup}
					event={event}
				/>
			)}
		</div>
	);
}
