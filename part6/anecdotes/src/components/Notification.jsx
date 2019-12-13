import React from "react";
import { create, reset } from "../reducers/notificationReducer";

const Notification = ({ store }) => {
	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1
	};

	const { notification } = store.getState();

	if (notification !== null) {
		return (
			<div style={style}>
				{notification}
			</div>
		);
	} else {
		return <></>;
	}

};

export default Notification;

export const createNotification = (store, message) => {
	store.dispatch(create(message));
	setTimeout(() => store.dispatch(reset()), 5000);
}