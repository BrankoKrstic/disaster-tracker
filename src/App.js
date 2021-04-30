import { useState, useEffect } from "react";
import dummyStormData from "./placeholderData/dummyStormData";
import Loader from "./Loader";
import "./App.css";
import Map from "./Map";
import axios from "axios";

function App() {
	const [events, setEvents] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	// TODO: move to separate function
	useEffect(() => {
		let componentMounted = true;
		async function getData() {
			let res = await axios.get(
				`https://eonet.sci.gsfc.nasa.gov/api/v3/events/geojson?api_key=${process.env.REACT_APP_NASA_API_KEY}`
			);
			// let res2 = await axios.get(
			// 	`https://eonet.sci.gsfc.nasa.gov/api/v3/events?api_key=${process.env.REACT_APP_NASA_API_KEY}`
			// );
			const wildfires = res.data.features.filter(
				(event) =>
					event.properties.categories[0].id === "wildfires" &&
					typeof event.geometry.coordinates[0] === "number" //only represent point events with icons
			);
			const glaciers = res.data.features.filter(
				(event) =>
					event.properties.categories[0].id === "seaLakeIce" &&
					typeof event.geometry.coordinates[0] === "number" //only represent point events with icons
			);
			const volcanoes = res.data.features.filter(
				(event) =>
					event.properties.categories[0].id === "volcanoes" &&
					typeof event.geometry.coordinates[0] === "number" //only represent point events with icons
			);
			// const storms = res2.data.events.filter(
			// 	(event) => event.categories[0].id === "severeStorms"
			// );
			if (componentMounted) {
				setEvents({
					volcanoes: volcanoes,
					wildfires: wildfires,
					glaciers: glaciers,
					// Using seeded storm data for demonstration purposes.
					// Uncomment the lines above and change the lne below to "storms: storms" to  pull real data from the NASA API.
					// Also requires mapping data correctly in Map.js to work with the API.
					storms: dummyStormData.features,
				});
			}
			setIsLoading(false);
		}
		getData();
		return () => (componentMounted = false);
	}, []);

	return (
		<div className="App">
			{isLoading ? <Loader /> : <Map {...events} />}
		</div>
	);
}

export default App;
