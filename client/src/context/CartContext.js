import React, { useState, createContext, useContext } from "react";
import Cart from "../components/Cart";
import useLocalStorage from "../hooks/useLocalStorage";
import useProducts from "../hooks/useProducts";

const CartContext = createContext({});

export function useCart() {
	return useContext(CartContext);
}

export function CartProvider({ children }) {
	const [cart, setCart] = useLocalStorage("cart", {});
	const [isOpen, setIsOpen] = useState(false);
	const catalog = useProducts();

	const cartQuantity = Object.values(cart).reduce((pre, curr) => pre + curr, 0);
	const cartFullPrice = Object.keys(cart)
		.map((id) => {
			const item = catalog.find((p) => p.id === Number(id));
			return item ? cart[Number(id)] * item.getPrice() : 0;
		})
		.reduce((pre, curr) => pre + curr, 0);

	const openCart = () => {
		setIsOpen(true);
	};
	const closeCart = () => {
		setIsOpen(false);
	};
	const removeCart = () => {
		setCart({});
	};

	function getItemQuantity(id) {
		if (!cart[id]) return 0;
		return cart[id];
	}
	function increaseItemQuantity(id) {
		if (!cart[id]) {
			cart[id] = 1;
			setCart((currCart) => {
				return { ...currCart };
			});
		} else {
			cart[id] += 1;
			setCart((pre) => {
				return { ...pre };
			});
		}
	}
	function removeItem(id) {
		delete cart[id];
		setCart((currCart) => {
			return { ...currCart };
		});
	}
	function decreaseItemQuantity(id) {
		if (cart[id] === 1) {
			removeItem(id);
		} else {
			cart[id]--;
			setCart((pre) => {
				return { ...pre };
			});
		}
	}

	return (
		<CartContext.Provider
			value={{
				getItemQuantity,
				increaseItemQuantity,
				decreaseItemQuantity,
				removeItem,
				openCart,
				removeCart,
				closeCart,
				cart,
				cartFullPrice,
				cartQuantity,
				catalog,
			}}>
			{children}
			{isOpen && <Cart />}
		</CartContext.Provider>
	);
}
