import React from "react";

import {
	PageContainer,
	Form,
	InputContainer,SubmitBtn
} from "./../components/StyleComponents";

function ForgotPassword() {
	return (
		<PageContainer>
			<Form>
				<h1>Forgot Your Password?</h1>
				<InputContainer>
					<label htmlFor='email'>Enter your mail:</label>
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
