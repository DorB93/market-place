import React from "react";
import { Fab, TableCell, TableRow, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function SellerProductRow({ product }) {
	const navigate = useNavigate();
	const { _id, name, image, price, inventory } = product;
	return (
		<>
			<TableRow key={_id}>
				<TableCell align='center'>{_id}</TableCell>
				<TableCell align='center'>
					<img
						style={{ width: "70px" }}
						src={`/img/products/${image}`}
						alt={name}
					/>
				</TableCell>
				<TableCell align='center'>{name}</TableCell>
				<TableCell align='center'>${price.toFixed(2)}</TableCell>
				<TableCell align='center'>{inventory}</TableCell>
				<TableCell align='center'>
					<Tooltip title='Edit' placement='top' arrow>
						<Fab color='primary' size='small'>
							<EditIcon
								color='white'
								onClick={() => {
									navigate(`${_id}`);
								}}
							/>
						</Fab>
					</Tooltip>
				</TableCell>
			</TableRow>
		</>
	);
}

export default SellerProductRow;
