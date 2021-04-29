import { useState, useEffect, useRef } from "react";
import NavigationIcon from "@material-ui/icons/Navigation";
import {
	lineString,
	along,
	lineDistance,
	rhumbBearing,
	point,
} from "@turf/turf";
import "./StormMarker.css";
import { Marker } from "react-map-gl";

export default function StormMarker(props) {
	const { coordinates } = props;
	const [currentLocation, setCurrentLocation] = useState(coordinates[0]);
	let animationRef = useRef();
	let bearingDataRef = useRef();
	useEffect(() => {
		let arc = [];
		const steps = 2000;
		let startTime;
		let timeStep;
		let point1;
		let point2;

		const line = lineString(coordinates);
		const distance = lineDistance(line);
		for (let i = 0; i < distance; i += distance / steps) {
			arc.push(along(line, i).geometry.coordinates);
		}
		function animate(timeStamp) {
			let oldTimeStep = timeStep;
			timeStep = Math.round(timeStamp - startTime);

			if (arc[oldTimeStep] && arc[timeStep]) {
				point1 = point(arc[oldTimeStep], {
					"marker-color": "#F00",
				});
				point2 = point(arc[timeStep], {
					"marker-color": "#F00",
				});
				bearingDataRef.current = rhumbBearing(point1, point2);
			}
			setCurrentLocation(arc[timeStep] || arc[arc.length - 1]);
			if (timeStep <= steps) {
				requestAnimationFrame(animate);
			} else {
				startTime = timeStamp;
				requestAnimationFrame(animate);
			}
		}
		animationRef.current = requestAnimationFrame((timeStamp) => {
			startTime = timeStamp;
			animate(timeStamp);
		});
		return cancelAnimationFrame(animationRef);
	}, []);
	return (
		<Marker longitude={currentLocation[0]} latitude={currentLocation[1]}>
			<NavigationIcon
				style={{ transform: `rotate(${bearingDataRef.current}deg)` }}
				className="animated-marker"
				color="primary"
				fontSize="large"
			/>
		</Marker>
	);
}
