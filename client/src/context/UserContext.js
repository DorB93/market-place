import React, { createContext, useContext, useReducer } from "react";

// Create the user context
const userContext = createContext();

// Define the initial state for the user context
const initialState = {
	isLoggedIn: false,
	username: "",
	userEmail: "",
	userId: "",
	userPhoto: "",
	shippingAddress: {},
	role: "guest",
};

// Define the reducer for the user context
const reducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			// Return the updated state when a user logs in
			return {
				isLoggedIn: true,
				username: action.payload.name,
				userEmail: action.payload.email,
				role: action.payload.role,
				userId: action.payload.id,
				userPhoto: action.payload.photo,
				shippingAddress: action.payload.shippingAddress,
			};
		case "LOGOUT":
			// Return the initial state when a user logs out
			return initialState;
		default:
			// Return the existing state if the action type is not recognized
			return state;
	}
};

function useUser() {
	return useContext(userContext);
}

// Define a higher-order component that wraps the root component of your application
// and provides the user context and reducer to all child components
function UserProvider({ children }) {
	// Use the useReducer hook to create a "user" state variable
	// and a function to update it called "dispatch"
	const [user, dispatch] = useReducer(reducer, initialState);

	// Return the user context provider, passing the user state and dispatch function
	// as the value for the context
	return (
		<userContext.Provider
			value={{
				user,
				setLogin: (user) => {
					dispatch({ type: "LOGIN", payload: { ...user } });
				},
				setLogout: () => dispatch({ type: "LOGOUT" }),
			}}>
			{children}
		</userContext.Provider>
	);
}

export { userContext, UserProvider, useUser };
