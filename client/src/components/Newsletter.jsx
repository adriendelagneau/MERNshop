import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import {toast} from 'react-toastify'

const Container = styled.div`
  height: 50vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 60px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}

`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
width: 99%;
height: auto;
  border: none;
  flex: 8;
  padding-left: 20px;
  padding-top: 5px;
  :focus {
    outline: none !important;
    border:2px solid teal;
  }
`;

const Button = styled.button`

  height: auto;
  justify-content: flex-end;
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  
  &:hover{
    background-color: rgb(0, 107, 107);
  }
  &:active{
    font-size: 20px;
    transform: scale(0.95)
  }
`;

const Newsletter = () => {

  const [email, setEmail] = useState("")

  const onChange = (e) => {
    setEmail(e.target.value)
  }


  const onSubmit = async(e) => {
    e.preventDefault()
   
    try {
      await publicRequest.post("/newsletter", {email: email})
      toast.success(`abonné à la newsletter `)
      setEmail("")
    }catch(err) {
      toast.error(`Email invalide`)
    }

   
  }



  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Restez informé de toutes les promotions et actualités</Desc>
      <InputContainer>
      
      <Input
        type='email'
        className='form-control'
        id='email'
        name='email'
        value={email}
        placeholder='Entrer votr email'
        onChange={onChange}
      />
        <Button onClick={onSubmit} aria-label="Envoyer">
          <SendIcon />
        </Button>
    
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
