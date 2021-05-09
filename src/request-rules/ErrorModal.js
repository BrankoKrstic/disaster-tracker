import "./ErrorModal.css";

export default function ErrorModal(props) {
	return (
		<>
			{props.show ? (
				<div
					className="ErrorBackdrop"
					onClick={props.modalToggle}
				></div>
			) : null}
			<div
				className="ErrorModal"
				style={{
					transform: props.show
						? "translateY(0)"
						: "translateY(-100vh)",
					opacity: props.show ? "1" : "0",
				}}
			>
				{props.children}
			</div>
		</>
	);
}
