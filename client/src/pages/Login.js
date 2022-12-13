import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PageContainer, Form, InputContainer } from "./Signup";
import { useUser } from "./../context/UserContext";

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
	return fetch("http://127.0.0.1:4000/api/v1/users/login", {
		method: "POST",
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = await loginUser({
			email,
			password,
		});
		setLogin(user.data);
	};

	return (
		<PageContainer>
			<Form onSubmit={handleSubmit}>
				<h1>Log In</h1>
				<InputContainer>
					<label for='email' name='email'>
						Email:
					</label>
					<input
						id='email'
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
						id='password'
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
