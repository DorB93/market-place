import React, { useState } from "react";
import { API_URL } from "../helper";
import { SubmitBtn } from "../pages/Login";
import { Form, InputContainer, PageContainer } from "../pages/Signup";
import ErrorAlert from "./ErrorAlert";

async function changePassword(data) {
	return fetch(`${API_URL}users/updateMyPassword`, {
		method: "PATCH",
		credentials: true,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((data) => data.json());
}

function UpdateMyPassword() {
	const [error, setError] = useState(null);
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		setError(null);
		const passwordData = {
			password,
			newPassword,
			newPasswordConfirm,
		};
		const user = await changePassword(passwordData);
		if (user.status === "success") {
			alert("Success!");
		} else {
			setError(user.message);
		}
	}

	return (
		<PageContainer>
			{error && <ErrorAlert message={error} />}
			<Form onSubmit={handleSubmit}>
				<h3>Update Your Password</h3>
				<InputContainer>
					<label for='password'>Current Password:</label>
					<input
						minLength={8}
						placeholder='shh-secret'
						type='password'
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label for='password'>Password:</label>
					<input
						minLength={8}
						placeholder='shh-secret'
						type='password'
						onChange={(e) => {
							setNewPassword(e.target.value);
						}}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label for='passwordConfirm'>Password Confirm:</label>
					<input
						placeholder='shh-secret'
						type='password'
						onChange={(e) => {
							setNewPasswordConfirm(e.target.value);
						}}
						required
					/>
				</InputContainer>
				<SubmitBtn type='submit'>Update</SubmitBtn>
			</Form>
		</PageContainer>
	);
}

export default UpdateMyPassword;
