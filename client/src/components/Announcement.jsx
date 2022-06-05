import React from 'react';
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;

  ${mobile({fontSize: "17px"})}
`;

const Announcement = () => {
  return <Container>Super promo: Livraison offerte à partir de 50€</Container>;
};

export default Announcement;
