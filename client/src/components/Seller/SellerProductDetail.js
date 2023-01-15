import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

import {
	Form,
	SubmitBtn,
	InputContainer,
	PageContainer,
	PreviewContainer,
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
	const [isLoading, setIsLoading] = useState(true);
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
				setIsLoading(false);
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
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<Form onSubmit={handleSubmit}>
					<InputContainer
						label='Product Name:'
						id='name'
						name='name'
						onChange={handleChange}
						defaultValue={productData.name}
					/>

					<InputContainer
						label='Category:'
						id='category'
						name='category'
						onChange={handleChange}
						defaultValue={productData.category}
					/>
					<InputContainer
						label='Price:'
						id='price'
						name='price'
						type='number'
						onChange={handleChange}
						defaultValue={productData.price}
					/>

					<InputContainer
						label='Inventory:'
						id='inventory'
						name='inventory'
						type='number'
						onChange={handleChange}
						defaultValue={productData.inventory}
					/>

					<InputContainer
						label='Summary:'
						id='summary'
						name='summary'
						multiline
						onChange={handleChange}
						defaultValue={productData.summary}
					/>
					<InputContainer
						label='Description:'
						id='description'
						name='description'
						multiline
						onChange={handleChange}
						defaultValue={productData.description}
					/>
					<ProductImage
						src={`/img/products/${product.image}`}
						alt={productData.name}
					/>
					<SubmitBtn component='label'>
						Upload New Image
						<input
							type='file'
							onChange={(e) => {
								const file = e.target.files[0];
								setImage(file);
								const reader = new FileReader();
								reader.readAsDataURL(file);
								reader.onloadend = () => {
									setPreview(reader.result);
								};
							}}
							name='photo'
							accept='image/*'
							hidden
						/>
					</SubmitBtn>
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
			)}
		</PageContainer>
	);
}

export default SellerProductDetail;
