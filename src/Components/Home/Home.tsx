import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import style from './Home.module.css';
import CardContainer from '../CardContainer/CardContainer';
import Footer from "../Footer/Footer";
import { resetFilters, orderByPrice, filterByCategory } from "../../Redux/actions";
import { useDispatch} from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useSelector } from 'react-redux';
import Pagination from "../Pagination/Pagination"
import Carousel from "../Carousel/Carousel"
import { useAuth0 } from "@auth0/auth0-react";
import { User } from "auth0";
import axios from "axios";

const Home: React.FC = () => {

  const {user, isLoading, isAuthenticated, getAccessTokenSilently} = useAuth0<User>()
  

  const postNewUser = async () => {
    if(isAuthenticated) await axios.post('http://localhost:3001/users', user)
  }
  
  const dispatch = useDispatch();

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(resetFilters(e.currentTarget.value));
    setSelectedOption('default');
    setSelectedOptionOrder('default')
    setCurrentPage(1);
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(orderByPrice(e.target.value));
    setSelectedOptionOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterByCategory(e.target.value));
    setSelectedOption(e.target.value)
    setCurrentPage(1);

  };

  const allProducts = useSelector((state: RootState) => state.filteredProducts);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(5);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginado = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOptionOrder, setSelectedOptionOrder] = useState<string>('');


  useEffect(() => {
    setSelectedOption('default')
    setSelectedOptionOrder('default')
    postNewUser()
    
  }, [user])
  return (
    <>
    <NavBar setCurrentPage={setCurrentPage} />
      <div className={style.filterOrderContainer}>
      <select
        className={style.priceOrderSelectorStyle}
        name="orderByPrice"
        id="orderByPrice"
        defaultValue="default"
        onChange={selectHandler}
        value={selectedOptionOrder}
      >
        <option value="default" disabled>
          Ordenar por Precio
        </option>
        <option className={style.orderOptionStyle} value="ascendente">Ascendente</option>
        <option className={style.orderOptionStyle} value="descendente">Descendente</option>
      </select>
      <select
        className={style.CategorySelectorStyle}
        onChange={handleCategory}
        name="filterByCategory"
        id="filterByCategory"
        value={selectedOption}
      >
        <option className={style.categoryOptionStyle} value="default" disabled>Categorias</option>
        <option className={style.categoryOptionStyle} value="lapiz">Lapices</option>
        <option className={style.categoryOptionStyle} value="resmas">Resmas</option>
        <option className={style.categoryOptionStyle} value="agenda">Agendas</option>
        <option className={style.categoryOptionStyle} value="oficina">Articulos de oficina</option>
        <option className={style.categoryOptionStyle} value="lapicera">Lapiceras</option>
        <option className={style.categoryOptionStyle} value="escolar">Escolares</option>
      </select>
      <button className={style.resetFiltersBtn} onClick={handleReset} value="reset">
        Resetear Productos
      </button>
      </div>
      <Carousel />
      <div className="card-container">
        <CardContainer productProps={currentProducts} />
      </div>
      <Pagination
      productsPerPage={productsPerPage}
      allProducts={allProducts.length}
      paginado={paginado}
      currentPage={currentPage}
    />
      <div className={style.footerContainer}>
      <Footer />
      </div>
    </>
  );
};

export default Home;