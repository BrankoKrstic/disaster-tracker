import { useState, useEffect, useRef } from "react";
import WhatshotTwoToneIcon from "@material-ui/icons/WhatshotTwoTone";
import { Marker, Popup } from "react-map-gl";
import "./Markers.css";

export default function Markers(props) {
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

	return (
		<div>
			<Marker
				key={event.id}
				latitude={event.geometry[0].coordinates[1]}
				longitude={event.geometry[0].coordinates[0]}
			>
				<WhatshotTwoToneIcon
					className="Marker"
					style={{ color: "#d51111", cursor: "pointer" }}
					fontSize="large"
					onClick={() => togglePopup(true)}
				/>
			</Marker>
			{showPopup && (
				<Popup
					latitude={event.geometry[0].coordinates[1]}
					longitude={event.geometry[0].coordinates[0]}
					closeButton={true}
					closeOnClick={true}
					onClose={() => togglePopup(false)}
					anchor="top"
				>
					<div ref={wrapperRef}>
						<h3>{event.title}</h3>
					</div>
				</Popup>
			)}
		</div>
	);
}
