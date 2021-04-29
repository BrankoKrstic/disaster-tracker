import { useState, useEffect, useRef } from "react";
import { lineString, along, lineDistance } from "@turf/turf";
import "./StormMarker.css";
import { Marker } from "react-map-gl";

export default function StormMarker(props) {
	const { coordinates } = props;
	const [currentLocation, setCurrentLocation] = useState(coordinates[0]);
	let animationRef = useRef();
	useEffect(() => {
		let arc = [];
		const steps = 10000;
		let startTime;
		const line = lineString(coordinates);
		const distance = lineDistance(line);
		for (let i = 0; i < distance; i += distance / steps) {
			arc.push(along(line, i).geometry.coordinates);
		}
		function animate(timeStamp) {
			const timeStep = Math.round(timeStamp - startTime);
			setCurrentLocation(arc[timeStep] || arc[arc.length - 1]);
			console.log(currentLocation);
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
			<div className="animated-marker"></div>
		</Marker>
	);
}
