import { Menu } from "@mui/icons-material";
import {
	AppBar,
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	Toolbar,
} from "@mui/material";
import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
import { ProfileLink } from "../StyleComponents";

const drawerWidth = 220;

const ProfileNav = ({ user, window, ...props }) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const isSeller = user.role === "seller";
	// const isAdmin = user.role === "admin";

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const userNavigation = [
		{ url: "/my-profile/", text: user.username.split(" ")[0] },
		{ url: "/my-profile/password-update", text: "Change Password" },
		{ url: "/my-profile/address-update", text: "My Address" },
		{ url: "/my-profile/my-orders", text: "My Orders" },
	];
	const sellerNavigation = [
		{ url: "/my-profile/manage-orders", text: "Manage Orders" },
		{ url: "/my-profile/new-product", text: "Add New Product" },
		{ url: "/my-profile/my-products", text: "My Products" },
	];

	const drawer = (
		<>
			<Toolbar sx={{ height: "95px" }} />
			<List>
				{userNavigation.map(({ url, text }, index) => (
					<ListItem key={url} disablePadding>
						<ListItemButton>
							<ProfileLink to={url}>{text}</ProfileLink>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			{isSeller && (
				<>
					<Divider />
					<List>
						{sellerNavigation.map(({ url, text }, index) => (
							<ListItem key={url} disablePadding>
								<ListItemButton>
									<ProfileLink to={url}>{text}</ProfileLink>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</>
			)}
		</>
	);
	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<>
			<Box
				component='div'
				sx={{
					zIndex: { sm: 1 },
				}}>
				<AppBar
					sx={{
						position: "fixed",
						top: "93px",
						backgroundColor: "transparent",
						boxShadow: "none",
						width: "content-fit",
						zIndex: 1,
						ml: { sm: `${drawerWidth}px` },
					}}>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							edge='start'
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: "none" } }}>
							<Menu />
						</IconButton>
						{/* <Typography variant='h6' noWrap component='div'>
						Responsive drawer
					</Typography> */}
					</Toolbar>
				</AppBar>
				<Box
					position='static'
					component='nav'
					sx={{
						width: { sm: drawerWidth },
						flexShrink: { sm: 0 },
					}}>
					<Drawer
						container={container}
						variant='temporary'
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: "block", sm: "none" },
							zIndex: 1,
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}>
						{drawer}
					</Drawer>
					<Drawer
						variant='permanent'
						sx={{
							display: { xs: "none", sm: "block" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
							},
						}}
						open>
						{drawer}
					</Drawer>
				</Box>
			</Box>
		</>
	);
};

export default ProfileNav;
