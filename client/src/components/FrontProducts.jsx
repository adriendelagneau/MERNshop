import React, { useEffect, useState} from 'react';
import { userRequest } from '../requestMethods';
import Product from './Product';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;


const FrontProducts = () => {

    const [array, setArray] = useState([]);

    useEffect(() => {
        const getInFrontProduct = async () => {
            const res = await userRequest.get("/products?category=inFront")
            setArray(res.data) 
        }
        getInFrontProduct()
    }, []);
  
    return (
        <Container>
            {array.map((p,i)=> (
                <Product item={p} key={i}/>
            ))}
        </Container>
    );
};

export default FrontProducts;