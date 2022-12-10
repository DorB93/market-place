import React, { createContext, useReducer } from "react";

// Create the user context
const userContext = createContext();

// Define the initial state for the user context
const initialState = {
	username: null,
	isLoggedIn: false,
	email: null,
	role: null,
};

// Define the reducer for the user context
const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			// Return the updated state when a user logs in
			return {
				isLoggedIn: true,
				username: action.username,
				email: action.email,
				role: action.role,
			};
		case "LOGOUT":
			// Return the initial state when a user logs out
			return initialState;
		default:
			// Return the existing state if the action type is not recognized
			return state;
	}
};

// Define a higher-order component that wraps the root component of your application
// and provides the user context and reducer to all child components
function UserProvider({ children }) {
	// Use the useReducer hook to create a "user" state variable
	// and a function to update it called "dispatch"
	const [user, dispatch] = useReducer(userReducer, initialState);

	// Return the user context provider, passing the user state and dispatch function
	// as the value for the context
	return (
		<userContext.Provider value={{ user, dispatch }}>
			{children}
		</userContext.Provider>
	);
}

export { userContext, UserProvider };
