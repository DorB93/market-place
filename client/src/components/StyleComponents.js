import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
	AppBar,
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	TextField,
	Toolbar,
} from "@mui/material";

/*
const StyledAvatar = ({ children, ...props }) => (
    <Avatar sx={{ height: '70px', width: '70px' }} {...props}>
        {children}
    </Avatar>
);
*/
////////////////// Manage Orders ///////////////

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
export const PageContainer = styled(Container)`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
	position: relative;
`;
export const Form = ({ children, ...props }) => (
	<Box
		component='form'
		autoComplete='off'
		sx={{
			width: {
				xs: "100%",
				sm: 400,
			},
		}}
		display='flex'
		flexDirection='column'
		alignItems='center'
		borderRadius='12px'
		backgroundColor='#dfdfdf8f'
		height='fit-content'
		gap='15px'
		padding='15px'
		marginBottom='15px'
		boxShadow='2px 2px 5px 5px rgba(128, 128, 128, 0.193)'
		{...props}>
		{children}
	</Box>
);

export const InputContainer = styled(TextField)`
	background-color: white;
	width: 90%;
`;

//////////////// Login /////////////////////////
export const SubmitBtn = styled(Button)`
	transition: all linear 250ms;
	border: 0;

	&[type="submit"] {
		color: white;
		background-color: rgb(71, 158, 246);
	}
	&:hover {
		transform: scale(1.05);
	}
`;

///////////////// Filter ///////////////////
export const CategorySelector = styled(Box)`
	width: 100%;
	box-sizing: border-box;
	box-shadow: 2px 2px 5px 1px rgba(128, 128, 128, 0.193);
	height: fit-content;
	background-color: #dfdfdf8f;

	/* display: flex; */
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
	display: flex;
	top: 60px;
	left: 190px;
	z-index: 3;
`;

/////// Products ///////////////
export const ProductsContainer = styled(Grid)`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-around;
	width: 100%;
`;

/////////////////// Product //////////////////////
export const InventoryAlert = styled.span`
	position: absolute;
	top: 7px;
	left: 7px;
	color: red;
	z-index: 4;
`;
export const ProductContainer = styled(Paper)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	/* box-shadow: 2px 2px 5px 3px rgba(40, 40, 40, 0.34); */
	width: 200px;
	height: 320px;
	font-size: 15px;
	border-radius: 10px;
	box-sizing: border-box;
	color: rgb(125, 125, 125);
	overflow: hidden;
	padding: 10px;
	background-color: white;
	transition: all linear 200ms;
	position: relative;

	&:hover {
		box-shadow: 2px 2px 5px 3px rgba(40, 40, 40, 0.34);
	}

	& img {
		width: 80%;
		object-fit: contain;
		align-self: center;
	}
`;
export const ProductMinDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;

	& a {
		color: rgb(125, 125, 125);
		text-decoration: none;
	}
	& span {
		font-size: larger;
	}
`;
export const BtnAddToCart = styled(Button)`
	color: white;

	transition: all linear 250ms;
	border: 0;

	&:hover {
		box-shadow: 2px 2px 2px 2px rgba(71, 159, 246, 0.453);
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
export const ProductWrapper = styled(Container)`
	background-color: #fbfafa;
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	gap: 15px;
	padding-bottom: 15px;
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
export const RelatedContainer = styled(Grid)`
	width: 90%;
	height: 90%;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	overflow: auto;
`;
export const PriceAction = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
export const BackBtn = styled(Button)`
	border: 0;
	transition: 100ms linear all;
	&:hover {
		box-shadow: 2px 2px 5px 2px rgba(40, 40, 40, 0.34);
	}
`;

////////////////////  Cart  ////////////////
export const CartContainer = styled(Box)`
	position: fixed;
	top: 0;
	right: 0;

	color: white;
	transition: all 500ms linear;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: rgba(179, 179, 179, 0.987);
	z-index: 3000;
	/* width: 380px; */
	border-radius: 10px;
	box-shadow: 3px 3px 5px 2px rgba(110, 110, 110, 0.868);
	transition: all 500ms linear;
	height: 85vh;

	& h2,
	h3 {
		text-align: center;
	}
`;
export const BtnCloseCart = styled(IconButton)`
	position: absolute;
	right: 5px;
	top: 5px;
	border: 0;
	border-radius: 50%;
	font-weight: 900;

	transition: 200ms all linear;

	&:hover {
		border: 0;
		transform: scale(1.3);
		/*
		background-color: white;
		box-shadow: 1px 1px 5px 2px rgba(135, 135, 135, 0.854);
		color: gray;*/
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
export const CartBtn = styled(Button)`
	border-radius: 5px;
	color: white;
	border: 0;
`;

///////////////// CartItem       ///////////////////

export const CartBtnItem = styled(IconButton)`
	display: flex;
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
`;
export const RemoveItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 10px;
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
export const ProfileWrapper = styled(Container)`
	display: flex;
	justify-content: center;
	height: 100%;
	width: 100vw;
	position: relative;
	margin: 0;
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

//////////////////////// NavBar   /////////////////
/*
const StyledAvatar = ({ children, ...props }) => (
    <Avatar sx={{ height: '70px', width: '70px' }} {...props}>
        {children}
    </Avatar>
);
*/

export const Nav = ({ children, ...props }) => (
	<AppBar
		position='sticky'
		margin={0}
		display='flex'
		justifyContent='space-between'
		alignItems='center'
		sx={{
			backgroundColor: "rgb(255, 255, 255)",
			boxShadow: "2px 2px 5px 5px rgba(128, 128, 128, 0.193)",
			padding: "5px",
			width: "100%",
			alignSelf: "center",
		}}
		{...props}>
		<Container maxWidth='xl'>
			<Toolbar disableGutters>{children}</Toolbar>
		</Container>
	</AppBar>
);

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
export const CartIcon = styled(IconButton)`
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
export const PreviewContainer = styled(Container)`
	display: flex;
	justify-content: center;
	background-color: transparent;
	& img {
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
export const OrdersContainer = styled(Container)`
	width: 100%;
	padding: 20px;
`;

////////////////// profileNav /////////////////////
export const NavContainer = styled(Container)`
	position: sticky;
	top: 60px;
	left: 0;
	bottom: 0;
	width: 190px;
	margin: 0;
	background-color: #dfdfdf8f;
	display: flex;
	flex-direction: column;
	height: 95vh;
	padding-left: 15px;
	gap: 9px;
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
export const Navigator = styled.span`
	cursor: pointer;
	transition: 250ms all linear;

	&:hover {
		color: rgb(71, 158, 246);
		text-shadow: 3px 5px 7px rgba(8, 61, 64, 0.8);
	}
`;
