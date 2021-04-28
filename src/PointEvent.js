import { useState, useEffect, useRef } from "react";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import FilterHdrTwoToneIcon from "@material-ui/icons/FilterHdrTwoTone";
import { Marker, Popup } from "react-map-gl";
import "./PointEvent.css";

export default function PointEvent(props) {
	const [showPopup, togglePopup] = useState(false);
	const { event } = props;
	const wrapperRef = useRef(null);

	// close popup when clicked outside to prevent having multiple popups open (TODO: move to a separate function)
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target)
			) {
				togglePopup(false);
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef]);
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
	const calcCords = (val) => {
		if (typeof event.geometry.coordinates[0] === "number") {
			return event.geometry.coordinates[val];
		} else {
			return event.geometry.coordinates[0][val];
		}
	};
	return (
		<div>
			<Marker
				key={event.properties.id}
				latitude={calcCords(1)}
				longitude={calcCords(0)}
			>
				{displayIcon()}
			</Marker>
			{showPopup && (
				<Popup
					latitude={calcCords(1)}
					longitude={calcCords(1)}
					closeButton={true}
					closeOnClick={true}
					onClose={() => togglePopup(false)}
					anchor="top"
				>
					<div ref={wrapperRef}>
						<h3>{event.properties.title}</h3>
					</div>
				</Popup>
			)}
		</div>
	);
}
