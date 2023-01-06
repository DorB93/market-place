import React, { useState } from "react";
import { AlertContainer, AlertFragment } from "./StyleComponents";

function ErrorAlert({ message }) {
	const [showAlert, setShowAlert] = useState(true);

	if (!showAlert) {
		return null;
	}
	setTimeout(() => {
		setShowAlert(false);
	}, 6000);

	return (
		<AlertFragment>
			<AlertContainer> {message} </AlertContainer>
		</AlertFragment>
	);
}

export default ErrorAlert;
