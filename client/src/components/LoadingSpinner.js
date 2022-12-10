import React from "react";
import styled from "styled-components";

const SpinnerContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 50vw;
	max-height: 100%;
	max-width: 100%;
`;
const SpinnerOuter = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30px;
	height: 30px;
	border: 4px solid #f3f3f3;
	border-top: 4px solid #3498db;
	border-radius: 50%;
	animation: spin 1s linear infinite;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
const SpinnerInner = styled.div`
	width: 25px;
	height: 25px;
	border: 4px solid #f3f3f3;
	border-top: 4px solid #3498db;
	border-radius: 50%;
	animation: spin 1s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const LoadingSpinner = () => {
	return (
		<SpinnerContainer>
			<SpinnerOuter>
				<SpinnerInner />
			</SpinnerOuter>
		</SpinnerContainer>
	);
};

export default LoadingSpinner;
