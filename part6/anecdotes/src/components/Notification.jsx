import React from "react";

const Notification = props => {
	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1
	};
	return (
		<div style={style}>
			{props.message}
		</div>
	);
};

export default Notification;