import React, { useState } from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import { API_URL } from "../helper";
import { SubmitBtn } from "../pages/Login";
import { Form, InputContainer } from "../pages/Signup";
import ErrorAlert from "./ErrorAlert";
import myAxios from "../api";

const InfoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 30px;
`;

async function updateUser(userData) {
	// TODO - fix BUG - cookie not send to server
	// return fetch(`${API_URL}users/updateMe`, {
	// 	method: "POST",
	// 	credentials: true,
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// 	body: JSON.stringify(data),
	// }).then((data) => data.json());
	try {
		return myAxios.post("/users/updateMe", userData).then((res) => res.data);
	} catch (err) {
		console.log(err.message);
	}
}

function MyInfo() {
	const { user, setLogin } = useUser();
	const [name, setName] = useState(user.username);
	const [email, setEmail] = useState(user.userEmail);
	const [photo, setPhoto] = useState(null);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		const updatedData = {};
		if (name !== user.username) {
			updatedData.name = name;
		}
		if (email !== user.userEmail) {
			updatedData.email = email;
		}
		if (photo) {
			updatedData.photo = photo;
		}
		if (Object.entries(updatedData).length) {
			const updatedUser = await updateUser(user.id, {
				...updatedData,
			});
			if (updatedUser.status === "success") {
				setLogin(updatedUser.data);
			} else {
				setError(updatedUser.message);
			}
		}
	};

	return (
		<InfoContainer>
			{error && <ErrorAlert message={error} />}
			<Form onSubmit={handleSubmit}>
				<h2>Your Information</h2>
				<InputContainer>
					<label for='name'>Full Name:</label>
					<input
						placeholder='Enter your full name'
						type='text'
						onChange={(e) => {
							setName(e.target.value);
						}}
						value={name}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label for='email'>Email:</label>
					<input
						placeholder='yourmail@example.com'
						type='email'
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label for='image'>Choose new photo </label>
					<input
						type='file'
						onChange={(e) => {
							setPhoto(e.target.files[0]);
						}}
						name='photo'
						accept='image/*'
					/>
				</InputContainer>
				<SubmitBtn type='submit'>Update Me</SubmitBtn>
			</Form>
		</InfoContainer>
	);
}

export default MyInfo;
