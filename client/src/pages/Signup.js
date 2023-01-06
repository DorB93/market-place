import React, { useState } from "react";

import { Form, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "./../context/UserContext";
import ErrorAlert from "../components/ErrorAlert";
import myAxios from "../api";
import {
	InputContainer,
	PageContainer,
	SubmitBtn,
} from "../components/StyleComponents";

async function signupUser(userData) {
	return myAxios
		.post("users/signup", userData)
		.then((res) => res.data.data._doc);
}

function Signup() {
	const { setLogin } = useUser();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [role, setRole] = useState("user");
	const [message, setMessage] = useState(null);
	const navigate = useNavigate();

	function wait(sec) {
		return setTimeout(() => {
			console.log(`Waiting ${sec} seconds...`);
		}, 1000 * sec);
	}

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setMessage(null);
			if (password !== passwordConfirm) {
				setMessage("Password & Password Confirm must match! try again!");
				return;
			}
			const user = await signupUser({
				role,
				passwordConfirm,
				name,
				email,
				password,
			});
			setLogin(user);
			await wait(5);
			navigate("/");
		} catch (err) {
			setMessage(err.data.data.message);
		}
	};
	return (
		<>
			<PageContainer>
				{message && <ErrorAlert message={message} />}
				<Form onSubmit={handleSubmit}>
					<h1>Create an Account</h1>
					<InputContainer>
						<label htmlFor='name'>Full Name:</label>
						<input
							placeholder='Enter your full name'
							type='text'
							onChange={(e) => {
								setName(e.target.value);
							}}
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
								setPassword(e.target.value);
							}}
							required
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='passwordConfirm'>Password Confirm:</label>
						<input
							minLength={8}
							placeholder='shh-secret'
							type='password'
							onChange={(e) => {
								setPasswordConfirm(e.target.value);
							}}
							required
						/>
					</InputContainer>
					<InputContainer>
						<label htmlFor='role'>Want to join our sellers family?</label>
						<input
							type='checkbox'
							onChange={(e) => {
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
