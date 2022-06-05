import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { productsFetch } from "../slices/productsSlice";
import Product from "./Product";
import ReactPaginate from "react-paginate";




const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  
  const dispatch = useDispatch()
  
  const products = useSelector(state=>state.products.items)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 6;
  const offset = currentPage * PER_PAGE;
  
  
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 1, behavior: 'smooth'})
    }

    useEffect(() => {
    dispatch(productsFetch(cat))
    
  }, [dispatch, cat]);
    

  useEffect(() => {
    cat && 
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
      setCurrentPage(0);
      
  }, [products, cat, filters]);
  


        useEffect(() => {
          if (sort === "newest") {
            setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
          } else if (sort === "asc") {
            setFilteredProducts((prev) =>
      [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
      [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);



const currentPageData = filteredProducts
    .slice(offset, offset + PER_PAGE)
    .map((p,i) => (<Product item={p} key={i}/>));
const pageCount = Math.ceil(filteredProducts.length / PER_PAGE);
    



  return (
    <React.Fragment>
    <Container>
      {
       currentPageData
      }
       
    </Container>
      <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName={"paginationBttns"}
      previousLinkClassName={"previousBttn"}
      nextLinkClassName={"nextBttn"}
      activeClassName={"paginationActive"}
    />

    </React.Fragment>
  );
};

export default Products;