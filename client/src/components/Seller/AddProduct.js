import React, { useState } from "react";
// import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import myAxios from "../../api";
import { Form, PageContainer, InputContainer } from "../../pages/Signup";
import { SubmitBtn } from "../../pages/Login";
/*
	{
		name: {
			type: String,
		},
		category: {
			type: String,
		},
		inventory: {
			type: Number,
		},
		price: {
			type: Number,
		},
		summary: {
			type: String,
		},
		description: {
			type: String,
		},
		images: [String],
		},
	},*/
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
				<InputContainer>
					<label htmlFor='productName'>Product Name</label>
					<input
						type='text'
						name='productName'
						id='productName'
						value={productName}
						onChange={handleChange}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='category'>Category</label>
					<input
						type='text'
						name='category'
						id='category'
						value={category}
						onChange={handleChange}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='inventory'>Inventory</label>
					<input
						type='number'
						name='inventory'
						id='inventory'
						value={inventory}
						onChange={handleChange}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='price'>Price</label>
					<input
						type='number'
						name='price'
						id='price'
						value={price}
						onChange={handleChange}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='summary'>Summary</label>
					<input
						type='text'
						name='summary'
						id='summary'
						value={summary}
						onChange={handleChange}
						required
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='description'>Description</label>
					<input
						type='text'
						name='description'
						id='description'
						value={description}
						onChange={handleChange}
						required
					/>
				</InputContainer>
				<SubmitBtn type='submit'>Upload</SubmitBtn>
			</Form>
		</PageContainer>
	);
}

export default AddProduct;
