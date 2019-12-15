import React from "react";
import { connect } from "react-redux";

const Notification = props => {
	const { notification } = props;
	if (notification === null) {
		return <></>;
	} else {
		return <div className={notification.category}>{notification.message}</div>
	}
};

const mapStateToProps = state => ({
	notification: state.notification
});

export default connect(mapStateToProps)(Notification);