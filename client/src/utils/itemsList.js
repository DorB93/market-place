import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generateItemList = (to, products) => {
	const productList = products.reduce((pre, { product, quantity }) => {
		pre.push([[`${product._id}`], [`${product.name}`], [`${quantity}`]]);
		return pre;
	}, []);
	const docDefinition = {
		content: [
			{
				text: "Items List",
				style: "header",
			},
			{
				text: `To: ${to.name}`,
				style: "subheader",
			},
			{
				table: {
					body: [
						[
							{ text: "Product ID:", style: "tableHeader" },
							{ text: "Name:", style: "tableHeader" },
							{ text: "Units:", style: "tableHeader" },
						],
						...productList,
					],
					style: "productsTable",
					layout: "lightHorizontalLines",
				},
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

			productsTable: {
				margin: [0, 5, 0, 5],
				fontSize: 12,
			},
		},
	};

	pdfMake.createPdf(docDefinition).download();
};
