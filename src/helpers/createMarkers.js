import PointEvent from "../PointEvent";

const createMarkers = (eventType) => {
	if (eventType) {
		return eventType.map((e, i) => (
			<PointEvent event={e} key={e.properties.id + i} />
		));
	}
	return null;
};

export default createMarkers;
