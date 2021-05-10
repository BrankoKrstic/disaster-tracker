import { useState, useEffect } from "react";
import dummyStormData from "./seeds/dummyStormData";
import Loader from "./Loader";
import "./App.css";
import Map from "./Map";
import axios from "./request-rules/axios-instance";
import ErrorModal from "./request-rules/ErrorModal";
import findPointEvents from "./helpers/findPointEvents";

function App(props) {
	const [events, setEvents] = useState({});
	const [loadingState, setLoadingState] = useState({
		isLoading: true,
		error: null,
	});
	useEffect(() => {
		let componentMounted = true;
		axios
			.get(`/geojson?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
			.then((res) => {
				// let res2 = await axios.get(`?api_key=${process.env.REACT_APP_NASA_API_KEY}`);
				const wildfires = findPointEvents(res, "wildfires");
				const glaciers = findPointEvents(res, "seaLakeIce");
				const volcanoes = findPointEvents(res, "volcanoes");
				// const storms = res2.data.events.filter((event) => event.categories[0].id === "severeStorms");
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
				setLoadingState({ isLoading: false, error: null });
			})
			.catch((err) => {
				setLoadingState({ isLoading: false, error: err });
			});
	}, []);

	return (
		<div className="App">
			<ErrorModal
				show={loadingState.error}
				modalToggle={() =>
					setLoadingState({ isLoading: false, error: null })
				}
			>
				{loadingState.error &&
					`${loadingState.error.message}. Try again later.`}
			</ErrorModal>
			{loadingState.isLoading ? <Loader /> : <Map {...events} />}
		</div>
	);
}

export default App;
