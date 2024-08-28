import React from "react";
import Helper from "../../unitilies/Helper";

export default function ProductItem({index, product}) {
    return (
        <tr key={product.id}>
            <td>{index + 1}</td>
            <td>{product.productCode}</td>
            <td>{product.name}</td>
            <td>{product.category?.name || 'Không xác định'}</td>
            <td>{Helper.formatCurrency(product.price)}</td>
            <td>{product.quantity}</td>
            <td>{product.entryDate}</td>
            <td>{product.description}</td>
        </tr>
    )
}