import React from "react";
import { connect } from "react-redux";

import { Message } from "semantic-ui-react";

const Notification = props => {
	const { notification } = props;
	if (notification === null) {
		return <></>;
	} else if (notification.category === "success") {
		return <Message success>{notification.message}</Message>
	} else if (notification.category === "error") {
		return <Message error>{notification.message}</Message>
	} else {
		return <Message>{notification.message}</Message>
	}
};

const mapStateToProps = state => ({
	notification: state.notification
});

export default connect(mapStateToProps)(Notification);