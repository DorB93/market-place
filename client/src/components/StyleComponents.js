import { NavLink } from "react-router-dom";
import styled from "styled-components";

////////////////// Manage Orders ///////////////
export const DashboardContainer = styled.div`
	width: 85vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 20px;
`;
export const InvoicesContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 15px;
`;
export const ConfirmActionContainer = styled.div`
	position: fixed;
	cursor: pointer;
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	z-index: 5;
	background-color: rgba(84, 84, 84, 0.585);
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const ConfirmAction = styled.div`
	background-color: white;
	height: 250px;
	width: 350px;
	border-radius: 12px;
	box-shadow: 2px 2px 5px 3px rgba(40, 40, 40, 0.34);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	gap: 25px;
	z-index: 6;
	cursor: default;
`;

////////////////////// sign up //////////////////
export const PageContainer = styled.section`
	height: 80%;
	width: 80%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	position: relative;
`;
export const Form = styled.form`
	background-color: #dfdfdf8f;
	box-shadow: 2px 2px 5px 5px rgba(128, 128, 128, 0.193);
	height: 80%;
	width: 455px;
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
		height: fit-content;
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
`;

//////////////// Login /////////////////////////

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

// Filter /////

export const CategorySelector = styled.nav`
	width: 100%;
	box-sizing: border-box;
	box-shadow: 2px 2px 5px 1px rgba(128, 128, 128, 0.193);
	height: 30px;
	background-color: #dfdfdf8f;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	justify-self: center;
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
///////////// My Products ////////////////////

export const SellerCategoryNav = styled(CategorySelector)`
	position: sticky;
	top: 60px;
	left: 190px;
	z-index: 3;
`;

/////// Products ///////////////

export const ProductsContainer = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
`;

/////////////////// Product //////////////////////
export const InventoryAlert = styled.span`
	position: absolute;
	bottom: 3px;
	left: 3px;
	color: red;
	z-index: 4;
`;
export const ProductContainer = styled.div`
	display: flex;
	justify-content: space-between;
	/* box-shadow: 2px 2px 5px 3px rgba(40, 40, 40, 0.34); */
	width: 400px;
	height: 250px;
	font-size: 15px;
	margin: 20px;
	border-radius: 10px;
	box-sizing: border-box;
	color: rgb(125, 125, 125);
	overflow: hidden;
	padding: 15px;
	background-color: white;
	transition: all linear 200ms;
	position: relative;

	&:hover {
		box-shadow: 2px 2px 5px 3px rgba(40, 40, 40, 0.34);
	}

	& img {
		width: 50%;
		object-fit: contain;
		justify-self: center;
	}
`;
export const ProductMinDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;

	& ::-webkit-scrollbar {
		width: 7px;
	}

	& ::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
	}

	& ::-webkit-scrollbar-thumb {
		background-color: darkgrey;
		outline: 0.5px solid rgba(255, 255, 255, 0.444);
		border-radius: 12px;
	}

	& h3 {
		margin: 0;
		font-size: 12px;
		max-height: 45px;
		width: 90%;
		overflow: auto;
	}
	& a {
		color: rgb(125, 125, 125);
		text-decoration: none;
	}
	& span {
		font-size: larger;
	}
`;
export const BtnAddToCart = styled.button`
	height: 35px;
	font-size: 15px;
	border-radius: 40px;
	color: white;
	background-color: rgb(71, 158, 246);
	transition: all linear 250ms;
	border: 0;
	width: 100px;

	&:hover {
		background-color: white;
		box-shadow: 2px 2px 2px 2px rgba(71, 159, 246, 0.453);
		color: rgb(71, 158, 246);
		border: rgb(71, 158, 246) 1px;
	}
	&:disabled {
		background-color: gray;
	}
	&:disabled:hover {
		box-shadow: none;
		color: white;
		border: none;
	}
`;

export const StyledLink = styled(NavLink)`
	color: rgb(125, 125, 125);
	text-decoration: none;
	transition: 200ms all linear;
	&:hover {
		color: rgb(71, 158, 246);
	}
`;

//////////////  ProductDetail  ////////////////////
export const ProductWrapper = styled.div`
	background-color: #fbfafa;
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	gap: 15px;
`;
export const Details = styled.section`
	width: 80%;
	display: flex;
	justify-content: space-between;
	gap: 50px;
`;
export const ProductImg = styled.img`
	background-color: transparent;
	min-width: 250px;
	object-fit: contain;
	max-height: 500px;
`;
export const TextDetails = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;
export const RelatedContainer = styled.section`
	display: flex;
	width: 90%;
	flex-wrap: wrap;
	overflow: auto;
	justify-content: center;
`;
export const PriceAction = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
export const BackBtn = styled.button`
	width: 80px;
	height: 30px;
	border-radius: 12px;
	border: 0;
	transition: 100ms linear all;
	&:hover {
		transform: scale(1.08);
		box-shadow: 2px 2px 5px 2px rgba(40, 40, 40, 0.34);
	}
`;

//////////////////// Cart  ////////////////
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

	& h2,
	h3 {
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

	&::-webkit-scrollbar {
		width: 7px;
	}

	&::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
	}

	&::-webkit-scrollbar-thumb {
		background-color: white;
		outline: 0.5px solid rgba(255, 255, 255, 0.444);
		border-radius: 12px;
	}
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
	&.primary {
		background-color: rgb(71, 158, 246);
	}

	&.secondary {
		background-color: red;
	}
`;

///////////////// CartItem       ///////////////////

export const CartBtnItem = styled.button`
	display: flex;
	align-items: center;
	border-radius: 50%;
	height: 2rem;
	font-size: 1.5rem;
	transition: all 250ms;
	border: 0;
	width: 2rem;
`;
export const ItemCard = styled.div`
	height: 150px;
	display: grid;
	grid-template-columns: 1fr 3fr 0.5fr;
	color: #000;
	width: 90%;
	border-radius: 15px;
	overflow: hidden;
	padding: 5px;
	margin: 7px;
	background-color: white;
	transition: 200ms all linear;
`;
export const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;

	& img {
		max-width: 100%;
		max-height: 70%;
	}
`;
export const ItemDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
	margin: 5px;

	& h3 {
		max-height: 50px;
		overflow: hidden;
	}
`;
export const ItemQuantity = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 120%;

	& button {
		background-color: rgba(71, 159, 246, 0);
		color: rgb(71, 158, 246);
	}
	& button:hover {
		background-color: rgba(71, 159, 246, 0.403);
		color: black;
		box-shadow: 1px 3px 5px 2px rgba(0, 0, 0, 0.659);
	}
`;
export const RemoveItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 10px;

	& button {
		color: rgb(255, 0, 0);
		background: transparent;
	}
	& button:hover {
		color: white;
		background-color: brown;
		box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.659);
	}
`;

//////////////// Store ///////////////////
export const StoreContainer = styled.section`
	background-color: #fbfafa;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	/* padding-top: 5px; */
	padding-bottom: 5px;
	min-height: 60vh;
`;

/////////////////////// Checkout ///////////////////////
export const PageWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-evenly;
`;
export const SectionContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	gap: 20px;
	max-height: 82vh;
`;
export const ItemsContainer = styled.div`
	height: 88%;
	transition: all 500ms linear;
	display: flex;
	flex-direction: column;

	justify-content: space-evenly;
	background-color: #dfdfdf8f;
	width: 455px;
	border-radius: 10px;
	box-shadow: 2px 2px 5px 5px rgba(128, 128, 128, 0.193);

	& h2,
	h3 {
		text-align: center;
	}
`;

///////////////////////// Profile //////////////////////
export const ProfileWrapper = styled.section`
	display: flex;
	justify-content: start;
	width: 100%;
	position: relative;
`;

//////////////////// ErrorAlert ////////////////////

export const AlertFragment = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const AlertContainer = styled.h4`
	background-color: red;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	width: 30%;
	max-width: 300px;
	min-width: 150px;
	font-weight: bold;
	border-radius: 10px;
	border: 0;
	z-index: 4;
	text-align: center;
`;
/////////////////////////// SuccessAlert ////////////////
export const SuccessContainer = styled(AlertContainer)`
	background-color: green;
	font-weight: normal;
`;

////////////////////////    /////////////////
export const Nav = styled.nav`
	position: sticky;
	align-self: center;
	margin: 0;
	top: 0;
	display: flex;
	box-sizing: border-box;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	width: 100vw;
	padding: 5px;
	background-color: rgb(255, 255, 255);
	margin-bottom: 3px;
	box-shadow: 2px 2px 5px 5px rgba(128, 128, 128, 0.193);
	z-index: 1;
	font-size: 20px;
	color: rgb(125, 125, 125);
`;
export const HeaderBar = styled.h1`
	margin: 0;
	font-weight: bold;
	box-sizing: border-box;
`;
export const UserBar = styled.div`
	display: flex;
	align-items: center;
	box-sizing: border-box;
	gap: 15px;
`;
export const Link = styled.a`
	padding: 15px;
	margin-right: 2px;
	border-right: 3px rgb(128, 128, 128);
	box-sizing: border-box;
	text-decoration: none;
	color: rgb(125, 125, 125);

	& a {
		text-decoration: none;
		color: rgb(125, 125, 125);
	}

	& img {
		height: 45px;
		width: 45px;
		border-radius: 50%;
	}
	&:hover {
		color: black;
	}
`;
export const CartIcon = styled.button`
	color: white;
	position: relative;
	padding-top: 7px;
	height: 3rem;
	width: 3rem;
	font-size: 1.5rem;
	border-radius: 50%;
	background-color: rgb(71, 158, 246);
	border: 0;
	box-shadow: 3px 3px 5px 3px rgba(128, 128, 128, 0.193);
	transition: 250ms all linear;

	&:hover {
		background-color: rgba(71, 159, 246, 0.699);
		box-shadow: 1px 3px 3px 3px rgba(0, 0, 0, 0.267);
		color: rgba(105, 105, 105, 0.611);
	}
`;
export const Baj = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 1.3rem;
	width: 1.3rem;
	color: white;
	font-size: small;
	background-color: brown;
	border-radius: 50%;
	right: 0;
	bottom: -3px;
`;

///////////////// UploadProductPhoto ////////////////
export const PreviewContainer = styled(InputContainer)`
	display: flex;
	justify-content: center;
	align-items: color-interpolation-filters;
	& img {
		height: 465px;
		width: 419px;
		object-fit: contain;
	}
`;
export const BtnContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
`;

///////////////OrderDetails ////////////////////

export const OrderContainer = styled(Form)`
	width: 700px;
	display: flex;
	flex-direction: column;
	& h3 {
		margin: 0;
	}
`;
export const DetailContainer = styled.div`
	display: flex;
	justify-content: space-around;
	background-color: white;
	border-radius: 12px;
	width: 600px;
`;

export const ProductOdContainer = styled(ProductContainer)`
	width: 600px;
`;
export const ReceivedProduct = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const TimePriceOrder = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
	padding: 5px;
	& h3 {
		align-self: center;
		margin: 0;
	}
`;
export const BtnGotItems = styled(SubmitBtn)`
	height: fit-content;
`;
export const AddressContainer = styled(TimePriceOrder)`
	width: 200px;
`;
export const OrdersProducts = styled.section`
	height: 70%;
	overflow: auto;
	flex-shrink: 0;
	max-height: 60vh;
	overflow: auto;
	box-shadow: 5px 3px 22px 11px rgba(0, 0, 0, 0.34) inset;
	-webkit-box-shadow: 5px 3px 22px 11px rgba(0, 0, 0, 0.34) inset;
	-moz-box-shadow: 5px 3px 22px 11px rgba(0, 0, 0, 0.34) inset;
	border-radius: 15px;
	&::-webkit-scrollbar {
		width: 7px;
	}

	&::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
	}

	&::-webkit-scrollbar-thumb {
		overflow: hidden;
		background-color: gray;
		outline: 0.5px solid rgba(255, 255, 255, 0.444);
		border-radius: 12px;
	}
`;

////////////////////////// SellerProductDetails ////////////
export const ProductImage = styled(ProductImg)`
	width: 60%;
	object-fit: contain;
`;
///////// sellerInvoice //////////////
export const InvoiceContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: darkgrey;
	border-radius: 15px;
	align-items: center;
	padding: 15px;
	gap: 10px;
	& h3 {
		margin: 0;
	}
`;
export const InvoiceProductsContent = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	height: 400px;
	box-sizing: border-box;

	overflow: auto;
	&::-webkit-scrollbar {
		width: 7px;
	}

	&::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
	}

	&::-webkit-scrollbar-thumb {
		background-color: white;
		outline: 0.5px solid rgba(255, 255, 255, 0.444);
		border-radius: 12px;
	}
`;
export const DeliveryDetails = styled(AddressContainer)`
	background-color: white;
	border-radius: 12px;
`;

//////// MyInfo ///////
export const ImageInputContainer = styled(InputContainer)`
	& img {
		height: 100px;
		width: 100px;
		border-radius: 50%;
	}
`;

////////// UserOrder /////////////////
export const OrdersContainer = styled(ProductsContainer)`
	width: 100%;
`;

////////////////// profileNav /////////////////////
export const NavContainer = styled.nav`
	width: 190px;
	background-color: #dfdfdf8f;
	display: flex;
	flex-direction: column;
	height: 94vh;
	padding-left: 15px;
	gap: 9px;
	position: sticky;
	top: 60px;
	left: 0;
	& h3 {
		margin: 0;
	}
`;
export const ProfileLink = styled(NavLink)`
	width: 92%;
	transition: linear all 280ms;
	text-decoration: none;
	color: black;
	background-color: transparent;
	border: 0;
	min-width: 40px;
	padding-left: 15px;
	font-size: large;
	cursor: pointer;
	&:hover {
		/* background-color: rgba(186, 186, 186, 0.835); */
		transform: scale(1.1) translateX(5px);
	}
	&.active {
		/* background-color: rgba(186, 186, 186, 0.835); */
		font-weight: bold;
		text-shadow: 6px 6px 5px rgba(77, 77, 77, 0.64);
		transform: scale(1.1) translateX(5px);
	}
`;
