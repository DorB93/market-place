import React, { useEffect, useState } from "react";

import MessageAlert from "../MessageAlert";
import { InfoContainer, updateUser } from "./MyInfo";
import { Form, InputContainer } from "../../pages/Signup";
import { useUser } from "../../context/UserContext";
import { SubmitBtn } from "../../pages/Login";
function MyAddress({ user }) {
	const { setLogin } = useUser();
	const [state, setState] = useState(null);
	const [city, setCity] = useState(null);
	const [street, setStreet] = useState(null);
	const [streetNum, setStreetNum] = useState(null);
	const [zipCode, setZipCode] = useState(null);
	const [message, setMessage] = useState(null);
	const [alertType, setAlertType] = useState(null);

	useEffect(() => {
		console.log(user);
		if (user.shippingAddress) {
			setState(user.shippingAddress.state);
			setCity(user.shippingAddress.city);
			setStreet(user.shippingAddress.street);
			setStreetNum(user.shippingAddress.streetNum);
			setZipCode(user.shippingAddress.zipCode);
		}
	}, [user]);

	async function handleSubmitAddress(e) {
		e.preventDefault();
		setMessage(null);
		const shippingAddress = {
			state,
			city,
			street,
			streetNum,
			zipCode,
		};
		try {
			const updatedUser = await updateUser({ shippingAddress });
			await setTimeout(() => {
				console.log("waiting...");
			}, 10000);
			setLogin(updatedUser.data.user);
		} catch (err) {
			setAlertType("error");
			setMessage(err.message);
		}
	}
	return (
		<InfoContainer>
			{message && <MessageAlert message={message} type={alertType} />}
			<Form onSubmit={handleSubmitAddress}>
				<h2>Your Information</h2>
				<InputContainer>
					<label htmlFor='state' name='state'>
						State:
					</label>
					<input
						placeholder={state || "Israel"}
						type='text'
						required
						onChange={(e) => {
							setState(e.target.value);
						}}
						value={state}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='city' name='city'>
						City:
					</label>
					<input
						placeholder={city || "Tel-Aviv"}
						type='city'
						required
						onChange={(e) => {
							setCity(e.target.value);
						}}
						value={city}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='street' name='street'>
						Street:
					</label>
					<input
						placeholder={`${street}`}
						type='street'
						required
						onChange={(e) => {
							setStreet(e.target.value);
						}}
						value={street}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='streetNum' name='streetNum'>
						StreetNum:
					</label>
					<input
						placeholder='32'
						type='number'
						required
						onChange={(e) => {
							setStreetNum(e.target.value);
						}}
						value={streetNum}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='zipCode' name='zipCode'>
						Zip Code:
					</label>
					<input
						placeholder='12345678'
						type='test'
						required
						onChange={(e) => {
							setZipCode(e.target.value);
						}}
						value={zipCode}
					/>
				</InputContainer>
				<SubmitBtn type='submit'>Update Me</SubmitBtn>
			</Form>
		</InfoContainer>
	);
}

export default MyAddress;
