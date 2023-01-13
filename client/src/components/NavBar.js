import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";

import { useCart } from "../context/CartContext";
import { useUser } from "./../context/UserContext";
import { Baj, CartIcon, Link, Nav, UserBar } from "./StyleComponents";
import { Avatar, Box } from "@mui/material";
import { Storefront } from "@mui/icons-material";

function NavBar() {
	const { user, setLogout } = useUser();
	const { openCart, cartQuantity, removeCart } = useCart();
	const navigate = useNavigate();
	return (
		<>
			<Nav>
				<Box sx={{ flexGrow: 1, display: "flex" }}>
					<Link>
						<NavLink to='/'>
							<Storefront fontSize='large' />
						</NavLink>
					</Link>
				</Box>
				<Box sx={{ flexGrow: 0, display: "flex" }}>
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
									<NavLink to='/my-profile/'>
										<Avatar
											sx={{ width: 56, height: 56, margin: 0 }}
											src={`/img/users/${user.userPhoto}`}
											alt='Avatar'
											sizes='60px'
										/>
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
				</Box>
			</Nav>
		</>
	);
}

export default NavBar;
