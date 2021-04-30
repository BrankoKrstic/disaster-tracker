import { Source, Layer } from "react-map-gl";
import StormMarker from "./StormMarker";

export default function StormLine(props) {
	const { event } = props;
	//extract pure coordinates data from the storm event and pass it to Source to draw storm line
	// Current version using seeded data. To use real API data, switch the line below to "const geodata = event.geometry.map((data) => data.coordinates);" and request the api in App.js
	const geodata = event.geometry.coordinates;
	const geojson = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				properties: {
					stroke: "#f06292",
					"stroke-width": 15,
					"stroke-opacity": 1,
					"line-join": "round",
					"line-cap": "round",
				},
				geometry: {
					type: "LineString",
					coordinates: geodata,
				},
			},
		],
	};
	// configs to shape the line
	const parkLayer = {
		id: event.id,
		type: "line",
		source: event.id,
		layout: {
			"line-cap": "round",
			"line-join": "round",
		},
		paint: {
			"line-color": "#8fa",
			"line-width": 2,
			"line-opacity": 0.8,
		},
	};
	return (
		<div>
			<Source id={event.id} type="geojson" data={geojson}>
				<Layer {...parkLayer} />
			</Source>
			<StormMarker coordinates={geodata} />
		</div>
	);
}
