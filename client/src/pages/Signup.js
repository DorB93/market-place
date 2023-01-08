import React, { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "./../context/UserContext";
import ErrorAlert from "../components/ErrorAlert";
import myAxios from "../api";
import {
	InputContainer,
	PageContainer,
	SubmitBtn,
	Form,
} from "../components/StyleComponents";
import { Box } from "@mui/material";

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
				setMessage("Password &  Password Confirm must match! try again!");
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
				<Form
					component='form'
					autoComplete='off'
					onSubmit={handleSubmit}
					sx={{
						width: {
							xs: "100%",
							sm: 400,
						},
					}}>
					<h2>Create an Account</h2>
					<InputContainer
						size='small'
						required
						id='fullName'
						label='Full Name:'
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<InputContainer
						size='small'
						required
						type='email'
						id='email'
						label='Email:'
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<InputContainer
						size='small'
						label='Password:'
						type='password'
						minLength={8}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						error={password !== passwordConfirm || password.length < 8}
						helperText={
							password !== passwordConfirm
								? "Both of the passwords must match!"
								: password.length < 8
								? "Password must contained 8 cha"
								: ""
						}
						required
					/>
					<InputContainer
						size='small'
						label='Password Confirm:'
						minLength={8}
						type='password'
						onChange={(e) => {
							setPasswordConfirm(e.target.value);
						}}
						required
					/>

					<Box>
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
					</Box>
					<Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
						<SubmitBtn type='reset'>Reset</SubmitBtn>
						<SubmitBtn type='submit'>Submit</SubmitBtn>
					</Box>
				</Form>
				<p>
					Already have an account? <NavLink to='/login'>click here</NavLink>
				</p>
			</PageContainer>
		</>
	);
}

export default Signup;
