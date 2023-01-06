import React, { useState } from "react";
import myAxios from "../../api";
import {
	Form,
	SubmitBtn,
	InputContainer,
	PageContainer,
} from "../StyleComponents";
import ErrorAlert from "../ErrorAlert";
import LoadingSpinner from "../LoadingSpinner";
import SuccessAlert from "../SuccessAlert";

async function changePassword(data) {
	return myAxios
		.patch("users/updateMyPassword", data)
		.then((res) => [res.data.data._doc, res.status]);
}

function UpdateMyPassword() {
	const [errorMessage, setErrorMessage] = useState(null);
	const [okMessage, setOkMessage] = useState(null);
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e) {
		try {
			e.preventDefault();
			setErrorMessage(null);
			setOkMessage(null);
			setIsLoading(true);
			const passwordData = {
				password,
				newPassword,
				newPasswordConfirm,
			};
			const [user, status] = await changePassword(passwordData);
			if (status === 200) {
				setOkMessage(
					`${user.name} your Password has been updated successfully! :)`
				);
				setIsLoading(false);
			}
		} catch (err) {
			setErrorMessage(err.message);
			setIsLoading(false);
		}
	}

	return (
		<PageContainer>
			{errorMessage && <ErrorAlert message={errorMessage} />}
			{okMessage && <SuccessAlert message={okMessage} />}
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<Form onSubmit={handleSubmit}>
						<h3>Update Your Password</h3>
						<InputContainer>
							<label htmlFor='password'>Current Password:</label>
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
							<label htmlFor='password'>Password:</label>
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
							<label htmlFor='passwordConfirm'>Password Confirm:</label>
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
				</>
			)}
		</PageContainer>
	);
}

export default UpdateMyPassword;
