import React, { useState } from "react";
import styled from "styled-components";
import { useUser } from "../../context/UserContext";
// import { API_URL } from "../helper";
import { SubmitBtn } from "../../pages/Login";
import { Form, InputContainer } from "../../pages/Signup";
import MessageAlert from "../MessageAlert";
import myAxios from "../../api";

export const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
	width: 100%;
	padding: 30px;
`;

const ImageInputContainer = styled(InputContainer)`
	& img {
		height: 100px;
		width: 100px;
		border-radius: 50%;
	}
`;

export async function updateUser(userData) {
	try {
		const res = await myAxios.patch("/users/updateMe", userData);
		return res.data;
	} catch (err) {
		console.error(err);
		throw new Error(err.message);
	}
}

function MyInfo({ user }) {
	const { setLogin } = useUser();
	const [name, setName] = useState(user.username);
	const [email, setEmail] = useState(user.userEmail);
	const [photo, setPhoto] = useState(null);
	const [message, setMessage] = useState(null);
	const [alertType, setAlertType] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(null);
		const formData = new FormData();
		if (name !== user.username) {
			formData.append("name", name);
		}
		if (email !== user.userEmail) {
			formData.append("email", email);
		}
		if (photo) {
			formData.append("photo", photo);
		}
		try {
			const updatedUser = await updateUser(formData);
			if (updatedUser.status === "success") {
				console.log({ updatedUser });
				await setTimeout(() => {
					console.log("waiting...");
				}, 10000);
				setLogin(updatedUser.data.user);
			} else {
				setAlertType(updatedUser.status);
				setMessage(updatedUser.message);
			}
		} catch (err) {
			setAlertType("error");
			setMessage(err.message);
		}
	};

	return (
		<InfoContainer>
			{message && <MessageAlert message={message} type={alertType} />}
			<Form onSubmit={handleSubmit}>
				<h2>Your Information</h2>
				<InputContainer>
					<label htmlFor='name'>Full Name:</label>
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
					<label htmlFor='email'>Email:</label>
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
				<ImageInputContainer>
					<label htmlFor='image'>
						<img src={`/img/users/${user.userPhoto}`} alt='user-avatar' />
					</label>
					<input
						type='file'
						onChange={(e) => {
							console.log(e);
							setPhoto(e.target.files[0]);
						}}
						name='photo'
						accept='image/*'
					/>
				</ImageInputContainer>
				<SubmitBtn type='submit'>Update Me</SubmitBtn>
			</Form>
		</InfoContainer>
	);
}

export default MyInfo;
