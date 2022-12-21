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
const ErrorContainer = styled.h4`
	background-color: ${(props) => props.backColor};
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

function ErrorAlert({ message, type }) {
	const [showAlert, setShowAlert] = useState(true);
	const [color, setColor] = useState("red");

	if (type === "success") {
		setColor("green");
	} else {
		setColor("red");
	}

	if (!showAlert) {
		return null;
	}
	setTimeout(() => {
		setShowAlert(false);
	}, 6000);

	return (
		<ErrorFragment>
			<ErrorContainer backColor={color}> {message} </ErrorContainer>
		</ErrorFragment>
	);
}

export default ErrorAlert;
