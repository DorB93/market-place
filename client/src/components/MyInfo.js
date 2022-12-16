import React, { useState } from "react";

import styled from "styled-components";
import { useUser } from "../context/UserContext";
import { SubmitBtn } from "../pages/Login";
import { Form, InputContainer } from "../pages/Signup";

const InfoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 30px;
`;

async function updateUser(data) {
	return fetch("http://127.0.0.1:4000/api/v1/users/updateMe", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((data) => data.json());
}

function MyInfo() {
	const { user, setLogin } = useUser();
	const [name, setName] = useState(user.username);
	const [email, setEmail] = useState(user.userEmail);
	const [photo, setPhoto] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
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
			}
		}
	};

	return (
		<InfoContainer>
			<Form onSubmit={handleSubmit}>
				<h2>Your Information</h2>
				<InputContainer>
					<label for='name'>Full Name:</label>
					<input
						id='name'
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
						id='email'
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
						id='photo'
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
