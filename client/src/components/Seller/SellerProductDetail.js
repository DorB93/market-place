import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
	Form,
	SubmitBtn,
	InputContainer,
	PageContainer,
	PreviewContainer,
	ImageInputContainer,
	BtnContainer,
	ProductImage,
} from "../StyleComponents";

import { getProduct, updateData } from "./UploadProductPhoto";

function SellerProductDetail() {
	const navigate = useNavigate();
	const { productId } = useParams();
	const [productData, setProductData] = useState({
		name: "",
		category: "",
		inventory: "",
		price: "",
		summary: "",
		description: "",
	});
	const [image, setImage] = useState({});
	const [preview, setPreview] = useState("");
	const [product, setProduct] = useState({});
	useEffect(() => {
		getProduct(productId)
			.then((res) => res.data._doc)
			.then((p) => {
				setProduct(p);
				setProductData({
					name: p.name,
					category: p.category,
					inventory: p.inventory,
					price: p.price,
					summary: p.summary,
					description: p.description,
				});
			});
	}, [productId]);
	const handleChange = (event) => {
		setProductData({
			...productData,
			[event.target.name]: event.target.value,
		});
	};
	// navigate("/my-profile/my-products");

	async function handleSubmit(e) {
		e.preventDefault();
		const { name, category, inventory, price, summary, description } =
			productData;
		const formData = new FormData();
		if (name !== product.name) formData.append("name", name);
		if (category !== product.category) formData.append("category", category);
		if (inventory !== product.inventory)
			formData.append("inventory", inventory);
		if (price !== product.price) formData.append("price", price);
		if (summary !== product.summary) formData.append("summary", summary);
		if (description !== product.description)
			formData.append("description", description);
		if (image) formData.append("image", image);
		await updateData(productId, formData);

		navigate("/my-profile/my-products");
	}

	return (
		<PageContainer>
			<Form onSubmit={handleSubmit}>
				<InputContainer>
					<label htmlFor='name'>Product Name:</label>
					<input
						onChange={handleChange}
						type='text'
						name='name'
						id='name'
						value={productData.name}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='category'>Category:</label>
					<input
						onChange={handleChange}
						type='text'
						name='category'
						id='category'
						value={productData.category}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='price'>Price:</label>
					<input
						onChange={handleChange}
						type='number'
						name='price'
						id='price'
						value={productData.price}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='inventory'>Inventory:</label>
					<input
						onChange={handleChange}
						type='number'
						name='inventory'
						id='inventory'
						value={productData.inventory}
					/>
				</InputContainer>
				<InputContainer>
					<label htmlFor='summary'>summary :</label>
					<input
						onChange={handleChange}
						type='text'
						name='summary'
						id='summary'
						placeholder='Enter the new summary'
					/>
				</InputContainer>
				<p>{productData.summary}</p>
				<InputContainer>
					<label htmlFor='description'>description :</label>
					<input
						onChange={handleChange}
						type='text'
						name='description'
						id='description'
						placeholder='Enter the new description'
					/>
				</InputContainer>
				<p>{productData.description}</p>
				<ProductImage
					src={`/img/products/${product.image}`}
					alt={productData.name}
				/>
				<ImageInputContainer>
					<label htmlFor='image'>Image:</label>
					<input
						type='file'
						onChange={(e) => {
							const file = e.target.files[0];
							setImage(file);
							const reader = new FileReader();
							if (file) {
								reader.readAsDataURL(file);
								reader.onloadend = () => {
									setPreview(reader.result);
								};
							} else {
								setPreview("");
							}
						}}
						name='image'
						accept='image/*'
					/>
				</ImageInputContainer>
				{preview ? (
					<PreviewContainer>
						<img src={preview} alt='Preview' />
					</PreviewContainer>
				) : (
					<span>No image selected</span>
				)}
				<BtnContainer>
					<SubmitBtn
						onClick={() => {
							navigate(-1);
						}}>
						Back
					</SubmitBtn>
					<SubmitBtn type='submit'>Update</SubmitBtn>
				</BtnContainer>
			</Form>
		</PageContainer>
	);
}

export default SellerProductDetail;
