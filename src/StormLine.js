import { Source, Layer } from "react-map-gl";

const parkLayer = {
	id: "line",
	type: "line",
	source: "line",
	layout: {
		"line-cap": "round",
		"line-join": "round",
	},
	paint: {
		"line-color": "#8fa",
		"line-width": 10,
		"line-opacity": 0.8,
	},
};

// const geojson = {
// 	type: "FeatureCollection",
// 	features: [
// 		{
// 			type: "Feature",
// 			properties: {
// 				stroke: "#f06292",
// 				"stroke-width": 15,
// 				"stroke-opacity": 1,
// 				"line-join": "round",
// 				"line-cap": "round",
// 			},
// 			geometry: {
// 				type: "LineString",
// 				coordinates: [
// 					[-122.48369693756104, 37.83381888486939],
// 					[-122.48348236083984, 37.83317489144141],
// 					[-122.48339653015138, 37.83270036637107],
// 					[-122.483696, 37.833818],
// 					[-122.483482, 37.833174],
// 					[-122.483396, 37.8327],
// 					[-122.483568, 37.832056],
// 					[-122.48404, 37.831141],
// 					[-122.48404, 37.830497],
// 					[-122.483482, 37.82992],
// 					[-122.483568, 37.829548],
// 					[-122.48507, 37.829446],
// 					[-122.4861, 37.828802],
// 					[-122.486958, 37.82931],
// 					[-122.487001, 37.830802],
// 					[-122.487516, 37.831683],
// 					[-122.488031, 37.832158],
// 					[-122.488889, 37.832971],
// 					[-122.489876, 37.832632],
// 					[-122.490434, 37.832937],
// 					[-122.49125, 37.832429],
// 					[-122.491636, 37.832564],
// 					[-122.492237, 37.833378],
// 					[-122.493782, 37.833683],
// 				],
// 			},
// 		},
// 	],
// };

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
	return (
		<div>
			<Source id="line" type="geojson" data={geojson}>
				<Layer {...parkLayer} />
			</Source>
		</div>
	);
}
