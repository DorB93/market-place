import React, { useState } from "react";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import myAxios from "../../api";
import {
	SubmitBtn,
	Form,
	PageContainer,
	InputContainer,
} from "../StyleComponents";

function AddProduct() {
	const [productData, setProductData] = useState({
		name: "",
		category: "",
		inventory: "",
		price: "",
		summary: "",
		description: "",
	});
	const navigate = useNavigate();

	const { productName, category, inventory, price, summary, description } =
		productData;

	const handleChange = (event) => {
		setProductData({
			...productData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { productName, category, inventory, price, summary, description } =
			productData;
		try {
			const newProduct = await myAxios
				.post("/products", {
					name: productName,
					category,
					inventory,
					price,
					summary,
					description,
				})
				.then((res) => res.data);

			if (newProduct.status === "success") {
				setProductData({
					productName: "",
					category: "",
					inventory: "",
					price: "",
					summary: "",
					description: "",
					images: [],
				});
				navigate(
					`/my-profile/upload-product-photo/${newProduct.data._doc._id}`
				);
			}
		} catch (err) {
			window.alert(err.message);
		}
	};

	return (
		<PageContainer>
			<Form onSubmit={handleSubmit}>
				<h3>Add the product information</h3>
				<InputContainer
					size='small'
					id='productName'
					label='Product Name'
					name='productName'
					onChange={handleChange}
					required
				/>

				<InputContainer
					label='Category'
					size='small'
					id='category'
					name='category'
					onChange={handleChange}
					required
				/>

				<InputContainer
					label='Inventory'
					size='small'
					id='inventory'
					name='inventory'
					onChange={handleChange}
					required
				/>

				<InputContainer
					label='Price'
					size='small'
					id='price'
					name='price'
					onChange={handleChange}
					type='number'
					required
				/>

				<InputContainer
					label='Summary'
					size='small'
					id='summary'
					multiline
					name='summary'
					onChange={handleChange}
					required
				/>

				<InputContainer
					label='Description'
					size='small'
					id='description'
					name='description'
					multiline
					onChange={handleChange}
					required></InputContainer>
				<SubmitBtn type='submit'>Upload</SubmitBtn>
			</Form>
		</PageContainer>
	);
}

export default AddProduct;
