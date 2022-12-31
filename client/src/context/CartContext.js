import React, { useReducer, createContext, useContext, useEffect } from "react";
import myAxios from "../api";
import Cart from "../components/Cart/Cart";
import useLocalStorage from "../hooks/useLocalStorage";
import { ClProduct } from "../hooks/useProducts";

const CartContext = createContext({});

export function useCart() {
	return useContext(CartContext);
}
function cartReducer(state, action) {
	switch (action.type) {
		case "OPEN":
			return { ...state, isOpen: true };
		case "CLOSE":
			return { ...state, isOpen: false };
		case "CLEAR":
			return { ...state, items: {} };
		case "ADD":
			const { id } = action.payload;
			if (!state.items[id]) {
				return {
					...state,
					items: { ...state.items, [id]: 1 },
				};
			} else {
				const product = state.catalog.find((p) => p.id === id);
				if (product.inventory === state.items[id]) return state;
				return {
					...state,
					items: { ...state.items, [id]: state.items[id] + 1 },
				};
			}
		case "REMOVE":
			const items = { ...state.items };
			delete items[action.payload.id];
			return { ...state, items };
		case "DECREASE":
			if (state.items[action.payload.id] === 1) {
				return { ...state, items: { ...state.items, [action.payload.id]: 0 } };
			} else {
				return {
					...state,
					items: {
						...state.items,
						[action.payload.id]: state.items[action.payload.id] - 1,
					},
				};
			}
		case "UPDATE-CATALOG":
			return {
				...state,
				catalog: action.payload.catalog,
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
}
export function CartProvider({ children }) {
	const [state, dispatch] = useReducer(cartReducer, {
		items: {},
		isOpen: false,
		catalog: [],
	});
	useEffect(() => {
		(async () => await updateCatalog())();
	}, []);
	useLocalStorage("cart", state.items);

	const cartQuantity = Object.values(state.items).reduce(
		(pre, curr) => pre + curr,
		0
	);
	const cartFullPrice = Object.keys(state.items)
		.map((id) => {
			const item = state.catalog.find((p) => p.id === id);
			return item ? state.items[id] * item.getPrice() : 0;
		})
		.reduce((pre, curr) => pre + curr, 0);

	const openCart = () => {
		dispatch({ type: "OPEN" });
	};
	const closeCart = () => {
		dispatch({ type: "CLOSE" });
	};
	const removeCart = () => {
		dispatch({ type: "CLEAR" });
	};

	function getItemQuantity(id) {
		if (!state.items[id]) return 0;
		return state.items[id];
	}
	function increaseItemQuantity(id) {
		dispatch({ type: "ADD", payload: { id } });
	}
	function removeItem(id) {
		dispatch({ type: "REMOVE", payload: { id } });
	}
	function decreaseItemQuantity(id) {
		dispatch({ type: "DECREASE", payload: { id } });
	}
	async function updateCatalog() {
		await myAxios
			.get("products")
			.then((res) =>
				res.data.data.map(
					({
						id,
						category,
						price,
						name,
						image,
						description,
						seller,
						inventory,
					}) =>
						new ClProduct(
							id,
							category,
							price,
							name,
							image,
							description,
							seller,
							inventory
						)
				)
			)
			.then((catalog) => {
				dispatch({ type: "UPDATE-CATALOG", payload: { catalog } });
			});
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
				cart: state.items,
				cartFullPrice,
				cartQuantity,
				updateCatalog,
				catalog: state.catalog,
			}}>
			{children}
			{state.isOpen && <Cart />}
		</CartContext.Provider>
	);
}
