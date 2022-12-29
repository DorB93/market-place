import React, { useState } from "react";
import { ProductContainer, ProductMinDetails } from "../Products/Product";
import LoadingSpinner from "../LoadingSpinner";
function SellerProduct() {
	const [isLoading, setIsLoading] = useState(true);
	return (
		<ProductContainer>
			{isLoading && <LoadingSpinner />}SellerProduct
		</ProductContainer>
	);
}

export default SellerProduct;
