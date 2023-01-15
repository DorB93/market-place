import React, { useEffect, useState } from "react";

import ErrorAlert from "../ErrorAlert";
import { updateUser } from "./MyInfo";
import {
	Form,
	InputContainer,
	SubmitBtn,
	PageContainer,
} from "../StyleComponents";
import { useUser } from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner";

function MyAddress({ user }) {
	const { setLogin } = useUser();
	const [state, setState] = useState(null);
	const [city, setCity] = useState(null);
	const [street, setStreet] = useState(null);
	const [streetNum, setStreetNum] = useState(null);
	const [postCode, setPostCode] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (user.shippingAddress) {
			setState(user.shippingAddress.state);
			setCity(user.shippingAddress.city);
			setStreet(user.shippingAddress.street);
			setStreetNum(user.shippingAddress.streetNum);
			setPostCode(user.shippingAddress.postCode);
		}
		setIsLoading(false);
	}, [user]);

	async function handleSubmitAddress(e) {
		e.preventDefault();
		setErrorMessage(null);
		setIsLoading(true);
		const shippingAddress = {
			state,
			city,
			street,
			streetNum,
			postCode,
		};
		try {
			const updatedUser = await updateUser({ shippingAddress });
			await setTimeout(() => {}, 10000);
			setLogin(updatedUser.data.user);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			setErrorMessage(err.message);
		}
	}
	return (
		<PageContainer>
			{errorMessage && <ErrorAlert message={errorMessage} />}
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<Form onSubmit={handleSubmitAddress}>
						<h2>Your Address</h2>
						<InputContainer
							size='small'
							id='state'
							label='State:'
							onChange={(e) => {
								setState(e.target.value);
							}}
							required
							type='text'
							defaultValue={state}
						/>

						<InputContainer
							size='small'
							type='text'
							id='city'
							required
							onChange={(e) => {
								setCity(e.target.value);
							}}
							defaultValue={city}
							label='City:'
						/>

						<InputContainer
							size='small'
							id='street'
							label='Street:'
							defaultValue={street}
							required
							onChange={(e) => {
								setStreet(e.target.value);
							}}
						/>

						<InputContainer
							size='small'
							id='streetNum'
							label='StreetNum:'
							required
							onChange={(e) => {
								setStreetNum(e.target.value);
							}}
							defaultValue={streetNum}
							type='number'
						/>

						<InputContainer
							size='small'
							id='zipCode'
							label='Post Code:'
							required
							onChange={(e) => {
								setPostCode(e.target.value);
							}}
							defaultValue={postCode}
						/>

						<SubmitBtn type='submit'>Update Me</SubmitBtn>
					</Form>
				</>
			)}
		</PageContainer>
	);
}

export default MyAddress;
