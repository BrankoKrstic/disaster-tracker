import { useState, useEffect, useRef } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { lineString, along, lineDistance } from "@turf/turf";
import "./StormMarker.css";
import { Marker } from "react-map-gl";
import calcDirection from "./helpers/calcDirection";

export default function StormMarker(props) {
	const { coordinates } = props;
	const [currentLocation, setCurrentLocation] = useState(coordinates[0]);
	let animationRef = useRef();
	let bearingDataRef = useRef();

	useEffect(() => {
		let arc = [];
		const steps = 3000;
		let startTime;
		let timeStep;
		const line = lineString(coordinates);
		const distance = lineDistance(line);
		// Map out corrdinates for each step animation takes along route. Increase number of steps to make animation slower and smoother.
		for (let i = 0; i < distance; i += distance / steps) {
			arc.push(along(line, i).geometry.coordinates);
		}
		function animate(timeStamp) {
			let oldTimeStep = timeStep;
			timeStep = Math.round(timeStamp - startTime);
			// Make marker turn in the direction of the next step.
			bearingDataRef.current = calcDirection(arc, oldTimeStep, timeStep);
			setCurrentLocation(arc[timeStep] || arc[arc.length - 1]);
			if (timeStep > steps) {
				// Restart animation when over.
				startTime = timeStamp;
			}
			requestAnimationFrame(animate);
		}
		// Execute animation
		animationRef.current = requestAnimationFrame((timeStamp) => {
			startTime = timeStamp;
			animate(timeStamp);
		});
		// Stop animation if storm marker gets unmounted.
		return cancelAnimationFrame(animationRef);
	}, [coordinates]);

	return (
		<Marker longitude={currentLocation[0]} latitude={currentLocation[1]}>
			<ExpandLessIcon
				style={{
					transform: `rotate(${bearingDataRef.current}deg)`,
					fontSize: "3.5rem",
				}}
				className="animated-marker"
				color="primary"
			/>
		</Marker>
	);
}
