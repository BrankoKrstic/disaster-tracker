import WhatshotIcon from "@material-ui/icons/Whatshot";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import FilterHdrTwoToneIcon from "@material-ui/icons/FilterHdrTwoTone";

const displayIcon = (event, togglePopup) => {
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

export default displayIcon;
