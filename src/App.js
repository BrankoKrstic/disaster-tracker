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
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		axios
			.get(
				`https://eonet.sci.gsfc.nasa.gov/api/v3/events?api_key=${process.env.REACT_APP_NASA_API_KEY}`
			)
			.then((res) => {
				const wildfires = res.data.events.filter(
					(event) => event.categories[0].id === "wildfires"
				);
				const ice = res.data.events.filter(
					(event) => event.categories[0].id === "seaLakeIce"
				);
				const volcanoes = res.data.events.filter(
					(event) => event.categories[0].id === "volcanoes"
				);
				const storms = res.data.events.filter(
					(event) => event.categories[0].id === "severeStorms"
				);
				setEvents({
					wildfires: wildfires,
					ice: ice,
					volcanoes: volcanoes,
					storms: storms,
				});
				setIsLoading(false);
			});
	}, []);
	return (
		<div className="App">
			{isLoading ? <Loader /> : <Map {...events} />}
		</div>
	);
}

export default App;
