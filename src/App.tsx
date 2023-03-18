import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import { Routes, Route } from "react-router";
import CreateProductForm from "./Components/CreateProductForm/CreateProductForm";
import UpdateProductForm from './Components/UpdateProductForm/UpdateProductForm';
import Detail from "./Components/Detail/Detail";
import AboutUs from './Components/AboutUs/AboutUs';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from './Redux/actions';
import { AppDispatch } from './Redux/store';

//Si tienen problemas con el import en minuscula o mayuscula 
//es por el cache de vscode, tienen que cerrar y volver a abrirlo

function App() {

  const dispatch:AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
  })
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/productform" element={<CreateProductForm />} />
      <Route path="/updateform/:id" element={<UpdateProductForm />} />
      <Route path="/:id" element={<Detail />} />
      <Route path="/aboutUs" element={<AboutUs />}/>
    </Routes>
  );
}

export default App;

