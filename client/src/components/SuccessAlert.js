import React, { useState } from "react";
import styled from "styled-components";
import { AlertFragment, AlertContainer } from "./ErrorAlert";

const SuccessContainer = styled(AlertContainer)`
	background-color: green;
	font-weight: normal;
`;
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
