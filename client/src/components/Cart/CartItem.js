import React from "react";
import { Delete, Add, Remove } from "@mui/icons-material";
import { useCart } from "../../context/CartContext";
import {
	CartBtnItem,
	ImageContainer,
	ItemCard,
	ItemDetails,
	ItemQuantity,
	RemoveItem,
} from "../StyleComponents";

function CartItem({ item }) {
	const {
		increaseItemQuantity,
		getItemQuantity,
		decreaseItemQuantity,
		removeItem,
	} = useCart();
	return (
		<ItemCard>
			<ImageContainer>
				<img src={`/img/products/${item.image}`} alt={item.name} />
			</ImageContainer>
			<ItemDetails>
				<h3>{item.name}</h3>
				<ItemQuantity>
					<CartBtnItem
						fontSize='large'
						color='primary'
						aria-label='add'
						onClick={() => {
							increaseItemQuantity(item.id);
						}}
						className='btn btn-qControl'>
						<Add />
					</CartBtnItem>
					<span>{getItemQuantity(item.id)}</span>
					<CartBtnItem
						fontSize='large'
						aria-label='decrease'
						color='primary'
						onClick={() => {
							decreaseItemQuantity(item.id);
						}}
						className='btn btn-qControl'>
						<Remove />
					</CartBtnItem>
					<span>Price: ${Number(item.getPrice()).toFixed(2)}</span>
				</ItemQuantity>
			</ItemDetails>
			<RemoveItem>
				<CartBtnItem
					color='error'
					onClick={() => {
						removeItem(item.id);
					}}>
					<Delete />
				</CartBtnItem>
			</RemoveItem>
		</ItemCard>
	);
}

export default CartItem;
