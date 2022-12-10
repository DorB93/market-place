import React from "react";
// import { NavLink } from "react-router-dom";
// import styled from "styled-components";
import { PageContainer, Form, InputContainer } from "./Signup";
import { SubmitBtn } from "./Login";
function ForgotPassword() {
	return (
		<PageContainer>
			<Form>
				<h1>Forgot Your Password?</h1>
				<InputContainer>
					<label for='email'>Enter your mail:</label>
					<input
						id='email'
						placeholder='yourmail@example.com'
						type='email'
						required
					/>
				</InputContainer>
				<SubmitBtn type='submit'>Send Mail</SubmitBtn>
			</Form>
		</PageContainer>
	);
}

export default ForgotPassword;
