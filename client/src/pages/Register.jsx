import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
//import { toast } from 'react-toastify'
import { register, reset} from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 87vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("/img/register.webp")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 400px;
  text-align: center;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "340px" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  max-width: 200px;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  background: white;

  :focus {
    outline: none !important;
    border:2px solid teal;
  }
`;
/*
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
*/
const Button = styled.button`
width: 160px;
font-size: 17px;
    letter-spacing:2px;
    font-weight: 900;
border: none;
margin: 25px 0;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
margin-bottom: 10px;
border-radius: 5px;

&:hover{
  background-color: rgb(0, 107, 107);
}

&:active{
  font-size: 17px;
  padding: 15px 18px;
  transform: scale(0.95)
}
`;
const Error = styled.span`
margin-top:10px;
font-size: 19px;
letter-spacing: 2px;
color: red;
`;

const Register = () => {

  const [formData, setFormData] = useState({
    pseudo: '',
    email: '',
    password: '',
    password2: '',
  })
  const { pseudo, email, password, password2 } = formData
  const [passwordLength, setPasswordLength] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [message, setMessage] = useState("")
  

  const errorObject = useSelector((state) => state.user.message)
  const  isSuccess  = useSelector((state) => state.user.isSuccess);

  const dispatch = useDispatch()
  const navigate = useNavigate()

 useEffect(()=> {
    if(isSuccess){
      dispatch(reset())
      navigate("/login")
    }
 },[dispatch, navigate, isSuccess])


// RESET USER STATE
useEffect(()=> {
  dispatch(reset())
},[dispatch])

useEffect(()=> {
   errorObject && setMessage(errorObject.register)
},[errorObject])


// SET FORM VALUE 
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // DISPATCH REGISTER FORM &, RESET VALUES & INPUT
  const onSubmit = (e) => {
    
    e.preventDefault()
    
    if(password.length < 6){
      setMessage("")
      setPasswordLength("6 caractères minimum")
      setPasswordConfirm("")
    }else if (password !== password2){
      setMessage("")
      setPasswordConfirm("Mots de passe différents")
      setPasswordLength("")

    }else{
      setPasswordConfirm("")
      setPasswordLength("")
      const userData = {
        pseudo,
        email,
        password,
      }
      dispatch(register(userData))
      
    }
  }

  return (
    <React.Fragment>
    <Announcement />
    <Navbar />
    
    <Container>
    <Wrapper>
    <Title>CREER UN COMPTE</Title>
    
       
        <Form onSubmit={onSubmit}>
          <div className='form-group'>
            <Input
              type='text'
              className='form-control'
              id='pseudo'
              name='pseudo'
              value={pseudo}
              placeholder='Nom'
              onChange={onChange}
            />
          </div>
          <Error>{message && message.pseudo}</Error>
          <div className='form-group'>
            <Input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={onChange}
            />
          </div>
          <Error>{message && message.email}</Error>
          <div className='form-group'>
            <Input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Mot de passe'
              onChange={onChange}
            />
          </div>
          <Error>{passwordLength}</Error>
          <div className='form-group'>
            <Input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Cofirmation mot de passe'
              onChange={onChange}
            />
          </div>
          <Error>{passwordConfirm}</Error>
          <div className='form-group'>
            <Button type='submit' className='btn btn-block'>Envoyer</Button>
          </div>
        </Form>
        
      </Wrapper>
    </Container>
    </React.Fragment>
  );
};

export default Register;
