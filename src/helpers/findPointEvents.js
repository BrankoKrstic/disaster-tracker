const findPointEvents = (res, eventType) => {
	return res.data.features.filter(
		(event) =>
			event.properties.categories[0].id === eventType &&
			typeof event.geometry.coordinates[0] === "number" //only represent point events with icons
	);
};

export default findPointEvents;
