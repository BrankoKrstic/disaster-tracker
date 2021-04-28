import { useState, useEffect } from "react";
import Loader from "./Loader";
import "./App.css";
import Map from "./Map";
import axios from "axios";

function App() {
	const [events, setEvents] = useState({
		storms: [],
		volcanoes: [],
		ice: [],
		wildfires: [],
	});

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		let componentMounted = true;
		async function getData() {
			let res = await axios.get(
				`https://eonet.sci.gsfc.nasa.gov/api/v3/events?api_key=${process.env.REACT_APP_NASA_API_KEY}`
			);
			const wildfires = res.data.events.filter(
				(event) => event.categories[0].id === "wildfires"
			);
			const ice = res.data.events.filter(
				(event) => event.categories[0].id === "seaLakeIce"
			);
			const volcanoes = res.data.events.filter(
				(event) =>
					event.categories[0].id === "volcanoes" &&
					typeof event.geometry[0].coordinates[0] === "number"
			);
			const storms = res.data.events.filter(
				(event) => event.categories[0].id === "severeStorms"
			);
			if (componentMounted) {
				setEvents({
					wildfires: wildfires,
					ice: ice,
					volcanoes: volcanoes,
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
