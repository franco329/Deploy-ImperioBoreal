import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface Product {
  descriptionName: string;
  category: string;
  price: number;
  priceBusiness: number;
  priceVAT: number;
  priceVATBusiness: number;
}

interface Errors {
  descriptionName: string;
  category: string;
  price: string;
  priceBusiness: string;
  priceVAT: string;
  priceVATBusiness: string;
}

const validate = (product: Product) => {
  // Validation logic here
  return {};
};

const CreateProductForm: React.FC = () => {
  // const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    descriptionName: "",
    category: "",
    price: 0,
    priceBusiness: 0,
    priceVAT: 0,
    priceVATBusiness: 0,
  });

  const [errors, setErrors] = useState<Errors>({
    descriptionName: "",
    category: "",
    price: "",
    priceBusiness: "",
    priceVAT: "",
    priceVATBusiness: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    console.log(product);
    console.log(`esto es value ${e.target.value}`);
    console.log(`esto es name ${e.target.name}`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (Object.keys(errors).length === 0) {
        await axios.post("http://localhost:3001/products/", product);
        alert("Producto creado");
        // navigate("/")
      } else {
        alert("Faltan completar campos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Ingrese su producto</h1>

      {/*
                descriptionName: string;
                category: string;
                 price: number;
                 priceBusiness: number;
                 priceVAT: number;
                 priceVATBusiness: number;
             */}

      <label htmlFor='descriptionName'>Nombre: </label>
      <input
        value={product.descriptionName}
        onChange={handleInputChange}
        id='descriptionName'
        type='text'
        name='descriptionName'
      />

      <label htmlFor='category'>Categoría: </label>
      <input
        value={product.category}
        onChange={handleInputChange}
        id='category'
        type='text'
        name='category'
      />

      <label htmlFor='price'>Precio: </label>
      <input
        value={product.price}
        onChange={handleInputChange}
        id='price'
        type='number'
        name='price'
      />

      <label htmlFor='priceBusiness'>Precio venta empresas: </label>
      <input
        value={product.priceBusiness}
        onChange={handleInputChange}
        id='priceBusiness'
        type='number'
        name='priceBusiness'
      />

      <label htmlFor='priceVAT'>Precio Consumidor Final C/IVA: </label>
      <input
        value={product.priceVAT}
        onChange={handleInputChange}
        id='priceBusiness'
        type='number'
        name='priceVAT'
      />

      <label htmlFor='priceVATBusiness'>Precio Empresa C/IVA: </label>
      <input
        value={product.priceVATBusiness}
        onChange={handleInputChange}
        id='priceVATBusiness'
        type='number'
        name='priceVATBusiness'
      />

      <button type='submit'>Crear producto</button>
    </form>
  );
};

export default CreateProductForm;
