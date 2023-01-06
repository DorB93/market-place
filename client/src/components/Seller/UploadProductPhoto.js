import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import myAxios from "../../api";
import {
	Form,
	SubmitBtn,
	PageContainer,
	PreviewContainer,
	BtnContainer,
	ImageInputContainer,
} from "../StyleComponents";

export async function getProduct(id) {
	try {
		const res = await myAxios.get(`products/${id}`);
		return res.data;
	} catch (err) {}
}
export async function updateData(id, formData) {
	try {
		const res = await myAxios.patch(`products/${id}`, formData);
		return res.data;
	} catch (err) {
		window.alert(err.message);
	}
}

function UploadProductPhoto() {
	const [product, setProduct] = useState("");
	const [image, setImage] = useState("");
	const [preview, setPreview] = useState(null);
	const navigate = useNavigate();
	const { productId } = useParams();

	useEffect(() => {
		getProduct(productId).then((res) => {
			setProduct(res.data._doc);
		});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		if (image) {
			formData.append("image", image);
		}
		try {
			const productData = await updateData(productId, formData);

			if (productData.status === "success") {
				navigate("my-profile/my-products");
			}
		} catch (err) {
			window.alert(err.message);
		}
	};
	return (
		<PageContainer>
			{product && (
				<Form onSubmit={handleSubmit}>
					<h2>UploadProductPhoto</h2>
					<ImageInputContainer>
						<label htmlFor='image'>
							<img
								src={`/img/products/${product.image}`}
								alt={`${product.name}`}
							/>
						</label>
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
						<SubmitBtn type='submit'>Upload</SubmitBtn>
						<SubmitBtn
							onClick={() => {
								navigate("my-profile/my-products");
							}}>
							Skip
						</SubmitBtn>
					</BtnContainer>
				</Form>
			)}
		</PageContainer>
	);
}

export default UploadProductPhoto;
