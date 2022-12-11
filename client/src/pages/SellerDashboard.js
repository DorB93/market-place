import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from "@material-ui/core";

function SellerDashboard() {
	return (
		<div>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' color='inherit' aria-label='menu'>
						{/* Add a menu icon here */}
					</IconButton>
					<Typography variant='h6'>Dashboard</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent'>
				<List>
					{/* Add list items for each section of the dashboard here */}
					<ListItem button>
						<ListItemIcon>{/* Add an icon for this section */}</ListItemIcon>
						<ListItemText primary='Dashboard' />
					</ListItem>
					<ListItem button>
						<ListItemIcon>{/* Add an icon for this section */}</ListItemIcon>
						<ListItemText primary='Orders' />
					</ListItem>
					<ListItem button>
						<ListItemIcon>{/* Add an icon for this section */}</ListItemIcon>
						<ListItemText primary='Products' />
					</ListItem>
				</List>
				<Divider />
				{/* Add any additional options here */}
			</Drawer>
			{/* Add the content for each section of the dashboard here */}
		</div>
	);
}

export default SellerDashboard;
