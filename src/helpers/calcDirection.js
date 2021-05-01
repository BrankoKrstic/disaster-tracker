import { rhumbBearing, point } from "@turf/turf";

const calcDirection = (arc, oldTimeStep, timeStep) => {
	if (arc[oldTimeStep] && arc[timeStep]) {
		let point1 = point(arc[oldTimeStep], {
			"marker-color": "#F00",
		});
		let point2 = point(arc[timeStep], {
			"marker-color": "#F00",
		});
		return rhumbBearing(point1, point2);
	}
};

export default calcDirection;
