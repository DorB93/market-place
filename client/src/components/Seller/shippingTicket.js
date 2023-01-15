import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generateShippingTicket = (
	to,
	shippingAddress,
	from,
	cost,
	products
) => {
	const productList = products.map(
		({ product, quantity }) => `${product.name} : ${quantity} units`
	);
	console.log({ shippingAddress });
	const docDefinition = {
		content: [
			{
				text: "Shipping Ticket",
				style: "header",
			},
			{
				text: `To: ${to.name}`,
				style: "subheader",
			},
			{
				table: {
					body: [
						[{ text: "State:", style: "tableHeader" }, shippingAddress.state],
						[
							{ text: "City:", style: "tableHeader" },
							`${shippingAddress.city}`,
						],
						[
							{ text: "Street:", style: "tableHeader" },
							`${shippingAddress.street}, ${shippingAddress.streetNum}`,
						],
						[
							{ text: "PostCode:", style: "tableHeader" },
							`${shippingAddress.postCode}`,
						],
					],
					style: "addressTable",
					layout: "lightHorizontalLines",
				},
			},
			{
				text: `From: ${from.name}`,
				style: "subheader",
			},

			{
				table: {
					body: [
						[
							{ text: "State:", style: "tableHeader" },
							`${from.shippingAddress?.state}`,
						],
						[
							{ text: "City:", style: "tableHeader" },
							`${from.shippingAddress?.city}`,
						],
						[
							{ text: "Street:", style: "tableHeader" },
							`${from.shippingAddress?.street}, ${from.shippingAddress?.streetNum}`,
						],
						[
							{ text: "PostCode:", style: "tableHeader" },
							`${from.shippingAddress?.postCode}`,
						],
					],
					style: "addressTable",
					layout: "lightHorizontalLines",
				},
			},
			{
				text: `Cost: $${cost.toFixed(2)}`,
				style: "cost",
			},
			{
				text: "Products:",
				style: "subheader",
			},
			{
				ul: productList,
				style: "products",
			},
		],
		styles: {
			header: {
				fontSize: 18,
				bold: true,
				alignment: "center",
				margin: [0, 0, 0, 20],
			},
			subheader: {
				fontSize: 14,
				bold: true,
				margin: [0, 10, 0, 5],
			},
			cost: {
				fontSize: 12,
				margin: [0, 5, 0, 5],
				bold: true,
			},
			products: {
				fontSize: 12,
				margin: [0, 5, 0, 20],
			},
			addressTable: {
				margin: [0, 5, 0, 5],
				fontSize: 12,
			},
		},
	};

	pdfMake.createPdf(docDefinition).download();
};
