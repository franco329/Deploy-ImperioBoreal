import React, { useState } from "react"
import useLocalStorage from "../../hooks/useLocalStorage";
import { KEY_LOCAL_STORAGE, ProductToStorage } from "../../types.d";
import style from "./ShoppingCartItem.module.css";


const ShoppingCartItem: React.FC<ProductToStorage> = ({ descriptionName, category, price, id, image }) => {

    const [productQuantity, setProductQuantity] = useState<number>(1)

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductQuantity(Number(e.target.value))
    };

    const { deleteItems } = useLocalStorage(KEY_LOCAL_STORAGE.KEY);

    return (
        <tr className={style.trContainer}>
            <td>
                <img className={style.imagen} src={image.secure_url} />
            </td>
            <td>{descriptionName}</td>
            <td>{category}</td>
            <td>{price}</td>
            <td><input type="number" value={productQuantity} min="1" onChange={handleQuantityChange} name="quantity"></input>
            </td>
            <td>
                <button onClick={() => deleteItems(id)}>Eliminar</button>
            </td>
            <td>{productQuantity * price}</td>
        </tr>
    )
}

export default ShoppingCartItem