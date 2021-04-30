import { Source, Layer } from "react-map-gl";
import StormMarker from "./StormMarker";

//Function accepts GeoJSON from NASA API and draws lines on the map. Not used in final version of the app.

export default function StormLine(props) {
	const { event } = props;
	const geodata = event.geometry.map((data) => data.coordinates);
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
			"line-width": 0,
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
