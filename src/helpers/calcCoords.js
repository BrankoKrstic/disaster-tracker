const calcCoords = (event, val) => {
	if (typeof event.geometry.coordinates[0] === "number") {
		return event.geometry.coordinates[val];
	} else {
		return event.geometry.coordinates[0][val];
	}
};

export default calcCoords;
