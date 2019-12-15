import React, { useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const ToggleComponenet = React.forwardRef((props, ref) => {
	const [visisble, setVisible] = useState(false);

	const hideStyle = { display: visisble ? "none" : "" };
	const showStyle = { display: visisble ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visisble);
	}

	if (ref !== null) {
		useImperativeHandle(ref, function () {
			return {
				toggleVisibility
			};
		});
	}

	return (
		<div className="toggle">
			<div style={hideStyle}>
				<button onClick={toggleVisibility}>
					{props.clickToShowText}
				</button>
			</div>
			<div style={showStyle}>
				{props.children}
				<button onClick={toggleVisibility}>
					{props.clickToHideText}
				</button>
			</div>
		</div>
	)
});

ToggleComponenet.propTypes = {
	clickToHideText: PropTypes.string.isRequired,
	clickToShowText: PropTypes.string.isRequired
}

export default ToggleComponenet;