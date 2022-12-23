import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { PageContainer, Form, InputContainer } from "./Signup";
import { useUser } from "./../context/UserContext";
import MessageAlert from "../components/MessageAlert";
import myAxios from "../api";

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
	try {
		return myAxios.post(`/users/login`, userData).then((res) => res.data);
	} catch (err) {
		console.log(err.message);
	}
}

function Login() {
	const { setLogin } = useUser();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [alertType, setAlertType] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(null);
		const respond = await loginUser({
			email,
			password,
		});
		console.log({ respond });
		if (respond.status === "success") {
			setLogin(respond.data._doc);
			navigate("/");
		} else {
			setAlertType(respond.status);
			setMessage(respond.message);
		}
	};

	return (
		<PageContainer>
			{message && <MessageAlert message={message} type={alertType} />}
			<Form onSubmit={handleSubmit}>
				<h1>Log In</h1>
				<InputContainer>
					<label htmlFor='email' name='email'>
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
					<label htmlFor='password'>Password:</label>
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
