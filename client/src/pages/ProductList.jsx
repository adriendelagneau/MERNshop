import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");


  const colorOptions = [
    { value: 'black', label: 'black'},
    { value: 'blue', label: 'blue' },
    { value: 'brown', label: 'brown' },
    { value: 'green', label: 'green' },
    { value: 'red', label: 'red' },
    { value: 'yellow', label: 'yellow' },
    { value: 'multi-color', label: 'multi-color' },
  ]

  const sizeOptions = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' }
  ]
  
  const handleFilters = (e) => {
    e.preventDefault()
    const value = e.target.value;
    
    if((e.target.value !== "color") && (e.target.value !== "size")) {
      setFilters({
        ...filters,
        [e.target.name]: value,
      }
      );

    }else if(e.target.value === "color"){
      let filt = filters

      const newFilt = Object.keys(filt).reduce((object, key) => {
        if (key !== "color"){
          object[key] = filt[key]
        }
          return object
      },{})
      setFilters(newFilt)
      
    }else if(e.target.value === "size"){
      let filt = filters

      const newFilt = Object.keys(filt).reduce((object, key) => {
        if (key !== "size"){
          object[key] = filt[key]
        }
          return object
      },{})
      setFilters(newFilt)
      
      }
  }
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
      
          <Select name="color" onChange={handleFilters}>
          <option >color</option>
          {colorOptions.map((option, i) => (
            <option value={option.value} key={i}>{option.label}</option>
          ))}
        </Select>

        <Select name="size" onChange={handleFilters}>
        <option>size</option>
        {sizeOptions.map((option, i) => (
          <option value={option.value} key={i}>{option.label}</option>
          
        ))}
      </Select>

        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      
      
   
      <Products cat={cat} filters={filters} sort={sort} num={36}/>
      <Newsletter />
      <Footer />
      </Container>
      );
};
export default ProductList;