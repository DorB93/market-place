import React, { useState } from "react";

import { AlertFragment, SuccessContainer } from "./StyleComponents";

function SuccessAlert({ message }) {
	const [showAlert, setShowAlert] = useState(true);

	if (!showAlert) {
		return null;
	}
	setTimeout(() => {
		setShowAlert(false);
	}, 6000);

	return (
		<AlertFragment>
			<SuccessContainer>{message}</SuccessContainer>
		</AlertFragment>
	);
}

export default SuccessAlert;
