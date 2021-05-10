import { useEffect, useRef } from "react";
import { Popup } from "react-map-gl";
import "./PopupWindow.css";

export default function PopupWindow(props) {
	const { event, longitude, latitude, togglePopup } = props;
	const wrapperRef = useRef(null);
	useEffect(() => {
		// Listen to clicks outside the popup and close it to prevent having multiple popups open simultaneously
		function handleClickOutside(event) {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target)
			) {
				togglePopup(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef, togglePopup]);
	return (
		<div>
			<Popup
				className="popup"
				latitude={latitude}
				longitude={longitude}
				closeOnClick={true}
				onClose={() => togglePopup(false)}
				anchor="top"
			>
				<div ref={wrapperRef}>
					<h3>{event.properties.title}</h3>
				</div>
			</Popup>
		</div>
	);
}
