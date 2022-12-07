import React from "react";
import { HeaderBar, Nav, Link, UserBar } from "./styleComponents";
import { NavLink } from "react-router-dom";

function NavBar() {
	return (
		<>
			<Nav>
				<Link>
					<NavLink to='/'>Home</NavLink>
				</Link>
				<HeaderBar>Welcome Guest</HeaderBar>
				<UserBar>
					<Link>
						<NavLink to='/signup'>Sign Up</NavLink>
					</Link>
					<Link>
						<NavLink to='/login'>Login</NavLink>
					</Link>
					<Link>Cart</Link>
				</UserBar>
			</Nav>
		</>
	);
}

export default NavBar;
