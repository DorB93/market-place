import React, { useState } from "react";
import styled from "styled-components";

const ErrorFragment = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const ErrorContainer = styled.div`
	background-color: red;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	width: 30%;
	max-width: 300px;
	min-width: 150px;
	font-weight: bold;
	border-radius: 10px;
	border: 0;
	z-index: 4;
`;

function ErrorAlert({ message }) {
	const [showAlert, setShowAlert] = useState(true);

	if (!showAlert) {
		return null;
	}
	setTimeout(() => {
		setShowAlert(false);
	}, 6000);

	return (
		<ErrorFragment>
			<ErrorContainer> {message} </ErrorContainer>
		</ErrorFragment>
	);
}

export default ErrorAlert;
