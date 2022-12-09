import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { PageContainer, Form, InputContainer } from "./Signup";

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
function Login() {
	return (
		<PageContainer>
			<Form>
				<h1>Log In</h1>
				<InputContainer>
					<label for='email'>Email:</label>
					<input
						id='email'
						placeholder='yourmail@example.com'
						type='email'
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
						required
					/>
				</InputContainer>
				<SubmitBtn type='submit'>Login</SubmitBtn>
				<p>
					Forgot your password? <NavLink>click here</NavLink>
				</p>
			</Form>
			<p>
				Haven't got an account yet? <NavLink to='/signup'>click here</NavLink>
			</p>
		</PageContainer>
	);
}

export default Login;
