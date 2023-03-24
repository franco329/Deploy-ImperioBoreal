import React, { useState } from "react"
import useLocalStorage from "../../hooks/useLocalStorage";
import { KEY_LOCAL_STORAGE } from "../../types";
import style from "./ShoppingCartItem.module.css";

interface Props {
    descriptionName: string;
    category: string;
    price: number;
    id: number;
    image: string;
  }

  interface LocalStorage {
    deleteItems: (id: number) => void;
  }
const ShoppingCartItem: React.FC<Props> = ({ descriptionName, category, price, id, image }) => {

    const [productQuantity, setProductQuantity] = useState<number>(1)

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductQuantity(Number(e.target.value))
    };

    const { deleteItems }: LocalStorage = useLocalStorage(KEY_LOCAL_STORAGE.KEY);

    return (
        <tr className={style.trContainer}>
            <td>
                <img className={style.imagen} src={image} />
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