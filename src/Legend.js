import { useState } from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import FilterHdrTwoToneIcon from "@material-ui/icons/FilterHdrTwoTone";

export default function Legend() {
	const [openPopover, setOpenPopover] = useState(false);
	return (
		<div>
			<Button
				style={{
					position: "absolute",
					zIndex: 50,
					top: "1rem",
					right: "1rem",
				}}
				size="large"
				variant="contained"
				onClick={() => setOpenPopover(true)}
			>
				Legend
			</Button>
			<Popover
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={openPopover}
				onClose={() => setOpenPopover(false)}
			>
				<List aria-label="icon legend">
					<ListItem style={{ marginRight: "2rem" }}>
						<ListItemIcon>
							<WhatshotIcon
								style={{ color: "#d51111" }}
								fontSize="large"
							/>
						</ListItemIcon>
						<ListItemText primary="Wildfires" />
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<FilterHdrTwoToneIcon
								fontSize="large"
								style={{ color: "#d56600" }}
							/>
						</ListItemIcon>
						<ListItemText primary="Volcanoes" />
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<AcUnitIcon
								fontSize="large"
								style={{ color: "#35baf6" }}
							/>
						</ListItemIcon>
						<ListItemText primary="Glaciers" />
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<ExpandLessIcon
								color="primary"
								style={{
									transform: "rotate(90deg)",
									fontSize: "3rem",
								}}
							/>
						</ListItemIcon>
						<ListItemText primary="Storms" />
					</ListItem>
				</List>
			</Popover>
		</div>
	);
}
