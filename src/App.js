import { useState, useEffect } from "react";
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
			let res2 = await axios.get(
				`https://eonet.sci.gsfc.nasa.gov/api/v3/events?api_key=${process.env.REACT_APP_NASA_API_KEY}`
			);
			const pointEvents = res.data.features.filter(
				(event) =>
					["wildfires", "seaLakeIce", "volcanoes"].includes(
						event.properties.categories[0].id
					) && typeof event.geometry.coordinates[0] === "number" //only represent point events with icons
			);
			const storms = res2.data.events.filter(
				(event) => event.categories[0].id === "severeStorms"
			);
			console.log(storms);
			if (componentMounted) {
				setEvents({
					pointEvents: pointEvents,
					storms: storms,
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
