import { useState, useEffect } from "react";
import "./App.css";
import Map from "./Map";
import axios from "axios";

function App() {
	const [events, setEvents] = useState([]);
	useEffect(() => {
		axios
			.get(
				`https://eonet.sci.gsfc.nasa.gov/api/v3/events?api_key=${process.env.REACT_APP_NASA_API_KEY}`
			)
			.then((res) => {
				const wildfires = res.data.events.filter(
					(event) => event.categories[0].id === "wildfires"
				);
				setEvents(wildfires);
			});
	}, []);
	return (
		<div className="App">
			<Map events={events} />
		</div>
	);
}

export default App;
