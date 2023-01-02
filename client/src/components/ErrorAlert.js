import React, { useState } from "react";
import styled from "styled-components";

export const AlertFragment = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const AlertContainer = styled.h4`
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
	text-align: center;
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
		<AlertFragment>
			<AlertContainer> {message} </AlertContainer>
		</AlertFragment>
	);
}

export default ErrorAlert;
