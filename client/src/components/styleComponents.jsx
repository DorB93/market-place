import styled from "styled-components";

export const AppWrapper = styled.div`
	margin: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-width: 320px;
	width: 100%;
`;

export const Nav = styled.nav`
	position: sticky;
	top: 0;
	display: flex;
	justify-content: space-between;
	height: 50px;
	width: 100vw;
	padding: 5px;
	background-color: rgb(255, 255, 255);
	margin-bottom: 3px;
	box-shadow: 2px 2px 5px 5px rgba(128, 128, 128, 0.193);
	z-index: 1;
	font-size: 20px;
	color: black;
`;
export const HeaderBar = styled.h1`
	margin: 0;
	font-weight: bold;
`;
export const UserBar = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
`;

export const Link = styled.a`
	padding: 15px;
	margin-right: 2px;
	border-right: 3px rgb(128, 128, 128);
	text-decoration: none;
	color: rgb(125, 125, 125);

	&:hover {
		color: black;
	}
`;
export const StoreContainer = styled.section`
	background-color: #fbfafa;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	padding-top: 5px;
	padding-bottom: 5px;
	min-height: 60vh;
`;

export const CategorySelector = styled.nav`
	width: 100%;
	height: 30px;
	background-color: #dfdfdf8f;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
`;

export const CategoryOption = styled.div`
	color: black;
	background-color: transparent;
	border: 0;
	border-right: 1px solid rgb(186, 186, 186);
	width: fit-content;
	min-width: 40px;
	margin: 10px;
	padding-left: 15px;
	padding-right: 15px;
	box-sizing: border-box;
	font-size: large;
	transition: linear all 250ms;
	cursor: pointer;

	&:hover {
		background-color: rgba(186, 186, 186, 0.835);
	}
`;

export const CartContainer = styled.div`
	position: fixed;
	top: 0;
	right: 0;

	color: white;
	transition: all 500ms linear;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: rgba(179, 179, 179, 0.987);
	z-index: 3;
	width: 380px;
	border-radius: 10px;
	box-shadow: 3px 3px 5px 2px rgba(110, 110, 110, 0.868);
	transition: all 500ms linear;
	height: 85vh;

	& h3 {
		text-align: center;
	}
`;

export const BtnCloseCart = styled.button`
	position: absolute;
	right: 5px;
	top: 5px;
	border: 0;
	border-radius: 50%;
	height: 1.5rem;
	font-weight: 900;
	color: white;
	background: none;
	transition: 200ms all linear;

	&:hover {
		background-color: white;
		box-shadow: 1px 1px 5px 2px rgba(135, 135, 135, 0.854);
		color: gray;
	}
`;
export const CartContents = styled.div`
	height: 70%;
	overflow: auto;
	margin-left: 12px;
`;
export const CartInfo = styled.div`
	font-size: large;
	display: flex;
	justify-content: space-around;
	margin: 20px;
`;

export const CartBtnContainer = styled.div`
	display: flex;
	justify-content: space-around;
	margin: 10px;
`;

export const CartBtn = styled.button`
	height: 3rem;
	width: 5rem;
	border-radius: 5px;
	border: 0;

	&:hover {
		box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.586);
	}
`;

export const ProductsContainer = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
`;

export const Product = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid rgb(179, 179, 179);
	box-shadow: 2px 2px 3px 2px rgba(40, 40, 40, 0.34);
	width: 330px;
	height: 470px;
	font-size: 15px;
	margin: 20px;
	border-radius: 10px;
	box-sizing: border-box;
	color: #000;
	overflow: hidden;
	padding: 15px;
	background-color: white;
	transition: all linear 500ms;
	position: relative;

	& img {
		height: 150px;
		object-fit: contain;
		justify-self: center;
	}
	& p {
		height: 100px;
		overflow: auto;
		justify-items: center;
	}
`;

export const ProductPriceAction = styled.div`
	display: flex;
	justify-content: space-between;
	position: absolute;
	bottom: 15px;
	width: 90%;
	align-items: flex-end;
	& span {
		margin-right: 2px;
		font-size: x-large;
		color: rgb(71, 158, 246);
	}
	& button {
		height: 35px;
		font-size: 15px;
		border-radius: 40px;
		color: white;
		background-color: rgb(71, 158, 246);
		transition: all linear 250ms;
		border: 0;
		width: 33%;
	}
	& button:hover {
		background-color: white;
		box-shadow: 2px 2px 2px 2px rgba(71, 159, 246, 0.453);
		color: rgb(71, 158, 246);
		border: rgb(71, 158, 246) 1px;
	}
`;
