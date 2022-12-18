import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { PageContainer, Form, InputContainer } from "./Signup";
import { useUser } from "./../context/UserContext";
import ErrorAlert from "../components/ErrorAlert";
import { API_URL } from "../helper";

export const SubmitBtn = styled.button`
	height: 35px;
	font-size: 15px;
	border-radius: 40px;
	background-color: lightgray;
	transition: all linear 250ms;
	border: 0;
	width: 100px;

	&[type="submit"] {
		color: white;
		background-color: rgb(71, 158, 246);
	}
	&:hover {
		transform: scale(1.05);
	}
	&:hover[type="submit"] {
		background-color: white;
		box-shadow: 2px 2px 2px 2px rgba(71, 159, 246, 0.453);
		color: rgb(71, 158, 246);
	}
`;
async function loginUser(userData) {
	return fetch(`${API_URL}users/login`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	}).then((data) => data.json());
}

function Login() {
	const { setLogin } = useUser();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		const user = await loginUser({
			email,
			password,
		});
		console.log(user);
		if (user.status === "success") {
			setLogin(user.data);
			navigate("/");
		} else {
			setError(user.message);
		}
	};

	return (
		<PageContainer>
			{error && <ErrorAlert message={error} />}
			<Form onSubmit={handleSubmit}>
				<h1>Log In</h1>
				<InputContainer>
					<label for='email' name='email'>
						Email:
					</label>
					<input
						placeholder='yourmail@example.com'
						type='email'
						required
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</InputContainer>
				<InputContainer>
					<label for='password'>Password:</label>
					<input
						minLength={8}
						placeholder='shh-secret'
						type='password'
						name='password'
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
					/>
				</InputContainer>
				<SubmitBtn type='submit'>Login</SubmitBtn>
				<p>
					Forgot your password?{" "}
					<NavLink to='/forgot-password'>click here</NavLink>
				</p>
			</Form>
			<p>
				Haven't got an account yet? <NavLink to='/signup'>click here</NavLink>
			</p>
		</PageContainer>
	);
}

export default Login;
