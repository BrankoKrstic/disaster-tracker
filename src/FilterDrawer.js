import { useState } from "react";
import "./FilterDrawer.css";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function FilterDrawer(props) {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { eventsToDisplay, setEventsToDisplay } = props;
	const handleChange = (event) => {
		setEventsToDisplay({
			...eventsToDisplay,
			[event.target.name]: event.target.checked,
		});
	};
	return (
		<div>
			{!drawerOpen && (
				<Button
					style={{
						position: "absolute",
						zIndex: 10,
						top: "1rem",
						left: "1rem",
					}}
					variant="contained"
					onClick={() => setDrawerOpen(true)}
				>
					Filter
				</Button>
			)}
			<Drawer
				anchor="left"
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
			>
				<div className="drawerHeader">
					<IconButton onClick={() => setDrawerOpen(false)}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<FormControl component="fieldset">
					<FormGroup className="form">
						{["Wildfires", "Volcanoes", "Glaciers", "Storms"].map(
							(event, i) => (
								<FormControlLabel
									control={
										<Switch
											checked={eventsToDisplay[event]}
											color="primary"
											name={event}
											onChange={handleChange}
										/>
									}
									label={event}
								/>
							)
						)}
					</FormGroup>
				</FormControl>
			</Drawer>
		</div>
	);
}
