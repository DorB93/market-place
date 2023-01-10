import React, { useState } from "react";

import { useUser } from "../../context/UserContext";

import {
	Form,
	SubmitBtn,
	PreviewContainer,
	InputContainer,
	PageContainer,
} from "../StyleComponents";
import ErrorAlert from "../ErrorAlert";
import myAxios from "../../api";
import { Avatar, CssBaseline } from "@mui/material";

export async function updateUser(userData) {
	try {
		const res = await myAxios.patch("/users/updateMe", userData);
		return res.data;
	} catch (err) {
		throw new Error(err.message);
	}
}

function MyInfo({ user }) {
	const { setLogin } = useUser();
	const [name, setName] = useState(user.username);
	const [email, setEmail] = useState(user.userEmail);
	const [photo, setPhoto] = useState(null);
	const [preview, setPreview] = useState(null);
	const [message, setMessage] = useState(null);

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
				await setTimeout(() => {
					console.log("waiting...");
				}, 10000);
				setLogin(updatedUser.data.user);
			}
		} catch (err) {
			setMessage(err.message);
		}
	};

	return (
		<PageContainer>
			{message && <ErrorAlert message={message} />}
			<Form onSubmit={handleSubmit}>
				<h2>Your Information</h2>
				<InputContainer
					size='small'
					id='fullName'
					label='Full Name:'
					onChange={(e) => {
						setName(e.target.value);
					}}
					defaultValue={name}
				/>
				<InputContainer
					size='small'
					type='email'
					id='email'
					label='Email:'
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					defaultValue={email}
				/>
				<SubmitBtn component='label'>
					Upload New Image
					<input
						type='file'
						onChange={(e) => {
							const file = e.target.files[0];
							setPhoto(file);
							const reader = new FileReader();
							reader.readAsDataURL(file);
							reader.onloadend = () => {
								setPreview(reader.result);
							};
						}}
						name='photo'
						accept='image/*'
						hidden
					/>
				</SubmitBtn>
				{preview ? (
					<PreviewContainer>
						<Avatar
							sx={{ width: 56, height: 56 }}
							src={preview}
							alt='Preview'
						/>
					</PreviewContainer>
				) : (
					<span>No image selected</span>
				)}
				<SubmitBtn type='submit'>Update Me</SubmitBtn>
			</Form>
		</PageContainer>
	);
}

export default MyInfo;
