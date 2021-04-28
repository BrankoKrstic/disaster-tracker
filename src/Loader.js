import "./Loader.css";

export default function Loader() {
	return (
		<div className="Loader">
			<div className="heading">
				Stand by, Searching for Natural Events
			</div>
			<div className="spinner-box">
				<div className="configure-border-1">
					<div className="configure-core"></div>
				</div>
				<div className="configure-border-2">
					<div className="configure-core"></div>
				</div>
			</div>
		</div>
	);
}
