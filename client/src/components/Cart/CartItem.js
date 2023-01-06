import React from "react";

import { IoTrashOutline, IoRemove, IoAdd } from "react-icons/io5";
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
						onClick={() => {
							increaseItemQuantity(item.id);
						}}
						className='btn btn-qControl'>
						<IoAdd />
					</CartBtnItem>
					<span>{getItemQuantity(item.id)}</span>
					<CartBtnItem
						onClick={() => {
							decreaseItemQuantity(item.id);
						}}
						className='btn btn-qControl'>
						<IoRemove />
					</CartBtnItem>
					<span>Price: ${Number(item.getPrice()).toFixed(2)}</span>
				</ItemQuantity>
			</ItemDetails>
			<RemoveItem>
				<CartBtnItem
					onClick={() => {
						removeItem(item.id);
					}}>
					<IoTrashOutline />
				</CartBtnItem>
			</RemoveItem>
		</ItemCard>
	);
}

export default CartItem;
