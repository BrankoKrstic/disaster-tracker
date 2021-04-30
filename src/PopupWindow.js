import { useEffect, useRef } from "react";
import { Popup } from "react-map-gl";

export default function PopupWindow(props) {
	const { event, longitude, latitude, togglePopup } = props;
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
	}, [wrapperRef, togglePopup]);
	return (
		<div>
			<Popup
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
