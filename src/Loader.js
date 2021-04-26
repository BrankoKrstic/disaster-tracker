import "./Loader.css";

export default function Loader() {
	return (
		<div className="Loader">
			<div className="heading">Stand by, Searching for Disasters</div>
			<div class="spinner-box">
				<div class="configure-border-1">
					<div class="configure-core"></div>
				</div>
				<div class="configure-border-2">
					<div class="configure-core"></div>
				</div>
			</div>
		</div>
	);
}
