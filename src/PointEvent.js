import { useState } from "react";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import FilterHdrTwoToneIcon from "@material-ui/icons/FilterHdrTwoTone";
import { Marker } from "react-map-gl";
import PopupWindow from "./PopupWindow";
import calcCoords from "./helpers/calcCoords";
import "./PointEvent.css";

export default function PointEvent(props) {
	const [showPopup, togglePopup] = useState(false);
	const { event } = props;

	const displayIcon = () => {
		if (event.properties.categories[0].id === "wildfires") {
			return (
				<WhatshotIcon
					className="Marker"
					style={{ color: "#d51111", cursor: "pointer" }}
					fontSize="large"
					onClick={() => togglePopup(true)}
				/>
			);
		}
		if (event.properties.categories[0].id === "seaLakeIce") {
			return (
				<AcUnitIcon
					className="Marker"
					style={{ color: "#35baf6", cursor: "pointer" }}
					onClick={() => togglePopup(true)}
				/>
			);
		}
		if (event.properties.categories[0].id === "volcanoes") {
			return (
				<FilterHdrTwoToneIcon
					className="Marker"
					style={{ color: "#d56600", cursor: "pointer" }}
					fontSize="large"
					onClick={() => togglePopup(true)}
				/>
			);
		}
	};

	const longitude = calcCoords(event, 1);
	const latitude = calcCoords(event, 0);
	return (
		<div>
			<Marker latitude={longitude} longitude={latitude}>
				{displayIcon()}
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
