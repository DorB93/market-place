import React from "react";
import { Paper, Avatar, Typography, Grid, Divider } from "@material-ui/core";
import { NavLink } from "react-router-dom";

function Profile() {
	return (
		<Paper>
			<Grid container justify='center' alignItems='center' spacing={3}>
				<Grid item>
					<Avatar />
				</Grid>
				<Grid item>
					<Typography variant='h5'>Name</Typography>
					<NavLink to='/dashboard'>Dashboard</NavLink>
				</Grid>
			</Grid>
			<Divider />
			{/* Add additional information about the user or seller here */}
		</Paper>
	);
}

export default Profile;
