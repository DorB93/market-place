import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const PageContainer = styled.section`
	height: 80%;
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;

export const Form = styled.form`
	background-color: #dfdfdf8f;
	box-shadow: 2px 2px 5px 5px rgba(128, 128, 128, 0.193);
	height: 80%;
	width: 30%;
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
	& button {
		width: 80px;
		padding: 5px;
		border: 0;
		border-radius: 10px;
		box-shadow: 1px 1px 5px 2px rgba(128, 128, 128, 0.193);
		background-color: lightgray;
	}
	& button[type="submit"] {
		background-color: rgb(71, 158, 246);
		color: white;
	}
`;

function SignupForm() {
	return (
		<>
			<PageContainer>
				<Form>
					<h1>Create an Account</h1>
					<InputContainer>
						<label for='name'>Full Name:</label>
						<input
							id='name'
							placeholder='Enter your full name'
							type='text'
							required
						/>
					</InputContainer>
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
					<InputContainer>
						<label for='passwordConfirm'>Password Confirm:</label>
						<input
							minLength={8}
							id='passwordConfirm'
							placeholder='shh-secret'
							type='password'
							required
						/>
					</InputContainer>
					<InputContainer>
						<label for='role'>Want to join our sellers family?</label>
						<input id='role' type='checkbox' />
					</InputContainer>
					<InputContainer>
						<button type='reset'>Reset</button>
						<button type='submit'>Submit</button>
					</InputContainer>
				</Form>
				<p>
					Already have an account? <NavLink to='/login'>click here</NavLink>
				</p>
			</PageContainer>
		</>
	);
}

export default SignupForm;
