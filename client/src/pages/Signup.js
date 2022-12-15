import React, { useState } from "react";

import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { SubmitBtn } from "./Login";
import { useUser } from "./../context/UserContext";
import ErrorAlert from "../components/ErrorAlert";

export const PageContainer = styled.section`
	height: 80%;
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	position: relative;
`;
export const Form = styled.form`
	background-color: #dfdfdf8f;
	box-shadow: 2px 2px 5px 5px rgba(128, 128, 128, 0.193);
	height: 80%;
	width: 455px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 12px;
	gap: 15px;
	padding: 15px;
`;
export const InputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 80%;

	& label {
		color: black;
	}

	& input {
		width: 180px;
		border: 0;
		border-radius: 12px;
		padding: 10px;
		box-shadow: 1px 1px 5px 2px rgba(128, 128, 128, 0.193);
	}
	& input[type="checkbox"] {
		width: 20px;
		padding: 10px;
		border-radius: 50%;
		background-color: transparent;
	}
	& input:focus {
		border: 0.5 solid lightgray;
	}
`;
async function signupUser(userData) {
	return fetch("http://127.0.0.1:4000/api/v1/users/signup", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	}).then((data) => data.json());
}

function Signup() {
	const { setLogin } = useUser();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [role, setRole] = useState("user");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = await signupUser({
			role,
			passwordConfirm,
			name,
			email,
			password,
		});
		if (user.status === "success") {
			setLogin(user.data);
			navigate("/");
		} else {
			setError(user.message);
		}
	};
	return (
		<>
			<PageContainer>
				{error && <ErrorAlert message={error} />}
				<Form onSubmit={handleSubmit}>
					<h1>Create an Account</h1>
					<InputContainer>
						<label for='name'>Full Name:</label>
						<input
							id='name'
							placeholder='Enter your full name'
							type='text'
							onChange={(e) => {
								setName(e.target.value);
							}}
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
							required
						/>
					</InputContainer>
					<InputContainer>
						<label for='password'>Password:</label>
						<input
							minLength={8}
							id='password'
							placeholder='shh-secret'
							type='password'
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							required
						/>
					</InputContainer>
					<InputContainer>
						<label for='passwordConfirm'>Password Confirm:</label>
						<input
							minLength={8}
							id='passwordConfirm'
							placeholder='shh-secret'
							type='password'
							onChange={(e) => {
								setPasswordConfirm(e.target.value);
							}}
							required
						/>
					</InputContainer>
					<InputContainer>
						<label for='role'>Want to join our sellers family?</label>
						<input
							id='role'
							type='checkbox'
							onChange={(e) => {
								console.log(e);
								if (e.target.checked) {
									setRole("seller");
								} else {
									setRole("user");
								}
							}}
						/>
					</InputContainer>
					<InputContainer>
						<SubmitBtn type='reset'>Reset</SubmitBtn>
						<SubmitBtn type='submit'>Submit</SubmitBtn>
					</InputContainer>
				</Form>
				<p>
					Already have an account? <NavLink to='/login'>click here</NavLink>
				</p>
			</PageContainer>
		</>
	);
}

export default Signup;
