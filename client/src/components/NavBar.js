import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";

import { useCart } from "../context/CartContext";
import { useUser } from "./../context/UserContext";
import { Baj, CartIcon, HeaderBar, Link, Nav, UserBar } from "./StyleComponents";

function NavBar() {
	const { user, setLogout } = useUser();
	const { openCart, cartQuantity, removeCart } = useCart();
	const navigate = useNavigate();
	return (
		<>
			<Nav>
				<Link>
					<NavLink to='/'>Home</NavLink>
				</Link>
				<HeaderBar>
					Welcome{" "}
					{user.isLoggedIn ? `Back ${user.username.split(" ")[0]}` : "Guest"}
				</HeaderBar>
				<UserBar>
					{user.isLoggedIn ? (
						<>
							<Link>
								<NavLink
									as='button'
									onClick={() => {
										removeCart();
										setLogout();
										navigate("/");
									}}>
									Log Out
								</NavLink>
							</Link>
							<Link>
								<NavLink to='/my-profile'>
									<img src={`/img/users/${user.userPhoto}`} alt='avatar' />
								</NavLink>
							</Link>
						</>
					) : (
						<>
							<Link>
								<NavLink to='/signup'>Sign Up</NavLink>
							</Link>
							<Link>
								<NavLink to='/login'>Login</NavLink>
							</Link>
						</>
					)}
					{cartQuantity > 0 && (
						<CartIcon onClick={openCart}>
							<HiShoppingCart />
							<Baj>{cartQuantity}</Baj>
						</CartIcon>
					)}
				</UserBar>
			</Nav>
		</>
	);
}

export default NavBar;
